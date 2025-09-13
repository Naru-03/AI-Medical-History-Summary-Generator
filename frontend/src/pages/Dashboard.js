// Dashboard page stub
import React, {
    useState,
    useEffect
} from 'react';
import {
    useNavigate
} from 'react-router-dom';

function Dashboard() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [summaryRequested, setSummaryRequested] = useState(false);
    const [history, setHistory] = useState([]);
    const [summary, setSummary] = useState('');
    const [conditions, setConditions] = useState([]);
    const [medications, setMedications] = useState([]);
    const [confidence, setConfidence] = useState('');
    const [sources, setSources] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const hist = JSON.parse(localStorage.getItem('summaryHistory') || '[]');
        setHistory(hist);
        
        // Load existing summary data if available
        const savedSummary = localStorage.getItem('summary');
        if (savedSummary) {
            const data = JSON.parse(savedSummary);
            setSummary(data.summary || '');
            setConditions(data.conditions || []);
            setMedications(data.medications || []);
            setConfidence(data.confidence || '');
            setSources(data.sources || []);
        }
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        setMessage('');
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            setMessage('File uploaded successfully');
        } else {
            setMessage('Upload failed');
        }
    };

    const handleSummary = async () => {
        setMessage('');
        setSummaryRequested(true);
        const res = await fetch('http://localhost:5000/api/summary', {
            method: 'POST'
        });
        const data = await res.json();
        if (data.summary) {
            localStorage.setItem('summary', JSON.stringify(data));
            // Save to history
            const hist = JSON.parse(localStorage.getItem('summaryHistory') || '[]');
            hist.push(data);
            localStorage.setItem('summaryHistory', JSON.stringify(hist));
            navigate('/summary');
        } else {
            setMessage('Summary request failed');
        }
        setSummaryRequested(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                background: '#fff',
                padding: '2.5rem 3rem',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                minWidth: '400px',
                maxWidth: '600px'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    color: '#2d6cdf',
                    marginBottom: '2rem'
                }}>Medical History Summary</h2>
                
                {/* File Upload Section */}
                <div style={{ marginBottom: '2rem' }}>
                    <form onSubmit={handleUpload}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                Upload Medical Document:
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept=".pdf,.txt,.doc,.docx"
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!file}
                            style={{
                                backgroundColor: file ? '#2d6cdf' : '#ccc',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: file ? 'pointer' : 'not-allowed',
                                width: '100%'
                            }}
                        >
                            Upload File
                        </button>
                    </form>
                </div>

                {/* Summary Generation Section */}
                <div style={{ marginBottom: '2rem' }}>
                    <button
                        onClick={handleSummary}
                        disabled={summaryRequested}
                        style={{
                            backgroundColor: summaryRequested ? '#ccc' : '#38a169',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: summaryRequested ? 'not-allowed' : 'pointer',
                            width: '100%',
                            fontSize: '1rem'
                        }}
                    >
                        {summaryRequested ? 'Generating Summary...' : 'Generate Summary'}
                    </button>
                </div>

                {/* Message Display */}
                {message && (
                    <div style={{
                        padding: '1rem',
                        backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
                        color: message.includes('success') ? '#155724' : '#721c24',
                        borderRadius: '4px',
                        marginBottom: '1rem'
                    }}>
                        {message}
                    </div>
                )}

                {/* Summary Display */}
                {summary && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <strong>Summary:</strong>
                        <div style={{
                            background: '#f1f5fb',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginTop: '0.5rem',
                            fontSize: '1.1rem'
                        }}>
                            {summary}
                        </div>
                    </div>
                )}

                {/* Extracted Conditions */}
                {conditions.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                        <strong>Extracted Conditions:</strong>
                        <ul style={{ margin: '0.5rem 0 0 1rem' }}>
                            {conditions.map((c, i) => (
                                <li key={i}>{c}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Extracted Medications */}
                {medications.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                        <strong>Extracted Medications:</strong>
                        <ul style={{ margin: '0.5rem 0 0 1rem' }}>
                            {medications.map((m, i) => (
                                <li key={i}>{m}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Confidence Level */}
                {confidence && (
                    <div style={{ marginBottom: '1rem' }}>
                        <strong>Confidence:</strong>
                        <span style={{
                            color: confidence === 'High' ? '#38a169' : '#e53e3e',
                            fontWeight: 'bold',
                            marginLeft: '0.5rem'
                        }}>
                            {confidence}
                        </span>
                    </div>
                )}

                {/* Sources */}
                {sources.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                        <strong>Sources:</strong>
                        <ul style={{ margin: '0.5rem 0 0 1rem' }}>
                            {sources.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Disclaimer */}
                <div style={{
                    fontSize: '0.9rem',
                    color: '#718096',
                    marginTop: '2rem',
                    textAlign: 'center'
                }}>
                    Disclaimer: This summary is not diagnostic. For informational purposes only.
                </div>
            </div>
        </div>
    );
}

export default Dashboard;