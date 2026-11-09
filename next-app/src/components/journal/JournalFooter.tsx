import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function JournalFooter() {
  return (
    <footer className="w-full border-t border-academic-border/70 bg-academic-bg text-academic-text py-12 md:py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Minimal Back to Home */}
        <Link
          href="https://www.ashifek.in"
          className="group inline-flex items-center text-xs md:text-sm font-medium tracking-wide text-academic-muted hover:text-academic-primary transition-colors focus:outline-none focus:ring-2 focus:ring-academic-primary focus:ring-offset-2 rounded-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Center: Editorial Colophon */}
        <div className="text-center">
          <p className="font-serif text-sm text-academic-primary font-medium">
            Engineering Journal
          </p>
          <p className="text-xs text-academic-muted font-sans mt-1">
            Essays, architectural blueprints & production case studies by Ashif E.K.
          </p>
        </div>

        {/* Right: Copyright & Edition */}
        <div className="text-xs text-academic-muted font-mono tracking-wider">
          © {new Date().getFullYear()} / Independent Publication
        </div>
      </div>
    </footer>
  );
}

