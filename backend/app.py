# Basic Flask backend for AI Medical History Summarizer
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import spacy
from transformers import pipeline

app = Flask(__name__)
CORS(app)

nlp = spacy.load('en_core_web_sm')
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
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

@app.route('/api/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'success': False})
    file = request.files['file']
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)
    return jsonify({'success': True, 'filename': file.filename})

@app.route('/api/summary', methods=['POST'])
def summary():
    # Find the latest uploaded file
    files = os.listdir(UPLOAD_FOLDER)
    if not files:
        return jsonify({'summary': 'No records found.', 'sources': [], 'confidence': 'N/A'})
    latest_file = max([os.path.join(UPLOAD_FOLDER, f) for f in files], key=os.path.getctime)
    with open(latest_file, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    # Use HuggingFace summarizer
    try:
        hf_summary = summarizer(text, max_length=130, min_length=30, do_sample=False)[0]['summary_text']
        confidence = 'High'
    except Exception:
        hf_summary = "Could not generate summary."
        confidence = 'Low'
    # Optionally, keep spaCy extraction for conditions/meds
    doc = nlp(text)
    conditions = [ent.text for ent in doc.ents if ent.label_ in ['DISEASE', 'CONDITION']]
    meds = [ent.text for ent in doc.ents if ent.label_ == 'DRUG']
    sources = [f"/uploads/{os.path.basename(latest_file)}"]
    return jsonify({
        'summary': hf_summary,
        'sources': sources,
        'confidence': confidence,
        'conditions': conditions,
        'medications': meds
    })

if __name__ == '__main__':
    app.run(debug=True)
