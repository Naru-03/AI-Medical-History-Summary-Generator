import React from 'react';
import { useNotifications } from '../components/NotificationSystem';

function NotificationTest() {
    const { notify, settings, updateSettings, clearAllNotifications } = useNotifications();

    const testNotifications = {
        success: () => notify.success('Success!', 'This is a success notification'),
        error: () => notify.error('Error!', 'This is an error notification'),
        warning: () => notify.warning('Warning!', 'This is a warning notification'),
        info: () => notify.info('Info', 'This is an info notification'),
        upload: () => notify.upload('File uploaded successfully!'),
        summary: () => notify.summary('Medical summary generated successfully!'),
        export: () => notify.export('Summary exported to file'),
        copy: () => notify.copy('Summary copied to clipboard'),
        long: () => notify.info('Long Notification', 'This is a longer notification message that should wrap to multiple lines and test the layout of the notification system. It should handle text wrapping properly.'),
        persistent: () => notify.info('Persistent', 'This notification will not auto-close', { duration: 0 }),
        custom: () => notify.success('Custom Notification', 'This has custom styling and duration', { 
            duration: 10000,
            title: '🎉 Custom Title',
            message: 'This notification has custom properties!'
        })
    };

    const testMultiple = () => {
        notify.info('Multiple Test', 'Testing multiple notifications...');
        setTimeout(() => notify.success('First', 'First notification'), 100);
        setTimeout(() => notify.warning('Second', 'Second notification'), 200);
        setTimeout(() => notify.error('Third', 'Third notification'), 300);
        setTimeout(() => notify.info('Fourth', 'Fourth notification'), 400);
    };

    const testDesktopNotification = () => {
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                notify.info('Desktop Test', 'Desktop notification should appear!');
            } else if (Notification.permission === 'default') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        notify.info('Desktop Test', 'Desktop notifications enabled!');
                    } else {
                        notify.error('Desktop Test', 'Desktop notifications denied');
                    }
                });
            } else {
                notify.error('Desktop Test', 'Desktop notifications are blocked. Please enable them in browser settings.');
            }
        } else {
            notify.error('Desktop Test', 'This browser does not support desktop notifications');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
            padding: '2rem'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                padding: '2rem'
            }}>
                <h1 style={{
                    color: '#2d6cdf',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    🔔 Notification Test Center
                </h1>

                {/* Settings */}
                <div style={{
                    background: '#f8fafc',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    border: '1px solid #e2e8f0'
                }}>
                    <h3 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>⚙️ Notification Settings</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={settings.notifications}
                                onChange={(e) => updateSettings({ notifications: e.target.checked })}
                            />
                            Enable Notifications
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={settings.sound}
                                onChange={(e) => updateSettings({ sound: e.target.checked })}
                            />
                            Sound Effects
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={settings.desktop}
                                onChange={(e) => updateSettings({ desktop: e.target.checked })}
                            />
                            Desktop Notifications
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={settings.autoSave}
                                onChange={(e) => updateSettings({ autoSave: e.target.checked })}
                            />
                            Auto-save
                        </label>
                    </div>
                </div>

                {/* Basic Notification Tests */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>🎯 Basic Notification Types</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem'
                    }}>
                        <button
                            onClick={testNotifications.success}
                            style={{
                                background: '#38a169',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            ✅ Success
                        </button>
                        <button
                            onClick={testNotifications.error}
                            style={{
                                background: '#e53e3e',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            ❌ Error
                        </button>
                        <button
                            onClick={testNotifications.warning}
                            style={{
                                background: '#d69e2e',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            ⚠️ Warning
                        </button>
                        <button
                            onClick={testNotifications.info}
                            style={{
                                background: '#2d6cdf',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            ℹ️ Info
                        </button>
                    </div>
                </div>

                {/* App-specific Notifications */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>🏥 App-specific Notifications</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem'
                    }}>
                        <button
                            onClick={testNotifications.upload}
                            style={{
                                background: '#2d6cdf',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            📁 Upload
                        </button>
                        <button
                            onClick={testNotifications.summary}
                            style={{
                                background: '#38a169',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            📋 Summary
                        </button>
                        <button
                            onClick={testNotifications.export}
                            style={{
                                background: '#805ad5',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            💾 Export
                        </button>
                        <button
                            onClick={testNotifications.copy}
                            style={{
                                background: '#d69e2e',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            📋 Copy
                        </button>
                    </div>
                </div>

                {/* Advanced Tests */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>🧪 Advanced Tests</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem'
                    }}>
                        <button
                            onClick={testMultiple}
                            style={{
                                background: '#e53e3e',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            🔢 Multiple
                        </button>
                        <button
                            onClick={testNotifications.long}
                            style={{
                                background: '#805ad5',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            📝 Long Text
                        </button>
                        <button
                            onClick={testNotifications.persistent}
                            style={{
                                background: '#d69e2e',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            ⏰ Persistent
                        </button>
                        <button
                            onClick={testNotifications.custom}
                            style={{
                                background: '#38a169',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            🎨 Custom
                        </button>
                    </div>
                </div>

                {/* Desktop Notification Test */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>🖥️ Desktop Notifications</h3>
                    <button
                        onClick={testDesktopNotification}
                        style={{
                            background: '#2d6cdf',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}
                    >
                        🖥️ Test Desktop Notification
                    </button>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                        This will test browser desktop notifications. You may need to allow notifications in your browser.
                    </p>
                </div>

                {/* Clear All */}
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={clearAllNotifications}
                        style={{
                            background: '#e53e3e',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}
                    >
                        🗑️ Clear All Notifications
                    </button>
                </div>

                {/* Instructions */}
                <div style={{
                    background: '#f0f8ff',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    marginTop: '2rem',
                    border: '1px solid #bee3f8'
                }}>
                    <h4 style={{ color: '#2d6cdf', marginBottom: '1rem' }}>📋 Testing Instructions</h4>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#4a5568' }}>
                        <li>Click any button to test different notification types</li>
                        <li>Notifications appear in the top-right corner</li>
                        <li>Click on a notification to dismiss it</li>
                        <li>Test desktop notifications by enabling the setting and clicking the test button</li>
                        <li>Try the "Multiple" test to see how the system handles many notifications</li>
                        <li>Check browser console for any errors</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NotificationTest;
