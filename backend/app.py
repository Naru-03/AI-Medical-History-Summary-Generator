# Basic Flask backend for AI Medical History Summarizer
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re
from typing import List, Dict, Tuple
import spacy
from transformers import pipeline
try:
    # Keywords
    from rake_nltk import Rake
    import nltk
    nltk.download('stopwords', quiet=True)
except Exception:
    Rake = None

app = Flask(__name__)
CORS(app)

nlp = spacy.load('en_core_web_sm')

# Initialize multiple summarizers for ensemble-style summarization
SUMMARIZER_SPECS = [
    ("facebook/bart-large-cnn", {"task": "summarization", "params": {"max_length": 220, "min_length": 70, "do_sample": False}}),
    ("google/pegasus-xsum", {"task": "summarization", "params": {"max_length": 140, "min_length": 50, "do_sample": False}}),
    # Instruction-tuned model for structured, bullet-style summaries
    ("google/flan-t5-large", {"task": "text2text-generation", "params": {"max_new_tokens": 220, "temperature": 0.0}})
]

summarizers = []
for model_name, spec in SUMMARIZER_SPECS:
    try:
        summarizers.append({
            "name": model_name,
            "task": spec["task"],
            "pipe": pipeline(spec["task"], model=model_name),
            "params": spec["params"]
        })
    except Exception:
        # Fallback: if a model fails to load, skip it
        pass

def _approximate_chunks(text: str, target_chars: int = 3000, overlap: int = 300) -> List[str]:
    """Split long text into approximate chunks at sentence boundaries.

    This avoids exceeding model token limits and improves coherence.
    """
    if len(text) <= target_chars:
        return [text]
    # Split into sentences using simple regex if spaCy isn't ideal for long docs
    sentences = re.split(r"(?<=[.!?])\s+", text)
    chunks: List[str] = []
    current: List[str] = []
    current_len = 0
    for sent in sentences:
        if current_len + len(sent) + 1 > target_chars and current:
            chunk = " ".join(current)
            chunks.append(chunk)
            # Start next with overlap from end of previous chunk to keep context
            if overlap > 0 and len(chunk) > overlap:
                tail = chunk[-overlap:]
                current = [tail, sent]
                current_len = len(tail) + len(sent)
            else:
                current = [sent]
                current_len = len(sent)
        else:
            current.append(sent)
            current_len += len(sent) + 1
    if current:
        chunks.append(" ".join(current))
    return chunks

def _format_prompt_for_medical_summary(text: str) -> str:
    return (
        "You are a clinical assistant. Summarize the following medical record into concise bullet points. "
        "Include: chief complaint, key diagnoses, pertinent findings (vitals/labs/imaging), current medications and changes, and the plan. "
        "Be factual and avoid speculation.\n\nRecord:\n" + text
    )

def _dynamic_lengths(input_text: str, task: str) -> Dict:
    """Choose generation lengths relative to input size to avoid HF warnings.

    Uses a rough token estimate derived from word count.
    """
    words = max(1, len(re.findall(r"\w+", input_text)))
    # Approximate tokens ~ words
    tokens = words

    if task == "text2text-generation":
        # For instruction models, cap new tokens to ~50% of input tokens
        max_new = max(40, min(220, int(tokens * 0.5)))
        return {"max_new_tokens": max_new, "temperature": 0.0}

    # For summarization, set decoder max_length below input tokens
    # Aim for ~60% of input tokens, with sensible floors/ceilings
    max_len = max(60, min(200, int(tokens * 0.6)))
    min_len = max(25, min(max_len - 20, int(tokens * 0.25)))
    return {"max_length": max_len, "min_length": min_len, "do_sample": False}

