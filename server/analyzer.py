import pdfplumber
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

class ResumeAnalyzer:
    """
    Core logic for parsing resume content and generating insights.
    Currently uses local parsing; TODO: Integrate Gemini Pro for better extraction.
    """

    @staticmethod
    def extract_text(file_path):
        text = ""
        try:
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    content = page.extract_text()
                    if content:
                        text += content + "\n"
        except Exception as e:
            print(f"Error reading PDF: {e}")
            raise
        return text

    @staticmethod
    def analyze_resume(text):
        # Extract basic info with some simple regex
        name = ResumeAnalyzer._extract_name(text)
        email = ResumeAnalyzer._extract_email(text)
        skills = ResumeAnalyzer._extract_skills(text)
        
        # Basic scoring algorithm (placeholder)
        score = ResumeAnalyzer._calculate_score(text, skills)
        
        # Summary building - keeping it semi-dynamic
        skill_sample = ", ".join(skills[:3]) if skills else "various technologies"
        summary = (
            f"Based on the text parsed, {name} appears to be a candidate with "
            f"experience in {skill_sample}. The profile shows decent technical "
            "foundations for a modern software role."
        )
        
        # Fixed suggestions for now, should be more dynamic later
        suggestions = [
            "Use more data-driven bullet points (e.g. 'Reduced latency by 20%')",
            "Ensure your most relevant skills are in the top 1/3 of the page",
            "Missing keywords related to modern DevOps might hurt ATS scoring",
            "Consider adding links to your portfolio or GitHub repositories"
        ]
        
        return {
            "score": score,
            "name": name,
            "email": email,
            "summary": summary,
            "skills": skills,
            "suggestions": suggestions
        }
    
    @staticmethod
    def _extract_name(text):
        # Very rough name extraction - usually the first line
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        for line in lines[:3]:
            # Guessing name doesn't have @ and is short
            if len(line) > 3 and len(line) < 40 and '@' not in line:
                if re.match(r'^[A-Za-z\s\.]+$', line):
                    return line
        return "Unknown Candidate"
    
    @staticmethod
    def _extract_email(text):
        pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        match = re.search(pattern, text)
        return match.group(0) if match else "N/A"
    
    @staticmethod
    def _extract_skills(text):
        # Using a fixed list for now, ideally this would be an ML model or larger JSON
        KEYWORDS = [
            'Python', 'JavaScript', 'React', 'Node.js', 'Java', 'SQL', 'Git',
            'Docker', 'Kubernetes', 'AWS', 'TypeScript', 'FastAPI', 'HTML', 'CSS',
            'Tailwind', 'REST API', 'Machine Learning', 'AI', 'Full Stack'
        ]
        
        found = []
        text_lower = text.lower()
        for kw in KEYWORDS:
            if kw.lower() in text_lower:
                found.append(kw)
        
        return found[:12] # Limit to top 12

    @staticmethod
    def _calculate_score(text, skills):
        # Heuristic scoring
        val = 50 
        val += len(skills) * 3
        if len(text) > 1500: val += 10
        if 'experience' in text.lower(): val += 5
        if 'education' in text.lower(): val += 5
        
        return min(val, 98) # Nobody is perfect!
