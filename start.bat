@echo off
echo Starting kvadroklimat...

echo [1/2] Starting backend...
start "Backend" cmd /c "cd /d %~dp0backend && npm run start:dev"

timeout /t 3 /nobreak >nul

echo [2/2] Starting frontend...
start "Frontend" cmd /c "cd /d %~dp0frontend && npm run dev"

echo.
echo Backend:  http://localhost:4000
echo Frontend: http://localhost:3000
echo Admin:    http://localhost:3000/admin
echo Login:    admin@kvadroklimat.ru / admin123
echo.
pause
