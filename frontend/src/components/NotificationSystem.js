import React, { useState, useEffect, createContext, useContext } from 'react';

// Notification Context
const NotificationContext = createContext();

// Notification Provider
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [settings, setSettings] = useState({
        notifications: true,
        autoSave: true,
        sound: true,
        desktop: false
    });

    useEffect(() => {
        // Load settings from localStorage
        const savedSettings = localStorage.getItem('notificationSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    // Save settings to localStorage
    const updateSettings = (newSettings) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        localStorage.setItem('notificationSettings', JSON.stringify(updatedSettings));
    };

    // Add notification
    const addNotification = (notification) => {
        const id = Date.now() + Math.random();
        const newNotification = {
            id,
            type: notification.type || 'info', // success, error, warning, info
            title: notification.title || 'Notification',
            message: notification.message || '',
            duration: notification.duration || 5000,
            timestamp: new Date().toISOString(),
            ...notification
        };

        setNotifications(prev => [...prev, newNotification]);

        // Auto remove notification
        if (newNotification.duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, newNotification.duration);
        }

        // Show desktop notification if enabled
        if (settings.desktop && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(newNotification.title, {
                body: newNotification.message,
                icon: '/favicon.ico',
                tag: id
            });
        }

        // Play sound if enabled
        if (settings.sound) {
            playNotificationSound(newNotification.type);
        }

        return id;
    };

    // Remove notification
    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    // Clear all notifications
    const clearAllNotifications = () => {
        setNotifications([]);
    };

    // Play notification sound
    const playNotificationSound = (type) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Different frequencies for different types
        const frequencies = {
            success: 800,
            error: 400,
            warning: 600,
            info: 500
        };

        oscillator.frequency.setValueAtTime(frequencies[type] || 500, audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    };

    // Predefined notification types
    const notify = {
        success: (title, message, options = {}) => 
            addNotification({ type: 'success', title, message, ...options }),
        
        error: (title, message, options = {}) => 
            addNotification({ type: 'error', title, message, ...options }),
        
        warning: (title, message, options = {}) => 
            addNotification({ type: 'warning', title, message, ...options }),
        
        info: (title, message, options = {}) => 
            addNotification({ type: 'info', title, message, ...options }),

        upload: (message) => 
            addNotification({ type: 'info', title: '📁 Upload', message, duration: 3000 }),

        summary: (message) => 
            addNotification({ type: 'success', title: '📋 Summary', message, duration: 4000 }),

        export: (message) => 
            addNotification({ type: 'success', title: '💾 Export', message, duration: 3000 }),

        copy: (message) => 
            addNotification({ type: 'info', title: '📋 Copied', message, duration: 2000 })
    };

    const value = {
        notifications,
        settings,
        addNotification,
        removeNotification,
        clearAllNotifications,
        updateSettings,
        notify
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <NotificationContainer />
        </NotificationContext.Provider>
    );
};

// Notification Container Component
const NotificationContainer = () => {
    const { notifications, removeNotification } = useContext(NotificationContext);

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '400px'
        }}>
            {notifications.map(notification => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRemove={removeNotification}
                />
            ))}
        </div>
    );
};

// Individual Notification Component
const NotificationItem = ({ notification, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Animate in
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const getNotificationStyle = () => {
        const baseStyle = {
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            padding: '16px',
            minWidth: '300px',
            maxWidth: '400px',
            transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.3s ease',
            borderLeft: '4px solid',
            cursor: 'pointer',
            position: 'relative'
        };

        const typeStyles = {
            success: { borderLeftColor: '#38a169', background: '#f0fff4' },
            error: { borderLeftColor: '#e53e3e', background: '#fff5f5' },
            warning: { borderLeftColor: '#d69e2e', background: '#fffbf0' },
            info: { borderLeftColor: '#2d6cdf', background: '#f0f8ff' }
        };

        return { ...baseStyle, ...typeStyles[notification.type] };
    };

    const getIcon = () => {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[notification.type] || 'ℹ️';
    };

    return (
        <div
            style={getNotificationStyle()}
            onClick={() => onRemove(notification.id)}
            onMouseEnter={(e) => {
                e.target.style.transform = 'translateX(-5px)';
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = isVisible ? 'translateX(0)' : 'translateX(100%)';
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
            }}>
                <div style={{ fontSize: '20px', flexShrink: 0 }}>
                    {getIcon()}
                </div>
                <div style={{ flex: 1 }}>
                    <h4 style={{
                        margin: '0 0 4px 0',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#2d3748'
                    }}>
                        {notification.title}
                    </h4>
                    <p style={{
                        margin: 0,
                        fontSize: '13px',
                        color: '#4a5568',
                        lineHeight: '1.4'
                    }}>
                        {notification.message}
                    </p>
                    <div style={{
                        fontSize: '11px',
                        color: '#718096',
                        marginTop: '8px'
                    }}>
                        {new Date(notification.timestamp).toLocaleTimeString()}
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(notification.id);
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '18px',
                        color: '#a0aec0',
                        cursor: 'pointer',
                        padding: '0',
                        lineHeight: 1
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

// Hook to use notifications
export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

export default NotificationSystem;
