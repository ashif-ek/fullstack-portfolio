'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Quote, Sparkles, BookOpen, Layers } from 'lucide-react';
import { LexiconWordItem } from '../../lib/actions/lexiconActions';

interface LexiconDetailPanelProps {
  word: LexiconWordItem | null;
  onClose: () => void;
  onSelectWord?: (word: LexiconWordItem) => void;
  allWords?: LexiconWordItem[];
}

export function LexiconDetailPanel({
  word,
  onClose,
  onSelectWord,
  allWords = []
}: LexiconDetailPanelProps) {
  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!word) return null;

  const currentIndex = allWords.findIndex(w => w.id === word.id);
  const prevWord = currentIndex > 0 ? allWords[currentIndex - 1] : null;
  const nextWord = currentIndex >= 0 && currentIndex < allWords.length - 1 ? allWords[currentIndex + 1] : null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-end"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lexicon-word-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        />

        {/* Slide-over Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-lg h-full bg-academic-paper border-l border-academic-border shadow-2xl flex flex-col z-10 overflow-hidden"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between p-6 border-b border-academic-border bg-academic-bg/50">
            <div className="flex items-center gap-2 text-xs font-mono text-academic-muted uppercase tracking-widest">
              <BookOpen size={14} className="text-academic-accent" />
              <span>Lexicon Concept #{word.id}</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Previous / Next buttons */}
              {prevWord && onSelectWord && (
                <button
                  onClick={() => onSelectWord(prevWord)}
                  className="p-1.5 rounded-sm text-academic-muted hover:text-academic-primary hover:bg-academic-bg transition-colors"
                  title={`Previous: ${prevWord.word}`}
                  aria-label="Previous word"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              {nextWord && onSelectWord && (
                <button
                  onClick={() => onSelectWord(nextWord)}
                  className="p-1.5 rounded-sm text-academic-muted hover:text-academic-primary hover:bg-academic-bg transition-colors"
                  title={`Next: ${nextWord.word}`}
                  aria-label="Next word"
                >
                  <ArrowRight size={16} />
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1.5 rounded-sm text-academic-muted hover:text-academic-primary hover:bg-academic-bg transition-colors focus:outline-none focus:ring-2 focus:ring-academic-primary"
                aria-label="Close detail panel"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            {/* Category tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 text-[11px] font-sans font-medium uppercase tracking-wider rounded-full bg-academic-border/40 text-academic-primary border border-academic-border">
                {word.category}
              </span>
              {word.categories?.filter(c => c !== word.category).map(cat => (
                <span
                  key={cat}
                  className="px-2 py-0.5 text-[10px] font-sans text-academic-muted rounded-full bg-academic-bg border border-academic-border"
                >
                  {cat}
                </span>
              ))}
              {word.importance === 3 && (
                <span className="inline-flex items-center gap-1 text-[10px] font-sans text-amber-600 dark:text-amber-400 font-medium px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <Sparkles size={11} /> Anchor Philosophy
                </span>
              )}
            </div>

            {/* Word Title */}
            <div>
              <h2
                id="lexicon-word-title"
                className="text-4xl md:text-5xl font-serif font-bold text-academic-primary tracking-tight"
              >
                {word.word}
              </h2>
              <div className="h-0.5 w-12 bg-academic-accent mt-4" />
            </div>

            {/* Meaning Section */}
            {word.shortMeaning && (
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-academic-muted flex items-center gap-2">
                  <span>Core Definition</span>
                </h3>
                <p className="text-base text-academic-text/90 leading-relaxed font-sans font-normal border-l-2 border-academic-border pl-4 py-0.5">
                  {word.shortMeaning}
                </p>
              </div>
            )}

            {/* Personal Note / In Practice */}
            {word.personalNote && (
              <div className="space-y-3 p-5 rounded-md bg-academic-bg border border-academic-border">
                <div className="flex items-center gap-2 text-xs font-serif italic text-academic-primary font-semibold">
                  <Quote size={14} className="text-academic-accent rotate-180" />
                  <span>Personal Reflection & Practice</span>
                </div>
                <p className="text-sm font-serif italic text-academic-muted leading-relaxed">
                  "{word.personalNote}"
                </p>
              </div>
            )}

            {/* Meta attributes */}
            <div className="pt-6 border-t border-academic-border grid grid-cols-2 gap-4 text-xs font-mono text-academic-muted">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-academic-muted/70">Visual Scale</span>
                <span className="capitalize font-sans text-academic-text">{word.fontSize}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-academic-muted/70">Motion Style</span>
                <span className="capitalize font-sans text-academic-text">{word.animationStyle.replace('-', ' ')}</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-academic-border bg-academic-bg/40 text-center">
            <p className="text-[11px] font-serif italic text-academic-muted">
              “Some words describe the world. Others change the way we see it.”
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
