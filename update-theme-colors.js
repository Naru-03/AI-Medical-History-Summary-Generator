// Script to update hardcoded colors to CSS variables
const fs = require('fs');
const path = require('path');

const colorMappings = {
    // Background colors
    '#fff': 'var(--card-bg)',
    '#ffffff': 'var(--card-bg)',
    'white': 'var(--card-bg)',
    '#f8fafc': 'var(--bg-tertiary)',
    '#f1f5fb': 'var(--bg-tertiary)',
    '#e0eafc': 'var(--bg-secondary)',
    '#cfdef3': 'var(--bg-secondary)',
    
    // Text colors
    '#2d6cdf': 'var(--text-primary)',
    '#4a5568': 'var(--text-secondary)',
    '#666': 'var(--text-muted)',
    '#718096': 'var(--text-muted)',
    '#2c3e50': 'var(--text-primary)',
    '#333': 'var(--text-primary)',
    
    // Border colors
    '#e2e8f0': 'var(--border-color)',
    '#dbeafe': 'var(--border-color)',
    '#ddd': 'var(--border-color)',
    
    // Shadow
    '0 4px 24px rgba(0,0,0,0.10)': 'var(--shadow)',
    '0 4px 20px rgba(0,0,0,0.15)': 'var(--shadow)',
    '0 2px 10px rgba(0,0,0,0.1)': 'var(--shadow)',
    
    // Input backgrounds
    '#f8fafc': 'var(--input-bg)',
    '#f1f5fb': 'var(--input-bg)'
};

function updateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;
        
        // Replace color mappings
        for (const [oldColor, newColor] of Object.entries(colorMappings)) {
            const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            if (content.includes(oldColor)) {
                content = content.replace(regex, newColor);
                updated = true;
            }
        }
        
        if (updated) {
            fs.writeFileSync(filePath, content);
            console.log(`Updated: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
    }
}

// Files to update
const filesToUpdate = [
    'frontend/src/pages/Dashboard.js',
    'frontend/src/pages/Summary.js',
    'frontend/src/pages/History.js',
    'frontend/src/pages/Settings.js',
    'frontend/src/pages/Login.js'
];

filesToUpdate.forEach(updateFile);
console.log('Theme color updates complete!');
