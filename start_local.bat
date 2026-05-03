@echo off
echo Installing Backend Dependencies...
cd backend
pip install -r requirements.txt

echo Starting FastAPI Backend (Port 8000)...
start cmd /k "uvicorn main:app --reload"

echo Installing Frontend Dependencies...
cd ..
call npm install

echo Starting Vite Frontend (Port 5173)...
start cmd /k "npm run dev"

echo KCIS System is starting up!
echo Backend API: http://localhost:8000
echo Frontend UI: http://localhost:5173
pause
