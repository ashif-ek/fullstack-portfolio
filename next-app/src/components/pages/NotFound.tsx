import React from 'react';
import Link from 'next/link';

// --- Icon for the button ---
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

// --- The 404 Not Found Page Component ---
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-academic-bg text-academic-text font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements matching the academic style */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-academic-accent"></div>

      {/* Refined subtle gradients instead of bright pulses */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-academic-primary/5 rounded-full filter blur-[150px]"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-academic-accent/5 rounded-full filter blur-[150px]"></div>

      <div className="relative z-10 text-center animate-fade-in-up">
        <h1 className="text-8xl md:text-9xl font-serif font-bold text-academic-primary mb-2">
          404
        </h1>

        <div className="h-1 w-12 bg-academic-accent mx-auto mb-6"></div>

        <p className="text-2xl md:text-3xl font-serif font-semibold text-academic-primary mb-4">
          Archival Error: Missing Manuscript
        </p>

        <p className="text-academic-muted max-w-sm mx-auto mb-10 leading-relaxed italic">
          "The record you seek appears to have been misplaced in our digital archives or never existed in this collection."
        </p>

        <Link
          href="/"
          className="academic-button inline-flex items-center"
        >
          <HomeIcon />
          Return to Registry
        </Link>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// Default export for the App
export default function App() {
  return <NotFoundPage />;
}
