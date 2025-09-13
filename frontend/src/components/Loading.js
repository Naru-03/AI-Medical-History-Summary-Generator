import React from 'react';

function Loading({ message = 'Loading...', size = 'medium' }) {
    const sizeStyles = {
        small: { width: '20px', height: '20px' },
        medium: { width: '40px', height: '40px' },
        large: { width: '60px', height: '60px' }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            gap: '1rem'
        }}>
            <div style={{
                ...sizeStyles[size],
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
            <p style={{
                color: '#666',
                fontSize: '1rem',
                margin: 0,
                textAlign: 'center'
            }}>
                {message}
            </p>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default Loading;
