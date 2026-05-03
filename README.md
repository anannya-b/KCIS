# 🏪 KCIS: Kirana Credit Intelligence System

**Remote Cash Flow Underwriting via Vision & Geo-Intelligence**  

---

## 🚀 The Vision
India's 13 million *kirana* (neighborhood grocery) stores transact over $500 billion annually, yet remain almost entirely unbanked. They lack formal credit data, GST filings, or digital bank statements. 

**KCIS solves this by treating physical space as a financial statement.** 
We built an enterprise AI portal for NBFC loan officers that uses Vision Language Models (VLMs) and Geo-Spatial intelligence to estimate a store's daily revenue, working capital, and creditworthiness using only smartphone photos and GPS coordinates.

---

## 🏗️ Project Architecture

KCIS is designed with a scalable, event-driven architecture bridging physical retail and digital finance.

### The Production Data Flow
```text
[ Borrower WhatsApp / Field Officer App ]
       │
       ▼ (Images + GPS + EXIF Data)
[ Ingestion API Gateway ]
       │
       ├─► [ Vision Engine (VLM) ] ───────► (Shelf Density, SKUs, Brand Partnerships)
       ├─► [ Geo-Spatial Engine ] ────────► (Footfall Proxy, Catchment Wealth)
       └─► [ Anti-Fraud Shield ] ─────────► (Shadow Consistency, Duplicate Check)
       │
       ▼
[ Economic Fusion Engine ] ──► (Daily Sales Formula & Confidence Intervals)
       │
       ▼
[ KCIS Loan Officer Dashboard (This Repository) ]
```

## 📱 Data Ingestion Pipelines
KCIS relies on high-fidelity, trusted data inputs. We engineered two ingestion pathways:

1. **Borrower Self-Service (Zero-Touch Underwriting)**
A kirana owner receives a pre-approved loan offer via SMS. They interact with an automated WhatsApp bot that prompts them to:
* "Take 3 photos of your shop right now using your camera."
* "Share your live location."

*Security Note:* By forcing live capture within the WhatsApp interface, we harvest unalterable EXIF metadata and GPS coordinates, instantly killing "gallery upload" spoofing attempts.

2. **Field Officer App (Manual Override)**
If the AI flags a store as "High Risk" (e.g., duplicated stock, low confidence score), the system routes the file to the Verification Queue. A human field officer uses an internal company mobile app to visit the store, capture new verified images, and override the AI recommendation if necessary.

## 💻 Tech Stack
- **Frontend Framework**: React 18 + Vite
- **Backend API**: Python FastAPI
- **Styling**: Tailwind CSS v4
- **Data Visualization**: Recharts (for Store Vitality Radar & Peer Benchmarks)
- **Icons**: Lucide-React
- **Routing**: React Router v6

## 📁 Core Directory Structure
```text
kcis-app/
├── backend/                # FastAPI backend endpoints
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI (Cards, Buttons, Layouts)
│   ├── pages/              # Main Views
│   │   ├── Login.jsx       # Auth Gateway
│   │   ├── Dashboard.jsx   # Command Center Overview
│   │   ├── NewAssessment.jsx # Data Ingestion Hub
│   │   ├── Processing.jsx  # AI Pipeline Animation
│   │   ├── Result.jsx      # Credit Intelligence Dossier
│   │   └── History.jsx     # Past Assessments & Queue
│   ├── context/            # React Context for state management
│   ├── data/               # Mock DB (Golden Borrower, Fraud Attempt, etc.)
│   ├── App.jsx             # Router Configuration
│   └── main.jsx            # React Entry Point
├── start_local.bat         # Windows automated startup script
├── tailwind.config.js      # Custom theme (Emerald/Slate)
└── package.json
```

## ⚙️ How to Run Locally

### Option 1: The Automated Startup Script (Windows)
We have provided a batch script that will automatically install dependencies and start both the backend and frontend servers.
1. Double-click on `start_local.bat` in the root of the project.
2. The Backend will start on `http://localhost:8000`
3. The Frontend will start on `http://localhost:5173`

### Option 2: Manual Startup

**1. Start the Backend API**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
*The API will run on http://localhost:8000.*

**2. Start the Frontend UI**
Open a new terminal window:
```bash
# From the root of the kcis-app directory
npm install
npm run dev
```
*The React app will run on http://localhost:5173.*

*(Note: The Vite configuration is set up to automatically proxy `/api` requests to the FastAPI backend.)*

## 🔮 Future Roadmap
- **Live Gemini 1.5 Pro Integration**: Replacing the simulated mock data with live VLM API endpoints.
- **Dynamic Circle Rates**: Integrating state government real estate APIs to dynamically pull rent estimates based on the GPS pin.
- **Temporal Footfall Overlay**: Adjusting the confidence scores based on the time of day the photo was taken versus surrounding POI peak hours.

---
*Built with ❤️ for the TenzorX Fincorp Hackathon.*
