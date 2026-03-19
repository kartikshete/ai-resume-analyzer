# 📄 AI Resume Analyzer

**AI Resume Analyzer** is a full-stack tool built to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). It parses PDF resumes, detects key skills, and calculates a professional score based on industry-standard criteria.

### ✨ Key Features
- **PDF Parsing**: High-fidelity text extraction using `pdfplumber`.
- **Skill Detection**: Automatically identifies core technical skills and tools.
- **ATS Scoring**: Provides a baseline score to gauge how well your profile is optimized.
- **AI Feedback**: AI-driven suggestions for improving readability and impact.
- **Modern UI**: Clean, responsive dashboard built with **React** and **Tailwind CSS**.

### 🛠️ Tech Stack
- **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [FastAPI (Python)](https://fastapi.tiangolo.com/)
- **Text Extraction**: `pdfplumber`
- **Icons**: [Lucide React](https://lucide.dev/)

### 🚀 Setup & Installation

#### Frontend (Client)
```bash
cd client
npm install
npm run dev
```

#### Backend (Server)
```bash
cd server
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python main.py
```

### 🤝 Contributing
Contributions are always welcome. Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### 📝 TODO / Possible Enhancements
- [ ] Connect with a real Gemini API for deep semantic analysis.
- [ ] Add support for Docx file formats.
- [ ] Implement multi-resume comparison dashboard.
- [ ] Job description matching feature.

---
*Created by [Kartik Shete](https://github.com/kartikshete)*
