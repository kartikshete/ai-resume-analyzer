import React from 'react';

const ScoreCard = ({ score }) => {
    // Determine color based on score value
    const getScoreColor = (val) => {
        if (val >= 80) return 'text-green-500';
        if (val >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2 opacity-50"></div>

            <div className="space-y-2 text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-800">Overall Score</h2>
                <p className="text-slate-500">Based on industry standards and keyword relevance.</p>
            </div>

            <div className="relative">
                <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                        className="text-slate-100"
                        strokeWidth="12"
                        stroke="currentColor"
                        fill="transparent"
                        r="70"
                        cx="80"
                        cy="80"
                    />
                    <circle
                        className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
                        strokeWidth="12"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (440 * score) / 100}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="70"
                        cx="80"
                        cy="80"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-black text-slate-800">{score}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Score</span>
                </div>
            </div>
        </div>
    );
};

export default ScoreCard;
