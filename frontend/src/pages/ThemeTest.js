import React from 'react';
import { useTheme } from '../components/ThemeProvider';

function ThemeTest() {
    const { theme, setThemeMode, toggleTheme, isDark } = useTheme();

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-secondary)',
            padding: '2rem',
            color: 'var(--text-primary)',
            transition: 'all 0.3s ease'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: 'var(--card-bg)',
                borderRadius: '16px',
                boxShadow: 'var(--shadow)',
                padding: '2rem',
                border: '1px solid var(--border-color)'
            }}>
                <h1 style={{
                    color: 'var(--text-primary)',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    🎨 Theme Test Center
                </h1>

                <div style={{
                    background: 'var(--bg-tertiary)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    border: '1px solid var(--border-color)'
                }}>
                    <h3 style={{ color: 'var(--text-primary)', marginTop: 0 }}>Current Theme Status</h3>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0' }}>
                        <strong>Active Theme:</strong> {theme}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0' }}>
                        <strong>Is Dark Mode:</strong> {isDark ? 'Yes' : 'No'}
                    </p>
                    <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0', fontSize: '0.9rem' }}>
                        This page uses CSS variables that change based on the selected theme.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <button
                        onClick={() => setThemeMode('light')}
                        style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: theme === 'light' ? '#2d6cdf' : 'var(--input-bg)',
                            color: theme === 'light' ? 'white' : 'var(--text-primary)',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        🌞 Light Theme
                    </button>
                    
                    <button
                        onClick={() => setThemeMode('dark')}
                        style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: theme === 'dark' ? '#2d6cdf' : 'var(--input-bg)',
                            color: theme === 'dark' ? 'white' : 'var(--text-primary)',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        🌙 Dark Theme
                    </button>
                    
                    <button
                        onClick={() => setThemeMode('auto')}
                        style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: theme === 'auto' ? '#2d6cdf' : 'var(--input-bg)',
                            color: theme === 'auto' ? 'white' : 'var(--text-primary)',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        🔄 Auto (System)
                    </button>
                    
                    <button
                        onClick={toggleTheme}
                        style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--input-bg)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        🔄 Toggle Theme
                    </button>
                </div>

                <div style={{
                    background: 'var(--bg-tertiary)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)'
                }}>
                    <h3 style={{ color: 'var(--text-primary)', marginTop: 0 }}>Theme Elements Test</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{
                            padding: '1rem',
                            background: 'var(--card-bg)',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)'
                        }}>
                            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>Card Element</h4>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                                This is a card element that should change appearance based on the theme.
                            </p>
                        </div>
                        
                        <input
                            type="text"
                            placeholder="Input field test"
                            style={{
                                padding: '0.75rem',
                                borderRadius: '6px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--input-bg)',
                                color: 'var(--text-primary)',
                                width: '100%'
                            }}
                        />
                        
                        <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            flexWrap: 'wrap'
                        }}>
                            <span style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                background: '#e6fffa',
                                color: '#234e52',
                                fontSize: '0.9rem'
                            }}>
                                Success Tag
                            </span>
                            <span style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                background: '#fef5e7',
                                color: '#744210',
                                fontSize: '0.9rem'
                            }}>
                                Warning Tag
                            </span>
                            <span style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                background: '#f0f8ff',
                                color: '#2d6cdf',
                                fontSize: '0.9rem'
                            }}>
                                Info Tag
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)'
                }}>
                    <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>CSS Variables in Use:</h4>
                    <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.5rem' }}>
                        <li><code>--bg-primary</code>: {getComputedStyle(document.documentElement).getPropertyValue('--bg-primary')}</li>
                        <li><code>--bg-secondary</code>: {getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary')}</li>
                        <li><code>--text-primary</code>: {getComputedStyle(document.documentElement).getPropertyValue('--text-primary')}</li>
                        <li><code>--border-color</code>: {getComputedStyle(document.documentElement).getPropertyValue('--border-color')}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ThemeTest;
