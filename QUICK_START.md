# 🚀 Quick Start Guide

## One-Command Setup & Run

### Windows Users

**Option 1: Batch Files (Recommended)**
```cmd
# Setup everything
setup-project.bat

# Start the project
start-project.bat
```

**Option 2: PowerShell (Alternative)**
```powershell
# Setup everything
.\setup-project.ps1

# Start the project
.\start-project.ps1
```

### Linux/Mac Users

```bash
# Make scripts executable (first time only)
chmod +x setup-project.sh start-project.sh

# Setup everything
./setup-project.sh

# Start the project
./start-project.sh
```

### Cross-Platform (NPM)

```bash
# Navigate to frontend directory
cd frontend

# Setup everything
npm run setup

# Start both servers
npm run start:full
```

### Using Make (Linux/Mac)

```bash
# Setup everything
make setup

# Start the project
make start

# See all available commands
make help
```

## 🌐 Access Your Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📋 What Each Script Does

### Setup Scripts
- Install Python dependencies (Flask, etc.)
- Install Node.js dependencies (React, etc.)
- Verify all prerequisites are met

### Start Scripts
- Start Flask backend server on port 5000
- Start React frontend server on port 3000
- Open both in separate terminal windows
- Provide easy access URLs

## 🛠️ Troubleshooting

### Common Issues

1. **"Python not found"**
   - Install Python 3.7+ from python.org
   - Make sure Python is in your PATH

2. **"Node not found"**
   - Install Node.js 14+ from nodejs.org
   - Make sure npm is in your PATH

3. **Port already in use**
   - Close other applications using ports 3000/5000
   - Or modify ports in the scripts

4. **Permission denied (Linux/Mac)**
   - Run: `chmod +x *.sh`
   - Or use: `bash setup-project.sh`

### Quick Fixes

```bash
# Windows - Run as Administrator if needed
setup-project.bat

# Linux/Mac - Fix permissions
chmod +x *.sh && ./setup-project.sh

# NPM - Clear cache and reinstall
cd frontend && npm cache clean --force && npm install
```

## 🎯 Next Steps

1. Run the setup script
2. Run the start script
3. Open http://localhost:3000 in your browser
4. Upload a medical document
5. Generate your first AI summary!

---

**Need help?** Check the full README.md for detailed instructions and troubleshooting.