def _summarize_with_models(text: str) -> Tuple[str, List[Dict]]:
    """Run multiple models over chunks and return a meta-summary and per-model outputs."""
    chunks = _approximate_chunks(text)
    per_model_outputs: List[Dict] = []
    chunk_summaries_by_model: Dict[str, List[str]] = {}
    for i, item in enumerate(summarizers):
        model_name = item["name"]
        task = item["task"]
        pipe = item["pipe"]
        params = item["params"]
        model_chunk_summaries: List[str] = []
        for chunk in chunks:
            try:
                if task == "text2text-generation":
                    prompt = _format_prompt_for_medical_summary(chunk)
                    effective = {**params, **_dynamic_lengths(chunk, task)}
                    out = pipe(prompt, **effective)[0]['generated_text']
                else:
                    effective = {**params, **_dynamic_lengths(chunk, task)}
                    out = pipe(chunk, **effective)[0]['summary_text']
            except Exception:
                out = ""
            model_chunk_summaries.append(out)
        chunk_summaries_by_model[model_name] = model_chunk_summaries
        per_model_outputs.append({
            "model": model_name,
            "chunk_summaries": model_chunk_summaries,
            "combined": "\n".join([s for s in model_chunk_summaries if s])
        })

    # Meta summarize: concatenate the best available combined summaries and run a final pass
    combined_all = "\n".join([m["combined"] for m in per_model_outputs if m.get("combined")])
    meta_input = combined_all if combined_all.strip() else text[:2500]
    # Prefer first working summarizer for meta
    meta_summary = ""
    for item in summarizers:
        try:
            if item["task"] == "text2text-generation":
                prompt = _format_prompt_for_medical_summary(meta_input)
                effective = {**item["params"], **_dynamic_lengths(meta_input, item["task"])}
                meta_summary = item["pipe"](prompt, **effective)[0]['generated_text']
            else:
                effective = {**item["params"], **_dynamic_lengths(meta_input, item["task"]) }
                meta_summary = item["pipe"](meta_input, **effective)[0]['summary_text']
            if meta_summary:
                break
        except Exception:
            continue
    if not meta_summary:
        # Fallback: truncate original text
        meta_summary = meta_input[:600]
    return meta_summary, per_model_outputs

def _extract_entities_and_keywords(text: str) -> Tuple[List[str], List[str], List[str]]:
    """Use spaCy to extract entities and RAKE for keywords if available."""
    conditions: List[str] = []
    medications: List[str] = []
    # Section-aware parsing for medications and assessments to improve precision
    lines = text.splitlines()
    in_meds = False
    in_home_meds = False
    for line in lines:
        lower = line.strip().lower()
        if lower.startswith("medications") or lower.startswith("medications (home)"):
            in_meds = True
            continue
        if lower.startswith("home medication list"):
            in_home_meds = True
            continue
        if in_meds or in_home_meds:
            if not line.strip():
                continue
            if re.match(r"^[-•]", line.strip()):
                # Example: "- Metformin 1000 mg PO BID"
                m = re.match(r"^\s*[-•]\s*([A-Za-z][A-Za-z \-]+?)(?:\s+(\d+\s*(?:mg|mcg|g|units|iu)))?(?:\s+(po|iv|im|sc|sl))?(?:\s+.+)?$", line.strip(), re.IGNORECASE)
                if m:
                    drug = m.group(1).strip()
                    dose = (m.group(2) or '').strip()
                    route = (m.group(3) or '').upper()
                    med_str = drug
                    if dose:
                        med_str += f" {dose}"
                    if route:
                        med_str += f" {route}"
                    medications.append(med_str)
            # Stop meds section when another header-like line appears
            if re.match(r"^[A-Za-z].+:$", line.strip()) and not re.match(r"^[-•]", line.strip()):
                in_meds = False
                in_home_meds = False

    # Use spaCy for general entities and conditions
    try:
        doc = nlp(text)
        for ent in doc.ents:
            if ent.label_ in {"DISEASE", "CONDITION"} or re.search(r"(?i)\b(diabetes|hypertension|asthma|cancer|covid|influenza|stroke|arthritis|depression|heart failure|hfpef|cad|ckd|hyperlipidemia|gerd|osa)\b", ent.text):
                conditions.append(ent.text)
    except Exception:
        pass

    keywords: List[str] = []
    try:
        if Rake is not None:
            rake = Rake()
            rake.extract_keywords_from_text(text)
            # Return top N key phrases
            keywords = [phrase for phrase, score in rake.get_ranked_phrases_with_scores()[:15]]
        else:
            # Simple keyword heuristic fallback: most frequent non-trivial words
            tokens = re.findall(r"[A-Za-z][A-Za-z\-]+", text.lower())
            stop = set((nltk.corpus.stopwords.words('english') if 'nltk' in globals() else []))
            freq: Dict[str, int] = {}
            for t in tokens:
                if t in stop or len(t) < 3:
                    continue
                freq[t] = freq.get(t, 0) + 1
            keywords = [w for w, _ in sorted(freq.items(), key=lambda kv: kv[1], reverse=True)[:15]]
    except Exception:
        pass
    # Deduplicate while preserving order
    def _dedup(items: List[str]) -> List[str]:
        seen = set()
        out = []
        for it in items:
            if it not in seen:
                seen.add(it)
                out.append(it)
        return out
    # Remove spurious single-word route tokens from medications
    medications = [m for m in medications if m.lower() not in {"po", "iv", "im", "sc", "sl"}]
    # Word-boundary fix to avoid matching substrings like "Polyphagia" for "PO"
    medications = [re.sub(r"\b(po|iv|im|sc|sl)\b", lambda m: m.group(1).upper(), m, flags=re.IGNORECASE) for m in medications]
    return _dedup(conditions), _dedup(medications), _dedup(keywords)

