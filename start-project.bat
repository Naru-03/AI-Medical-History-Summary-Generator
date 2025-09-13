@echo off
echo ========================================
echo    MedAI Assistant - Project Starter
echo ========================================
echo.

echo Starting backend server...
start "Backend Server" cmd /k "cd backend && python app.py"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting frontend development server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo    Both servers are starting up!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul
