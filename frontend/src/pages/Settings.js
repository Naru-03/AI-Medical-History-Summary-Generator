import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeProvider';

function Settings() {
    const { theme, setThemeMode, toggleTheme } = useTheme();
    const [settings, setSettings] = useState({
        notifications: true,
        autoSave: true,
        exportFormat: 'txt',
        language: 'en'
    });

    useEffect(() => {
        const savedSettings = localStorage.getItem('appSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const handleSettingChange = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        localStorage.setItem('appSettings', JSON.stringify(newSettings));
    };

    const handleThemeChange = (newTheme) => {
        setThemeMode(newTheme);
    };

    const exportData = () => {
        const history = JSON.parse(localStorage.getItem('summaryHistory') || '[]');
        const dataStr = JSON.stringify(history, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'medical_summaries_export.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const resetAllData = () => {
        if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--gradient-bg)',
            padding: '2rem'
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
                <h2 style={{
                    color: 'var(--text-primary)',
                    marginBottom: '2rem',
                    fontSize: '2rem'
                }}>
                    ⚙️ Settings
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Theme Settings */}
                    <div style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        background: 'var(--card-bg)'
                    }}>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#2d6cdf' }}>🎨 Appearance</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Appearance</label>
                                <button
                                    onClick={toggleTheme}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--input-bg)',
                                        color: 'var(--text-primary)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {theme === 'dark' ? '🌞 Switch to Light' : '🌙 Switch to Dark'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#2d6cdf' }}>🔔 Notifications</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ fontWeight: '500' }}>Enable Notifications</label>
                                <input
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                                    style={{ transform: 'scale(1.2)' }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ fontWeight: '500' }}>Auto-save Summaries</label>
                                <input
                                    type="checkbox"
                                    checked={settings.autoSave}
                                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                                    style={{ transform: 'scale(1.2)' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Export Settings */}
                    <div style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#2d6cdf' }}>📤 Export & Data</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ fontWeight: '500' }}>Default Export Format</label>
                                <select
                                    value={settings.exportFormat}
                                    onChange={(e) => handleSettingChange('exportFormat', e.target.value)}
                                    style={{
                                        padding: '0.5rem',
                                        borderRadius: '6px',
                                        border: '1px solid #dbeafe',
                                        background: 'white'
                                    }}
                                >
                                    <option value="txt">Text (.txt)</option>
                                    <option value="json">JSON (.json)</option>
                                    <option value="pdf">PDF (.pdf)</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button
                                    onClick={exportData}
                                    style={{
                                        background: '#2d6cdf',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Export All Data
                                </button>
                                <button
                                    onClick={resetAllData}
                                    style={{
                                        background: '#e53e3e',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Reset All Data
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* App Info */}
                    <div style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        background: '#f8fafc'
                    }}>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#2d6cdf' }}>ℹ️ App Information</h3>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                            <p><strong>Version:</strong> 1.0.0</p>
                            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                            <p><strong>Total Summaries:</strong> {JSON.parse(localStorage.getItem('summaryHistory') || '[]').length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
