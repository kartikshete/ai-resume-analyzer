import React, { useState } from 'react';
import axios from 'axios';
import { Brain, Sparkles, CheckCircle, Loader2, Upload, AlertCircle } from 'lucide-react';
import ScoreCard from './components/ScoreCard';
import CONFIG from './config';

function App() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            setError("Only PDF files are supported for now.");
            return;
        }
        setFile(selectedFile);
        setError(null);
    };

    const handleAnalyze = async () => {
        if (!file) {
            setError("Please upload a resume first.");
            return;
        }

        setLoading(true);
        setError(null);
        
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Using axios for better request handling
            const response = await axios.post(`${CONFIG.API_BASE_URL}/analyze`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 120000 // Extended timeout for AI processing
            });
            
            console.log("[Dev] Analysis successful:", response.data);
            setResult(response.data);
        } catch (err) {
            console.error("[Error] Analysis failed:", err);
            setError("Something went wrong with the analysis. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-sans text-slate-800 p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Main Header */}
                <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
                        <Brain className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                        AI Resume Analyzer
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Get instant feedback on your resume. Our AI checks for keywords, ATS compatibility, and overall impact.
                    </p>
                </div>

                {/* Upload Section */}
                <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50 text-center space-y-8 max-w-3xl mx-auto transition-all hover:shadow-indigo-100/50">
                    <div className="border-3 border-dashed border-indigo-100 rounded-2xl p-12 hover:bg-white/50 hover:border-indigo-300 transition-all cursor-pointer relative group">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center gap-4 pointer-events-none group-hover:scale-105 transition-transform duration-300">
                            <div className="bg-indigo-50 p-6 rounded-full text-indigo-600 shadow-sm">
                                <Upload size={40} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-1">
                                <p className="font-bold text-xl text-slate-700">
                                    {file ? <span className="text-indigo-600">{file.name}</span> : "Drop your resume here"}
                                </p>
                                <p className="text-sm text-slate-400 font-medium tracking-wide italic">
                                    (PDF files only)
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={!file || loading}
                        className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200/50 transition-all transform ${!file || loading
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <Loader2 className="animate-spin w-6 h-6" /> Running AI Analysis...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Start Analysis <Sparkles className="w-5 h-5" />
                            </span>
                        )}
                    </button>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center justify-center gap-2 font-medium border border-red-100">
                            <AlertCircle size={20} /> {error}
                        </div>
                    )}
                </div>

                {/* Dashboard Results Section */}
                {result && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        
                        <ScoreCard score={result.score} />

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Skills section */}
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col h-full hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                                    <span className="bg-green-100 p-2 rounded-lg text-green-600"><CheckCircle size={20} /></span>
                                    Key Skills Found
                                </h3>
                                <div className="flex flex-wrap gap-3 content-start">
                                    {result.skills?.map((skill, i) => (
                                        <span key={i} className="bg-slate-50 text-slate-700 border border-slate-100 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm">
                                            {skill}
                                        </span>
                                    ))}
                                    {(!result.skills || result.skills.length === 0) && (
                                        <p className="text-slate-400 italic">Could not identify specific skills.</p>
                                    )}
                                </div>
                            </div>

                            {/* Recommendations section */}
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col h-full hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                                    <span className="bg-orange-100 p-2 rounded-lg text-orange-600"><Sparkles size={20} /></span>
                                    AI Feedback
                                </h3>
                                <ul className="space-y-4">
                                    {result.suggestions?.map((tip, i) => (
                                        <li key={i} className="flex gap-4 text-slate-600 text-sm leading-relaxed p-3 bg-slate-50 rounded-xl">
                                            <div className="mt-1 min-w-[20px] text-orange-500 font-bold">•</div>
                                            {tip}
                                        </li>
                                    ))}
                                    {(!result.suggestions || result.suggestions.length === 0) && (
                                        <p className="text-slate-400 italic">No specific suggestions for this profile.</p>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Summary View */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                            <h3 className="text-xl font-bold mb-4 text-slate-800">Profile Summary</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">{result.summary}</p>
                        </div>
                        
                        {/* TODO: Add 'Download Report' button later */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