def _estimate_confidence(text: str, summary_text: str, keywords: List[str]) -> str:
    if not summary_text:
        return "Low"
    # Simple proxy: if many keywords appear in summary, confidence is higher
    hits = sum(1 for kw in keywords if kw.lower() in summary_text.lower())
    if hits >= 10:
        return "High"
    if hits >= 6:
        return "Medium"
    return "Low"
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    # Simple hardcoded check
    if username == 'doctor' and password == 'secure123':
        return jsonify({'success': True})
    return jsonify({'success': False})

ALLOWED_TEXT_EXTENSIONS = {'.txt', '.md', '.csv', '.json'}

@app.route('/api/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'success': False, 'error': 'No file provided'})
    file = request.files['file']
    name, ext = os.path.splitext(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    # Save regardless, but only process as text later if readable
    file.save(filepath)
    return jsonify({'success': True, 'filename': file.filename})

@app.route('/api/summary', methods=['POST'])
def summary():
    # Find the latest uploaded file
    files = os.listdir(UPLOAD_FOLDER)
    if not files:
        return jsonify({'summary': 'No records found.', 'sources': [], 'confidence': 'N/A'})
    latest_file = max([os.path.join(UPLOAD_FOLDER, f) for f in files], key=os.path.getctime)

    # Read text content; ignore binary errors safely
    try:
        with open(latest_file, 'r', encoding='utf-8', errors='ignore') as f:
            text = f.read()
    except Exception:
        text = ''

    if not text or len(text.strip()) == 0:
        return jsonify({
            'summary': 'Uploaded file has no readable text.',
            'sources': [f"/uploads/{os.path.basename(latest_file)}"],
            'confidence': 'Low',
            'conditions': [],
            'medications': [],
            'keywords': []
        })

    # Multi-model, chunked summarization with meta-summary
    meta_summary, per_model_outputs = _summarize_with_models(text)

    # Entities and keywords
    conditions, meds, keywords = _extract_entities_and_keywords(text)
    confidence = _estimate_confidence(text, meta_summary, keywords)

    sources = [f"/uploads/{os.path.basename(latest_file)}"]
    return jsonify({
        'summary': meta_summary,
        'sources': sources,
        'confidence': confidence,
        'conditions': conditions,
        'medications': meds,
        'keywords': keywords,
        'model_outputs': per_model_outputs
    })

if __name__ == '__main__':
    app.run(debug=True)
