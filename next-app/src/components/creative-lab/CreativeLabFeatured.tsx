'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { CreativeLabItem } from '@prisma/client';
import { CreativeLabViewer } from './CreativeLabViewer';

interface CreativeLabFeaturedProps {
  items: CreativeLabItem[];
}

export function CreativeLabFeatured({ items }: CreativeLabFeaturedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CreativeLabItem | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    
    let intervalId: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (document.hidden) setIsPaused(true);
      else setIsPaused(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (!isPaused && !selectedItem) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 8000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPaused, nextSlide, items.length, selectedItem]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedItem(items[currentIndex]);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center border border-dashed border-academic-border bg-academic-paper p-8">
        <p className="text-academic-text/80 text-center font-serif text-lg">
          The lab is quiet for now.<br/>
          <span className="text-sm mt-2 block opacity-80">The next experiment is probably already taking shape.</span>
        </p>
      </div>
    );
  }

  const currentItem = items[currentIndex];
  const isVideo = currentItem.mediaType === 'VIDEO';

  const formatProgress = (index: number, total: number) => {
    return `${(index + 1).toString().padStart(2, '0')} / ${total.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div 
        className="group relative flex flex-col w-full focus:outline-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-roledescription="carousel"
        aria-label="Featured experiments"
      >
        <div 
          className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-academic-bg/80 border border-academic-border focus-within:ring-2 focus-within:ring-academic-primary transition-all duration-500 hover:border-academic-primary/50"
        >
          {/* Main Media with simple fade transition */}
          {items.map((item, index) => {
            const isCurrent = index === currentIndex;
            const img = item.thumbnailUrl || (item.mediaType === 'VIDEO' ? undefined : item.mediaUrl);
            
            return (
              <div 
                key={item.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                aria-hidden={!isCurrent}
              >
                {img && (
                  <Image
                    src={img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={isCurrent}
                  />
                )}
              </div>
            );
          })}
          
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 z-10 pointer-events-none" />
          
          {/* Play/View Button overlay covering the media but under controls */}
          <button 
            onClick={() => setSelectedItem(currentItem)}
            className="absolute inset-0 z-20 flex items-center justify-center focus:outline-none group/play"
            aria-label={`View ${currentItem.title}`}
          >
            {isVideo && (
              <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center text-black shadow-xl transform transition-transform duration-500 group-hover/play:scale-110">
                <Play className="w-6 h-6 ml-1" fill="currentColor" />
              </div>
            )}
          </button>

          {/* Progress Rail and Controls overlay */}
          {items.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 md:px-6 md:py-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-30 flex flex-col md:flex-row items-start md:items-center justify-between text-white/90 gap-4">
              
              {/* Progress Rail */}
              <div 
                className="flex items-center gap-2 w-full md:flex-1 md:max-w-[280px]"
                role="tablist"
                aria-label="Carousel slides"
              >
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={idx === currentIndex}
                    aria-label={`Go to experiment ${idx + 1}`}
                    onClick={() => setCurrentIndex(idx)}
                    className="group/rail h-1.5 flex-1 relative flex items-center focus:outline-none"
                  >
                    {/* The track */}
                    <div className="absolute inset-0 bg-white/30 rounded-full transition-colors group-hover/rail:bg-white/50 group-focus/rail:ring-2 group-focus/rail:ring-white/50" />
                    {/* The active segment */}
                    <div 
                      className={`absolute left-0 top-0 bottom-0 bg-white rounded-full transition-all duration-500 ease-out ${idx === currentIndex ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                    />
                  </button>
                ))}
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-4 self-end md:self-auto">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-white/90 uppercase font-serif" aria-live="polite">
                  {formatProgress(currentIndex, items.length)}
                </span>
                
                <div className="flex items-center gap-1">
                  <button 
                    onClick={prevSlide}
                    className="p-1 hover:text-white text-white/70 transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded"
                    aria-label="Previous experiment"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="p-1 hover:text-white text-white/70 transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded"
                    aria-label="Next experiment"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Metadata Area */}
        <div className="flex flex-col mt-6 gap-6">
          <div className="max-w-xl min-h-[100px]">
            <span className="text-[10px] font-bold text-academic-muted uppercase tracking-widest mb-2 block transition-opacity duration-300">
               FEATURED • {currentItem.category.replace('_', ' ')}
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-academic-primary mb-3 transition-opacity duration-300">
              {currentItem.title}
            </h3>
            {currentItem.description && (
              <p className="text-sm md:text-base text-academic-text/80 leading-relaxed line-clamp-2 transition-opacity duration-300">
                {currentItem.description}
              </p>
            )}
            
            <div className="mt-4 flex items-center text-[10px] text-academic-muted font-bold uppercase tracking-widest">
               <span>2026</span>
               {currentItem.duration && (
                 <>
                   <span className="mx-2 text-academic-border">•</span>
                   <span>{currentItem.duration}</span>
                 </>
               )}
            </div>
          </div>
        </div>
      </div>
      
      <CreativeLabViewer 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
}
