import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { getPublishedLexiconWords } from '../../lib/actions/lexiconActions';
import { FloatingLexiconUniverse } from '../../components/lexicon/FloatingLexiconUniverse';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

export const metadata: Metadata = {
  title: 'Lexicon | Ashif E.K',
  description: 'Words I return to. Ideas I live by. A personal digital universe of words, philosophical concepts, and engineering principles.',
  openGraph: {
    title: 'Lexicon | Ashif E.K',
    description: 'Words I return to. Ideas I live by. A personal digital universe of concepts and principles.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lexicon | Ashif E.K',
    description: 'Words I return to. Ideas I live by.',
  }
};

export const revalidate = 3600;

export default async function LexiconPage() {
  const words = await getPublishedLexiconWords();

  return (
    <div className="min-h-screen bg-academic-bg text-academic-text flex flex-col justify-between selection:bg-academic-primary/20 selection:text-academic-primary">
      {/* Top Navigation */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-8 md:pt-12">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center text-xs md:text-sm font-medium tracking-wide text-academic-muted hover:text-academic-primary transition-colors focus:outline-none focus:ring-2 focus:ring-academic-primary focus:ring-offset-4 focus:ring-offset-academic-bg rounded-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <ThemeToggle />
        </nav>

        {/* Editorial Page Header */}
        <div className="mt-12 md:mt-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-academic-primary tracking-tight">
            Lexicon
          </h1>
          <p className="mt-3 text-lg md:text-xl font-serif italic text-academic-muted">
            Words I return to. Ideas I live by.
          </p>
          <div className="h-px w-12 bg-academic-accent mx-auto my-6" />
          <p className="text-xs md:text-sm font-sans text-academic-muted/80 max-w-lg mx-auto leading-relaxed">
            “Some words describe the world. Others change the way we see it.”
          </p>
        </div>
      </header>

      {/* Interactive Floating Universe Canvas */}
      <main className="flex-1 w-full mt-6">
        <FloatingLexiconUniverse initialWords={words} />
      </main>

      {/* Bottom Navigation */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-16 border-t border-academic-border mt-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-academic-muted">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="group inline-flex items-center font-medium hover:text-academic-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <a
              href="#top"
              className="group inline-flex items-center hover:text-academic-primary transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5 mr-1.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Return to the beginning
            </a>
          </div>

          <p className="font-serif italic text-[11px] text-academic-muted/70">
            A quiet space of intellectual curiosity, character, and engineering principles.
          </p>
        </div>
      </footer>
    </div>
  );
}
