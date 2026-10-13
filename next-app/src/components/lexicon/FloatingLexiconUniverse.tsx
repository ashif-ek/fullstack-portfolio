'use client';

import React, { useState, useMemo, useId } from 'react';
import { Search, Sparkles, Compass, List, Grid3X3, ArrowUpDown, X } from 'lucide-react';
import { LexiconWordItem } from '../../lib/actions/lexiconActions';
import { LexiconDetailPanel } from './LexiconDetailPanel';

interface FloatingLexiconUniverseProps {
  initialWords: LexiconWordItem[];
}

const CATEGORIES = [
  'All Concepts',
  'Engineering & Technical',
  'Intelligence & Curiosity',
  'Growth & Mastery',
  'Character & Values',
  'Ambition & Execution',
  'Creativity & Paradox',
  'Philosophy & Existence',
  'Systems & Strategy'
];

// Predefined zero-gravity drift variations
const DRIFT_VARIANTS = [
  'animate-drift-1',
  'animate-drift-2',
  'animate-drift-3',
  'animate-drift-4',
  'animate-drift-5',
  'animate-drift-6',
];

export function FloatingLexiconUniverse({ initialWords }: FloatingLexiconUniverseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Concepts');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeWord, setActiveWord] = useState<LexiconWordItem | null>(null);
  const [viewMode, setViewMode] = useState<'floating' | 'index'>('floating');

  // Filter words based on category and search query
  const filteredWords = useMemo(() => {
    return initialWords.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Concepts' ||
        item.category === selectedCategory ||
        item.categories.includes(selectedCategory);

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.shortMeaning && item.shortMeaning.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.personalNote && item.personalNote.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [initialWords, selectedCategory, searchQuery]);

  // Alphabetically grouped words for index view
  const groupedIndex = useMemo(() => {
    const groups: Record<string, LexiconWordItem[]> = {};
    const sorted = [...filteredWords].sort((a, b) => a.word.localeCompare(b.word));

    for (const word of sorted) {
      const letter = word.word[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(word);
    }
    return groups;
  }, [filteredWords]);

  return (
    <div className="relative w-full">
      {/* Dynamic Keyframes for smooth zero-gravity drifting */}
      <style jsx global>{`
        @keyframes zero-gravity-drift-1 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          30% { transform: translate3d(8px, -12px, 0) rotate(0.4deg); }
          60% { transform: translate3d(-10px, -6px, 0) rotate(-0.3deg); }
          85% { transform: translate3d(-4px, 8px, 0) rotate(0.2deg); }
        }
        @keyframes zero-gravity-drift-2 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          25% { transform: translate3d(-12px, 9px, 0) rotate(-0.4deg); }
          55% { transform: translate3d(10px, 5px, 0) rotate(0.3deg); }
          80% { transform: translate3d(5px, -10px, 0) rotate(-0.2deg); }
        }
        @keyframes zero-gravity-drift-3 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          35% { transform: translate3d(11px, 14px, 0) rotate(0.5deg); }
          70% { transform: translate3d(-9px, -12px, 0) rotate(-0.4deg); }
        }
        @keyframes zero-gravity-drift-4 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          40% { transform: translate3d(-14px, -8px, 0) rotate(-0.3deg); }
          75% { transform: translate3d(12px, -14px, 0) rotate(0.4deg); }
        }
        @keyframes zero-gravity-drift-5 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          20% { transform: translate3d(6px, -14px, 0) rotate(0.2deg); }
          60% { transform: translate3d(-12px, 11px, 0) rotate(-0.5deg); }
          85% { transform: translate3d(9px, 4px, 0) rotate(0.3deg); }
        }
        @keyframes zero-gravity-drift-6 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          30% { transform: translate3d(-9px, -11px, 0) rotate(-0.3deg); }
          65% { transform: translate3d(14px, 7px, 0) rotate(0.4deg); }
          90% { transform: translate3d(-4px, 10px, 0) rotate(-0.2deg); }
        }

        .animate-drift-1 { animation: zero-gravity-drift-1 26s ease-in-out infinite; }
        .animate-drift-2 { animation: zero-gravity-drift-2 32s ease-in-out infinite; }
        .animate-drift-3 { animation: zero-gravity-drift-3 28s ease-in-out infinite; }
        .animate-drift-4 { animation: zero-gravity-drift-4 34s ease-in-out infinite; }
        .animate-drift-5 { animation: zero-gravity-drift-5 30s ease-in-out infinite; }
        .animate-drift-6 { animation: zero-gravity-drift-6 36s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .zero-gravity-word {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Control Bar: Categories, Search, View Mode */}
      <div className="sticky top-4 z-30 max-w-5xl mx-auto px-4 mb-8">
        <div className="bg-academic-paper/90 dark:bg-academic-paper/80 backdrop-blur-md border border-academic-border rounded-xl p-3 shadow-academic transition-all">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-academic-muted" />
              <input
                type="text"
                placeholder="Search concepts or definitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-academic-bg border border-academic-border rounded-lg text-academic-text placeholder:text-academic-muted/70 focus:outline-none focus:ring-1 focus:ring-academic-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-academic-muted hover:text-academic-text"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Quick Stats & View Mode Toggle */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <span className="text-[11px] font-mono text-academic-muted">
                <span className="font-bold text-academic-primary">{filteredWords.length}</span> of {initialWords.length} concepts
              </span>

              <div className="flex items-center border border-academic-border rounded-lg p-0.5 bg-academic-bg">
                <button
                  onClick={() => setViewMode('floating')}
                  className={`px-2.5 py-1 text-xs rounded-md flex items-center gap-1.5 transition-all ${
                    viewMode === 'floating'
                      ? 'bg-academic-paper text-academic-primary font-medium shadow-xs'
                      : 'text-academic-muted hover:text-academic-primary'
                  }`}
                  aria-label="Floating zero-gravity view"
                >
                  <Compass size={13} />
                  <span className="hidden sm:inline">Universe</span>
                </button>
                <button
                  onClick={() => setViewMode('index')}
                  className={`px-2.5 py-1 text-xs rounded-md flex items-center gap-1.5 transition-all ${
                    viewMode === 'index'
                      ? 'bg-academic-paper text-academic-primary font-medium shadow-xs'
                      : 'text-academic-muted hover:text-academic-primary'
                  }`}
                  aria-label="Alphabetical index view"
                >
                  <List size={13} />
                  <span className="hidden sm:inline">Index</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-3 pt-3 border-t border-academic-border flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] transition-all font-sans ${
                    isSelected
                      ? 'bg-academic-primary text-white dark:text-black font-medium shadow-xs'
                      : 'text-academic-muted hover:text-academic-primary hover:bg-academic-bg'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredWords.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-24 px-6">
          <p className="text-academic-muted font-serif italic text-base">
            No concepts matched your filter.
          </p>
          <button
            onClick={() => { setSelectedCategory('All Concepts'); setSearchQuery(''); }}
            className="mt-4 text-xs font-mono underline text-academic-accent hover:text-academic-primary transition-colors"
          >
            Reset filters to view all words
          </button>
        </div>
      ) : viewMode === 'floating' ? (
        /* Floating Zero-Gravity Canvas */
        <div className="relative min-h-[70vh] py-12 px-4 md:px-12 flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-10 md:gap-y-14 max-w-7xl mx-auto overflow-hidden select-none">
          {filteredWords.map((item, idx) => {
            const animVariant = DRIFT_VARIANTS[idx % DRIFT_VARIANTS.length];
            const animDelay = `${(idx * 0.45) % 8}s`;

            // Controlled font sizes
            let sizeClass = 'text-base md:text-lg font-serif';
            if (item.fontSize === 'xl') {
              sizeClass = 'text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight';
            } else if (item.fontSize === 'lg') {
              sizeClass = 'text-xl sm:text-2xl md:text-3xl font-serif font-semibold';
            } else if (item.fontSize === 'sm') {
              sizeClass = 'text-xs sm:text-sm font-sans tracking-wide';
            }

            // Prominence opacity & weight
            let prominenceClass = 'text-academic-text/80 hover:text-academic-primary opacity-80 hover:opacity-100';
            if (item.importance === 3) {
              prominenceClass = 'text-academic-primary opacity-95 hover:opacity-100';
            } else if (item.importance === 1) {
              prominenceClass = 'text-academic-muted hover:text-academic-primary opacity-70 hover:opacity-100';
            }

            return (
              <div
                key={item.id}
                className={`zero-gravity-word ${animVariant} transition-transform duration-300 hover:scale-108 focus-within:scale-108 hover:z-20`}
                style={{
                  animationDelay: animDelay,
                  willChange: 'transform'
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveWord(item)}
                  className={`group relative text-left py-1.5 px-3 rounded-md transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-academic-primary focus-visible:ring-offset-4 focus-visible:ring-offset-academic-bg ${sizeClass} ${prominenceClass}`}
                  aria-label={`View definition and reflections on ${item.word}`}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-academic-primary">
                    {item.word}
                  </span>

                  {/* Subtle underline response on hover */}
                  <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-academic-accent/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  {/* Importance anchor dot for core philosophies */}
                  {item.importance === 3 && (
                    <span 
                      className="inline-block w-1 h-1 rounded-full bg-academic-accent/60 ml-1.5 align-middle opacity-0 group-hover:opacity-100 transition-opacity" 
                      title="Anchor philosophy"
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Constellation Index View */
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-12">
            {Object.keys(groupedIndex).map((letter) => (
              <div key={letter} className="border-b border-academic-border pb-8 last:border-b-0">
                <div className="flex items-baseline gap-6 mb-4">
                  <span className="text-2xl font-mono font-bold text-academic-accent">
                    {letter}
                  </span>
                  <div className="h-px flex-1 bg-academic-border" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {groupedIndex[letter].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveWord(item)}
                      className="text-left p-3 rounded-lg border border-transparent hover:border-academic-border hover:bg-academic-paper transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base text-academic-primary font-medium group-hover:text-academic-accent transition-colors">
                          {item.word}
                        </span>
                        {item.importance === 3 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-academic-accent" title="Anchor Philosophy" />
                        )}
                      </div>
                      {item.shortMeaning && (
                        <p className="text-xs text-academic-muted line-clamp-1 mt-1 font-sans">
                          {item.shortMeaning}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Slide-over Panel */}
      <LexiconDetailPanel
        word={activeWord}
        onClose={() => setActiveWord(null)}
        onSelectWord={(w) => setActiveWord(w)}
        allWords={filteredWords}
      />
    </div>
  );
}
