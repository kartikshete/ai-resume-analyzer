# 📄 AI Resume Analyzer

[![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python)](https://www.python.org/)

**AI Resume Analyzer** is a powerful tool designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). It extracts text from PDF resumes, analyzes key skills, and provides a comprehensive score along with actionable improvement suggestions.

---

## 🏗️ System Architecture

The application follows a decoupled client-server architecture, ensuring scalability and a smooth user experience.

```mermaid
graph TD
    User([User]) -- Uploads PDF --> UI[React Frontend]
    UI -- API Request --> API[FastAPI Backend]
    
    subgraph Analysis_Engine [Core Analysis Engine]
    API -- Read File --> PDF[pdfplumber]
    PDF -- Raw Text --> Logic[Heuristic Analyzer]
    Logic -- Scoring & Insights --> API
    end
    
    API -- JSON Response --> UI
    UI -- Display Report --> User
    
    style UI fill:#f0f9ff,stroke:#0ea5e9,stroke-width:2px
    style API fill:#fdf2f8,stroke:#ec4899,stroke-width:2px
    style Analysis_Engine fill:#f0fdf4,stroke:#22c55e,stroke-width:2px
```

## 📂 Project Structure

The project is divided into two main components:

### 💻 Client (Frontend)
- **Framework**: React 18 with Vite.
- **Styling**: Tailwind CSS for a modern, responsive UI.
- **Features**: Drag-and-drop file upload, real-time score visualization, and organized suggestion cards.

### ⚙️ Server (Backend)
- **Framework**: FastAPI (Python).
- **Extraction**: `pdfplumber` for robust text extraction from PDF documents.
- **Analysis**: A heuristic engine that identifies technical skills, evaluates resume structure, and calculates an ATS-friendly score.

## ✨ Key Features

- **🚀 Instant Analysis**: Get your resume score and feedback in seconds.
- **🔍 Skill Extraction**: Automatically identifies technical keywords from your resume.
- **📈 ATS Scoring**: Calculates a score based on industry standards for resume optimization.
- **💡 Actionable Suggestions**: Provides specific tips to improve your resume's impact.
- **📱 Responsive UI**: Works perfectly on desktops, tablets, and mobile devices.

## 🚀 Getting Started

### Backend Setup
1. Navigate to the `server` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   python main.py
   ```

### Frontend Setup
1. Navigate to the `client` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Framer Motion
- **Backend**: Python, FastAPI, Uvicorn
- **Libraries**: pdfplumber, python-dotenv

## 👨‍💻 Author

**Kartik Shete**
- GitHub: [@kartikshete](https://github.com/kartikshete)

---
*Helping candidates build better resumes, one byte at a time.*

<!-- Documentation update 0 -->
<!-- Documentation update 13 -->