@echo off
REM Lost & Found Platform - Automated Setup Script for Windows
REM Installs all dependencies for backend and frontend

echo.
echo 🚀 Starting Lost & Found Platform Setup...
echo.

REM Backend Setup
echo.
echo 📦 Setting up Backend...
cd backend
echo Installing backend dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Backend setup failed
    exit /b 1
)
echo ✅ Backend setup complete!

REM Frontend Setup
echo.
echo 📦 Setting up Frontend...
cd ..\frontend
echo Installing frontend dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Frontend setup failed
    exit /b 1
)
echo ✅ Frontend setup complete!

echo.
echo ✅ All setup complete!
echo.
echo 🎯 Next steps:
echo 1. Backend: cd backend ^&^& npm run dev
echo 2. Frontend: cd frontend ^&^& npm start (in new terminal)
echo.
echo 📚 Documentation:
echo - Backend: backend\SETUP.md
echo - Frontend: frontend\SETUP.md
echo.

cd ..
