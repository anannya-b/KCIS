from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio

app = FastAPI(title="KCIS API", description="Backend for Kirana Credit Intelligence System")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class AssessmentRequest(BaseModel):
    image_url: str
    gps: str
    type: str

@app.post("/api/assess")
async def run_assessment(request: AssessmentRequest):
    # Simulate processing delay to allow frontend to show the dramatic 15s loading sequence
    # Note: the frontend already handles the 15s timer, so we just return quickly here
    # or we can do a slight delay
    await asyncio.sleep(1)
    
    # Mock response based on the 'type' sent from the demo frontend
    # In a real scenario, this is where we call Gemini 1.5 API and OpenStreetMap API
    
    if request.type == "golden":
        return {
            "status": "success",
            "verdict": "APPROVE",
            "confidence": 0.92,
            "recommended_loan_amount": 350000,
            "daily_sales": 35424,
            "monthly_revenue": 921000,
            "normalized_annual_income": 1105200,
            "margin_estimate": "15%",
            "metrics": {
                "digital_adoption_index": 0.85,
                "footfall_proxy_score": 92,
                "brand_partnerships": 4,
                "sku_diversity": 8
            },
            "fraud_checks": {
                "exif_integrity": True,
                "shadow_consistency": True,
                "duplicate_objects": False
            }
        }
    elif request.type == "sparse":
        return {
            "status": "success",
            "verdict": "CONDITIONAL APPROVE",
            "confidence": 0.85,
            "recommended_loan_amount": 80000,
            "daily_sales": 5860,
            "monthly_revenue": 152300,
            "normalized_annual_income": 219300,
            "margin_estimate": "10%",
            "metrics": {
                "digital_adoption_index": 0.40,
                "footfall_proxy_score": 65,
                "brand_partnerships": 1,
                "sku_diversity": 3
            },
            "fraud_checks": {
                "exif_integrity": True,
                "shadow_consistency": True,
                "duplicate_objects": False
            }
        }
    elif request.type == "fraud":
        return {
            "status": "success",
            "verdict": "NEEDS VERIFICATION",
            "confidence": 0.41,
            "recommended_loan_amount": 0,
            "daily_sales": 0,
            "monthly_revenue": 0,
            "normalized_annual_income": 0,
            "margin_estimate": "N/A",
            "metrics": {
                "digital_adoption_index": 0.10,
                "footfall_proxy_score": 45,
                "brand_partnerships": 1,
                "sku_diversity": 2
            },
            "fraud_checks": {
                "exif_integrity": False,
                "shadow_consistency": False,
                "duplicate_objects": True
            }
        }
    
    raise HTTPException(status_code=400, detail="Invalid assessment type")

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
