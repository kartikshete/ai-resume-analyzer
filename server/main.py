from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import shutil
import os
import logging
from analyzer import ResumeAnalyzer

# Setup basic logging for dev
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI Resume Analyzer API")

# Configure CORS - allowing all for local dev, should restrict in prod
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.get("/")
async def root():
    return {"status": "online", "message": "Resume analyzer service is running."}

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    # Basic file type check
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files please!")

    file_location = os.path.join(UPLOAD_DIR, file.filename)
    
    try:
        logger.info(f"Processing upload: {file.filename}")
        
        # Save file to temp location
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Extract Text using pdfplumber
        text = ResumeAnalyzer.extract_text(file_location)
        if not text.strip():
            raise ValueError("Could not extract any text from the PDF.")
        
        # Main analysis logic
        analysis_result = ResumeAnalyzer.analyze_resume(text)
        
        return analysis_result

    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to process resume: {str(e)}")
        
    finally:
        # We might want to keep files for a bit, or delete them immediately
        # For now, let's just keep them in 'uploads' for debugging
        pass

if __name__ == "__main__":
    # Running uvicorn directly for convenience
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
