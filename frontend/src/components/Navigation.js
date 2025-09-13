import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

function Navigation() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/summary', label: 'Summary', icon: '📋' },
        { path: '/history', label: 'History', icon: '📚' },
        { path: '/settings', label: 'Settings', icon: '⚙️' }
    ];

    return (
        <nav style={{
            background: 'var(--nav-bg)',
            padding: '1rem 2rem',
            boxShadow: 'var(--shadow)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <h1 style={{
                        color: 'white',
                        margin: 0,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }}>
                        🏥 MedAI Assistant
                    </h1>
                </div>
                
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                }}>
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                color: location.pathname === item.path ? '#ffd700' : 'white',
                                textDecoration: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                background: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                            }}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                    
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = '/';
                        }}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.3)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0.3)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0.2)';
                        }}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
