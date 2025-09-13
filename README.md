# 🏥 MedAI Assistant - Medical History Summarizer

A modern web application that uses AI to analyze and summarize medical documents, providing comprehensive health insights with a beautiful, professional interface.

## 🚀 Quick Run (One Command)

**Windows:**
```bash
setup-project.bat && start-project.bat
```

**Linux/Mac:**
```bash
chmod +x *.sh && ./setup-project.sh && ./start-project.sh
```

**NPM (All Platforms):**
```bash
cd frontend && npm run setup && npm run start:full
```

**Access:** http://localhost:3000

---

## ✨ Features

- **📁 Document Upload**: Support for PDF, TXT, DOC, and DOCX files
- **🤖 AI-Powered Analysis**: Intelligent medical document processing
- **📋 Comprehensive Summaries**: Detailed health condition and medication analysis
- **📚 History Management**: View and manage all past summaries
- **💾 Export Options**: Download summaries in multiple formats
- **⚙️ Settings & Preferences**: Customizable app experience
- **📱 Responsive Design**: Works perfectly on all devices
- **🔄 Real-time Loading**: Beautiful loading states and progress indicators

## 🚀 Quick Start

### Option 1: One-Command Setup & Run (Recommended)

**Windows:**
```bash
# Setup and start in one command
setup-project.bat && start-project.bat
```

**Linux/Mac:**
```bash
# Setup and start in one command
chmod +x *.sh && ./setup-project.sh && ./start-project.sh
```

**NPM (All Platforms):**
```bash
# Setup and start in one command
cd frontend && npm run setup && npm run start:full
```

### Option 2: Step-by-Step Setup

**Windows:**
```bash
# Run setup script
setup-project.bat

# Start the project
start-project.bat
```

**Linux/Mac:**
```bash
# Make scripts executable
chmod +x setup-project.sh start-project.sh

# Run setup script
./setup-project.sh

# Start the project
./start-project.sh
```

### Option 3: Manual Setup

1. **Backend Setup:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Option 3: NPM Scripts

```bash
# Install all dependencies
cd frontend
npm run setup

# Start both servers
npm run start:full

# Or start individually
npm run start:backend  # Backend only
npm start              # Frontend only
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
AI Project/
├── backend/
│   ├── app.py              # Flask backend server
│   ├── requirements.txt    # Python dependencies
│   └── uploads/            # Uploaded files storage
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main application pages
│   │   └── App.js          # Main application component
│   ├── package.json        # Node.js dependencies
│   └── public/             # Static assets
├── start-project.bat       # Windows startup script
├── start-project.sh        # Linux/Mac startup script
├── setup-project.bat       # Windows setup script
├── setup-project.sh        # Linux/Mac setup script
└── README.md               # This file
```

## 🛠️ Available Scripts

### Windows Batch Files
- `setup-project.bat` - Install all dependencies
- `start-project.bat` - Start both servers

### Linux/Mac Shell Scripts
- `setup-project.sh` - Install all dependencies
- `start-project.sh` - Start both servers

### NPM Scripts
- `npm run setup` - Install all dependencies
- `npm run start:full` - Start both servers simultaneously
- `npm run start:backend` - Start backend only
- `npm start` - Start frontend only
- `npm run build` - Build for production
- `npm run serve:prod` - Serve production build

**One-Command NPM Setup & Run:**
```bash
cd frontend && npm run setup && npm run start:full
```

## 🔧 Prerequisites

- **Python 3.7+** with pip
- **Node.js 14+** with npm
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 📱 Pages Overview

### 🏠 Dashboard
- Upload medical documents
- Generate AI summaries
- View current summary data
- Reset functionality

### 📋 Summary
- Detailed medical report view
- Export options (TXT/JSON)
- Copy to clipboard
- Professional formatting

### 📚 History
- View all past summaries
- Manage summary history
- Quick access to previous reports

### ⚙️ Settings
- App preferences
- Export settings
- Data management
- Theme options

## 🎨 UI Features

- **Modern Design**: Clean, professional medical interface
- **Loading States**: Beautiful spinners and progress bars
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects and transitions
- **Color-coded Data**: Visual indicators for conditions and medications
- **Toast Notifications**: User feedback for actions

## 🔒 Security & Privacy

- All data is processed locally
- No data is sent to external servers
- Secure file upload handling
- Client-side data storage

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Backend: Change port in `backend/app.py`
   - Frontend: Use `PORT=3001 npm start`

2. **Python Dependencies**
   - Ensure Python 3.7+ is installed
   - Try: `pip install --upgrade pip`

3. **Node.js Dependencies**
   - Clear cache: `npm cache clean --force`
   - Delete node_modules and reinstall

4. **File Upload Issues**
   - Check file format (PDF, TXT, DOC, DOCX)
   - Ensure file size is reasonable

### Getting Help

1. Check the console for error messages
2. Ensure both servers are running
3. Verify all dependencies are installed
4. Check file permissions

## 📄 License

This project is for educational and informational purposes only. The medical summaries generated are not diagnostic and should not replace professional medical advice.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the console logs
3. Ensure all prerequisites are met

---

**⚠️ Medical Disclaimer**: This application is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
