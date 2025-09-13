import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function History() {
    const [history, setHistory] = useState([]);
    const [selectedSummary, setSelectedSummary] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const hist = JSON.parse(localStorage.getItem('summaryHistory') || '[]');
        setHistory(hist);
    }, []);

    const handleViewSummary = (summaryData) => {
        localStorage.setItem('summary', JSON.stringify(summaryData));
        navigate('/summary');
    };

    const handleDeleteSummary = (index) => {
        const newHistory = history.filter((_, i) => i !== index);
        setHistory(newHistory);
        localStorage.setItem('summaryHistory', JSON.stringify(newHistory));
    };

    const clearAllHistory = () => {
        if (window.confirm('Are you sure you want to clear all history?')) {
            setHistory([]);
            localStorage.removeItem('summaryHistory');
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
                background: 'var(--card-bg)',
                borderRadius: '16px',
                boxShadow: 'var(--shadow)',
                padding: '2rem',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{
                        color: 'var(--text-primary)',
                        margin: 0,
                        fontSize: '2rem'
                    }}>
                        📚 Summary History
                    </h2>
                    {history.length > 0 && (
                        <button
                            onClick={clearAllHistory}
                            style={{
                                background: '#e53e3e',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {history.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        color: '#666'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
                        <h3>No summaries yet</h3>
                        <p>Generate your first medical summary to see it here!</p>
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
                                marginTop: '1rem'
                            }}
                        >
                            Go to Dashboard
                        </button>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gap: '1rem',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
                    }}>
                        {history.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    background: '#f8fafc',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '1rem'
                                }}>
                                    <h3 style={{
                                        margin: 0,
                                        color: '#2d6cdf',
                                        fontSize: '1.1rem'
                                    }}>
                                        Summary #{index + 1}
                                    </h3>
                                    <span style={{
                                        fontSize: '0.8rem',
                                        color: '#666',
                                        background: '#e2e8f0',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px'
                                    }}>
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </div>

                                <div style={{
                                    marginBottom: '1rem',
                                    maxHeight: '100px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    <p style={{
                                        margin: 0,
                                        color: '#4a5568',
                                        lineHeight: '1.5',
                                        fontSize: '0.9rem'
                                    }}>
                                        {item.summary?.substring(0, 150)}...
                                    </p>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    justifyContent: 'flex-end'
                                }}>
                                    <button
                                        onClick={() => handleViewSummary(item)}
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
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSummary(index)}
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
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default History;
