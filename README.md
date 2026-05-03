# Kirana Credit Intelligence System (KCIS)

The KCIS is a multimodal AI underwriting framework that estimates the cash flow of unbanked kirana stores using only smartphone images and GPS coordinates.

## Architecture
- **Frontend**: React 18, Vite, Tailwind CSS v4
- **Backend**: Python FastAPI
- **Mock Demo Data**: Pre-loaded images and outputs simulating Gemini 1.5 Pro and OpenStreetMap data.

## How to Run Locally

### Option 1: Using the Startup Script (Windows)
We have provided a batch script that will automatically install dependencies and start both the backend and frontend servers.
1. Double click on `start_local.bat` in the root of the project.
2. The Backend will start on `http://localhost:8000`
3. The Frontend will start on `http://localhost:5173`

### Option 2: Manual Startup

**1. Start the Backend API**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The API will run on http://localhost:8000.

**2. Start the Frontend UI**
Open a new terminal window:
```bash
# From the root of the kcis-app directory
npm install
npm run dev
```
The React app will run on http://localhost:5173.

The Vite configuration is set up to automatically proxy `/api` requests to the FastAPI backend.
