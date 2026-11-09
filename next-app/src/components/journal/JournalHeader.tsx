import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export function JournalHeader() {
  return (
    <header className="w-full border-b border-academic-border/70 bg-academic-bg/95 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Left: Back to Portfolio Home */}
        <Link
          href="https://www.ashifek.in"
          className="group inline-flex items-center text-xs md:text-sm font-medium tracking-wide text-academic-muted hover:text-academic-primary transition-colors focus:outline-none focus:ring-2 focus:ring-academic-primary focus:ring-offset-2 rounded-sm"
          aria-label="Back to Ashif E.K Portfolio Home"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Center: Journal Brand Monogram / Identity */}
        <Link
          href="/blog"
          className="group flex flex-col items-center focus:outline-none"
        >
          <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-academic-primary group-hover:text-academic-accent transition-colors">
            Engineering Journal
          </span>
          <span className="text-[9px] md:text-[10px] uppercase font-mono tracking-widest text-academic-muted/80">
            Ashif E.K / Volume MMXXVI
          </span>
        </Link>

        {/* Right: Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

