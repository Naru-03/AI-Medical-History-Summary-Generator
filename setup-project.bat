@echo off
echo ========================================
echo    MedAI Assistant - Project Setup
echo ========================================
echo.

echo Installing Python dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing Python dependencies!
    pause
    exit /b 1
)

echo.
echo Installing Node.js dependencies...
cd ../frontend
npm install
if %errorlevel% neq 0 (
    echo Error installing Node.js dependencies!
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo Run 'start-project.bat' to start both servers
echo.
pause
