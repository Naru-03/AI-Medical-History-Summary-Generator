import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('appTheme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
        
        // Save to localStorage
        localStorage.setItem('appTheme', theme);

        // Apply theme-specific styles
        applyThemeStyles(theme);
    }, [theme, isLoaded]);

    const applyThemeStyles = (currentTheme) => {
        const root = document.documentElement;
        
        if (currentTheme === 'dark') {
            root.style.setProperty('--bg-primary', '#1a202c');
            root.style.setProperty('--bg-secondary', '#2d3748');
            root.style.setProperty('--bg-tertiary', '#4a5568');
            root.style.setProperty('--text-primary', '#f7fafc');
            root.style.setProperty('--text-secondary', '#e2e8f0');
            root.style.setProperty('--text-muted', '#a0aec0');
            root.style.setProperty('--border-color', '#4a5568');
            root.style.setProperty('--shadow', '0 4px 24px rgba(0,0,0,0.3)');
            root.style.setProperty('--card-bg', '#2d3748');
            root.style.setProperty('--input-bg', '#4a5568');
            root.style.setProperty('--nav-bg', 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)');
        } else {
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f7fafc');
            root.style.setProperty('--bg-tertiary', '#edf2f7');
            root.style.setProperty('--text-primary', '#2d3748');
            root.style.setProperty('--text-secondary', '#4a5568');
            root.style.setProperty('--text-muted', '#718096');
            root.style.setProperty('--border-color', '#e2e8f0');
            root.style.setProperty('--shadow', '0 4px 24px rgba(0,0,0,0.1)');
            root.style.setProperty('--card-bg', '#ffffff');
            root.style.setProperty('--input-bg', '#ffffff');
            root.style.setProperty('--nav-bg', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
        }
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const setThemeMode = (newTheme) => {
        if (newTheme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        } else {
            setTheme(newTheme);
        }
    };

    const value = {
        theme,
        isLoaded,
        toggleTheme,
        setThemeMode,
        isDark: theme === 'dark'
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeProvider;
