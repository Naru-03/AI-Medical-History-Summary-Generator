// Dashboard page stub
import React, {
    useState,
    useEffect
} from 'react';
import {
    useNavigate
} from 'react-router-dom';
import Loading from '../components/Loading';
import { useNotifications } from '../components/NotificationSystem';

function Dashboard() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [summaryRequested, setSummaryRequested] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [history, setHistory] = useState([]);
    const [summary, setSummary] = useState('');
    const [conditions, setConditions] = useState([]);
    const [medications, setMedications] = useState([]);
    const [confidence, setConfidence] = useState('');
    const [sources, setSources] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();
    const { notify } = useNotifications();

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
        setUploading(true);
        setUploadProgress(0);
        
        // Simulate upload progress
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return prev;
                }
                return prev + 10;
            });
        }, 200);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            
            clearInterval(progressInterval);
            setUploadProgress(100);
            
            if (data.success) {
                setMessage('File uploaded successfully! Ready to generate summary.');
                notify.upload('File uploaded successfully! Ready to generate summary.');
            } else {
                setMessage('Upload failed. Please try again.');
                notify.error('Upload Failed', 'Please try again.');
            }
        } catch (error) {
            clearInterval(progressInterval);
            setMessage('Upload failed. Please check your connection.');
            notify.error('Upload Failed', 'Please check your connection.');
        } finally {
            setUploading(false);
            setTimeout(() => setUploadProgress(0), 1000);
        }
    };

    const handleSummary = async () => {
        setMessage('');
        setSummaryRequested(true);
        
        try {
            const res = await fetch('http://localhost:5000/api/summary', {
                method: 'POST'
            });
            const data = await res.json();
            
            if (data.summary) {
                localStorage.setItem('summary', JSON.stringify(data));
                // Save to history
                const hist = JSON.parse(localStorage.getItem('summaryHistory') || '[]');
                hist.push({...data, timestamp: new Date().toISOString()});
                localStorage.setItem('summaryHistory', JSON.stringify(hist));
                notify.summary('Medical summary generated successfully!');
                navigate('/summary');
            } else {
                setMessage('Summary request failed. Please try again.');
                notify.error('Summary Failed', 'Please try again.');
            }
        } catch (error) {
            setMessage('Summary generation failed. Please check your connection.');
            notify.error('Summary Failed', 'Please check your connection.');
        } finally {
            setSummaryRequested(false);
        }
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all data? This will clear the current file and summary.')) {
            setFile(null);
            setSummary('');
            setConditions([]);
            setMedications([]);
            setConfidence('');
            setSources([]);
            setMessage('');
            localStorage.removeItem('summary');
            notify.info('Data Reset', 'All data has been cleared successfully.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--gradient-bg)',
            padding: '2rem'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                alignItems: 'start'
            }}>
                {/* Upload Section */}
                <div style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow)',
                    border: '1px solid var(--border-color)'
                }}>
                    <h2 style={{
                        color: 'var(--text-primary)',
                        marginBottom: '2rem',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        📁 Upload Document
                    </h2>
                    {/* File Upload Section */}
                    <div style={{ marginBottom: '2rem' }}>
                        <form onSubmit={handleUpload}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                                    Upload Medical Document:
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    accept=".pdf,.txt,.doc,.docx"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px dashed var(--border-color)',
                                        borderRadius: '8px',
                                        background: 'var(--input-bg)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        color: 'var(--text-primary)'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.borderColor = '#2d6cdf';
                                        e.target.style.background = 'var(--bg-tertiary)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.borderColor = 'var(--border-color)';
                                        e.target.style.background = 'var(--input-bg)';
                                    }}
                                />
                            </div>
                            
                            {/* Upload Progress */}
                            {uploading && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '100%',
                                        background: '#e2e8f0',
                                        borderRadius: '4px',
                                        height: '8px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${uploadProgress}%`,
                                            background: 'linear-gradient(90deg, #2d6cdf, #38a169)',
                                            height: '100%',
                                            transition: 'width 0.3s ease'
                                        }} />
                                    </div>
                                    <p style={{ textAlign: 'center', margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                                        Uploading... {uploadProgress}%
                                    </p>
                                </div>
                            )}
                            
                            <button
                                type="submit"
                                disabled={!file || uploading}
                                style={{
                                    backgroundColor: file && !uploading ? '#2d6cdf' : '#ccc',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: file && !uploading ? 'pointer' : 'not-allowed',
                                    width: '100%',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {uploading ? 'Uploading...' : 'Upload File'}
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
                                borderRadius: '8px',
                                cursor: summaryRequested ? 'not-allowed' : 'pointer',
                                width: '100%',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {summaryRequested ? 'Generating Summary...' : 'Generate Summary'}
                        </button>
                    </div>

                    {/* Reset Button */}
                    <div style={{ marginBottom: '2rem' }}>
                        <button
                            onClick={handleReset}
                            style={{
                                backgroundColor: '#e53e3e',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                width: '100%',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            🔄 Reset All Data
                        </button>
                    </div>
                </div>

                {/* Summary Display Section */}
                <div style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow)',
                    border: '1px solid var(--border-color)'
                }}>
                    <h2 style={{
                        color: 'var(--text-primary)',
                        marginBottom: '2rem',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        📋 Current Summary
                    </h2>

                    {/* Message Display */}
                    {message && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
                            color: message.includes('success') ? '#155724' : '#721c24',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            border: `1px solid ${message.includes('success') ? '#c3e6cb' : '#f5c6cb'}`
                        }}>
                            {message}
                        </div>
                    )}

                    {/* Loading State for Summary Generation */}
                    {summaryRequested && (
                        <Loading message="Generating medical summary..." size="medium" />
                    )}

                    {/* Summary Display */}
                    {summary && !summaryRequested && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>📝 Summary:</h3>
                            <div style={{
                                background: '#f1f5fb',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                fontSize: '1rem',
                                lineHeight: '1.6',
                                border: '1px solid #e2e8f0'
                            }}>
                                {summary}
                            </div>
                        </div>
                    )}

                    {/* Extracted Conditions */}
                    {conditions.length > 0 && !summaryRequested && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>🏥 Conditions:</h3>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem'
                            }}>
                                {conditions.map((c, i) => (
                                    <span key={i} style={{
                                        background: '#e6fffa',
                                        color: '#234e52',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        border: '1px solid #b2f5ea'
                                    }}>
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Extracted Medications */}
                    {medications.length > 0 && !summaryRequested && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>💊 Medications:</h3>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem'
                            }}>
                                {medications.map((m, i) => (
                                    <span key={i} style={{
                                        background: '#fef5e7',
                                        color: '#744210',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        border: '1px solid #fbd38d'
                                    }}>
                                        {m}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Confidence Level */}
                    {confidence && !summaryRequested && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>🎯 Confidence:</h3>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <span style={{
                                    color: confidence === 'High' ? '#38a169' : '#e53e3e',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem'
                                }}>
                                    {confidence}
                                </span>
                                <div style={{
                                    width: '100px',
                                    height: '8px',
                                    background: '#e2e8f0',
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: confidence === 'High' ? '80%' : '40%',
                                        height: '100%',
                                        background: confidence === 'High' ? '#38a169' : '#e53e3e',
                                        transition: 'width 0.3s ease'
                                    }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sources */}
                    {sources.length > 0 && !summaryRequested && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>📚 Sources:</h3>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                                {sources.map((s, i) => (
                                    <li key={i} style={{
                                        marginBottom: '0.5rem',
                                        color: '#4a5568',
                                        fontSize: '0.9rem'
                                    }}>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* No Summary State */}
                    {!summary && !summaryRequested && (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem 1rem',
                            color: '#666'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                            <h3 style={{ margin: '0 0 0.5rem 0' }}>No Summary Yet</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                Upload a document and generate a summary to see it here.
                            </p>
                        </div>
                    )}

                    {/* Disclaimer */}
                    <div style={{
                        fontSize: '0.8rem',
                        color: '#718096',
                        marginTop: '2rem',
                        padding: '1rem',
                        background: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        textAlign: 'center'
                    }}>
                        ⚠️ Disclaimer: This summary is for informational purposes only and is not a substitute for professional medical advice.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;