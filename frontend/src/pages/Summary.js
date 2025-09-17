// Summary page stub
import React, {
    useEffect,
    useState
} from 'react';
import {
    useNavigate
} from 'react-router-dom';
import Loading from '../components/Loading';
import { useNotifications } from '../components/NotificationSystem';

function Summary() {
    const [summary, setSummary] = useState('');
    const [sources, setSources] = useState([]);
    const [confidence, setConfidence] = useState('');
    const [conditions, setConditions] = useState([]);
    const [medications, setMedications] = useState([]);
    const [toast, setToast] = useState('');
    const [loading, setLoading] = useState(true);
    const [exportFormat, setExportFormat] = useState('txt');
    const navigate = useNavigate();
    const { notify } = useNotifications();

    useEffect(() => {
        const data = localStorage.getItem('summary');
        if (data) {
            const parsed = JSON.parse(data);
            setSummary(parsed.summary);
            setSources(parsed.sources || []);
            setConfidence(parsed.confidence);
            setConditions(parsed.conditions || []);
            setMedications(parsed.medications || []);
        }
        setLoading(false);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(summary);
        setToast('Summary copied to clipboard!');
        notify.copy('Summary copied to clipboard!');
        setTimeout(() => setToast(''), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement('a');
        let content, mimeType, extension;
        
        if (exportFormat === 'json') {
            content = JSON.stringify({
                summary,
                conditions,
                medications,
                confidence,
                sources,
                timestamp: new Date().toISOString()
            }, null, 2);
            mimeType = 'application/json';
            extension = 'json';
        } else {
            content = `Medical Summary Report
Generated: ${new Date().toLocaleString()}

SUMMARY:
${summary}

CONDITIONS:
${conditions.length > 0 ? conditions.map(c => `• ${c}`).join('\n') : 'None identified'}

MEDICATIONS:
${medications.length > 0 ? medications.map(m => `• ${m}`).join('\n') : 'None identified'}

CONFIDENCE LEVEL: ${confidence}

SOURCES:
${sources.length > 0 ? sources.map(s => `• ${s}`).join('\n') : 'None provided'}

---
This report is for informational purposes only and is not a substitute for professional medical advice.`;
            mimeType = 'text/plain';
            extension = 'txt';
        }
        
        const file = new Blob([content], { type: mimeType });
        element.href = URL.createObjectURL(file);
        element.download = `medical_summary.${extension}`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        notify.export(`Summary exported as ${extension.toUpperCase()} file`);
    };

    const handleClear = () => {
        localStorage.removeItem('summary');
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Loading message="Loading summary..." size="large" />
            </div>
        );
    }

    if (!summary) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <div style={{
                    background: '#fff',
                    padding: '3rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                    textAlign: 'center',
                    maxWidth: '500px'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
                    <h2 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>No Summary Available</h2>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        No medical summary found. Please generate a summary first.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            background: '#2d6cdf',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--gradient-bg)',
            padding: '2rem'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Header Section */}
                <div style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow)',
                    marginBottom: '2rem',
                    border: '1px solid var(--border-color)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <h1 style={{
                            color: 'var(--text-primary)',
                            margin: 0,
                            fontSize: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            📋 Medical Summary Report
                        </h1>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center'
                        }}>
                            <select
                                value={exportFormat}
                                onChange={(e) => setExportFormat(e.target.value)}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: '1px solid #dbeafe',
                                    background: 'white'
                                }}
                            >
                                <option value="txt">Text</option>
                                <option value="json">JSON</option>
                            </select>
                            <button
                                onClick={handleCopy}
                                style={{
                                    background: '#38a169',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                📋 Copy
                            </button>
                            <button
                                onClick={handleDownload}
                                style={{
                                    background: '#2d6cdf',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                💾 Download
                            </button>
                            <button
                                onClick={handleClear}
                                style={{
                                    background: '#e53e3e',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                🗑️ Clear
                            </button>
                        </div>
                    </div>
                    <p style={{
                        color: '#666',
                        margin: 0,
                        fontSize: '0.9rem'
                    }}>
                        Generated on {new Date().toLocaleString()}
                    </p>
                </div>

                {/* Toast Notification */}
                {toast && (
                    <div style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        background: '#38a169',
                        color: 'white',
                        padding: '1rem 1.5rem',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 1000,
                        animation: 'slideIn 0.3s ease'
                    }}>
                        {toast}
                    </div>
                )}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '2rem'
                }}>
                    {/* Main Summary Section */}
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.10)'
                    }}>
                        <h2 style={{
                            color: '#2d6cdf',
                            marginBottom: '1.5rem',
                            fontSize: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            📝 Summary
                        </h2>
                        <div style={{
                            background: 'var(--bg-primary)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            lineHeight: '1.6',
                            fontSize: '1rem'
                        }}>
                            {summary}
                        </div>
                    </div>

                    {/* Sidebar with Details */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        {/* Conditions */}
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.10)'
                        }}>
                            <h3 style={{
                                color: '#2d6cdf',
                                marginBottom: '1rem',
                                fontSize: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                🏥 Conditions
                            </h3>
                            {conditions.length > 0 ? (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
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
                            ) : (
                                <p style={{ color: '#666', fontStyle: 'italic' }}>None identified</p>
                            )}
                        </div>

                        {/* Medications */}
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.10)'
                        }}>
                            <h3 style={{
                                color: '#2d6cdf',
                                marginBottom: '1rem',
                                fontSize: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                💊 Medications
                            </h3>
                            {medications.length > 0 ? (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
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
                            ) : (
                                <p style={{ color: '#666', fontStyle: 'italic' }}>None identified</p>
                            )}
                        </div>

                        {/* Confidence */}
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.10)'
                        }}>
                            <h3 style={{
                                color: '#2d6cdf',
                                marginBottom: '1rem',
                                fontSize: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                🎯 Confidence
                            </h3>
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

                        {/* Sources */}
                        {sources.length > 0 && (
                            <div style={{
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.10)'
                            }}>
                                <h3 style={{
                                    color: '#2d6cdf',
                                    marginBottom: '1rem',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    📚 Sources
                                </h3>
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
                    </div>
                </div>

                {/* Disclaimer */}
                <div style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                    marginTop: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '0.9rem',
                        color: '#718096',
                        background: '#f8fafc',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                    }}>
                        ⚠️ <strong>Disclaimer:</strong> This summary is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
    }

    export default Summary;