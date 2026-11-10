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
      }, 7000);
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
      <div className="w-full h-full min-h-[380px] md:min-h-[440px] flex items-center justify-center border border-academic-border bg-academic-paper p-8 text-center rounded-xl shadow-xs">
        <div className="max-w-md">
          <span className="text-[10px] uppercase font-mono tracking-widest text-academic-muted block mb-3">
            Archive In Development
          </span>
          <p className="text-academic-primary font-serif text-lg leading-relaxed">
            The lab is quiet for now. New experiments and visual explorations will appear here.
          </p>
        </div>
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
        {/* Main Media Frame */}
        <div 
          className="relative w-full aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-academic-bg border border-academic-border rounded-xl shadow-academic focus-within:ring-2 focus-within:ring-academic-primary transition-all duration-300"
        >
          {/* Main Media Layers with Smooth Crossfade */}
          {items.map((item, index) => {
            const isCurrent = index === currentIndex;
            const img = item.thumbnailUrl || (item.mediaType === 'VIDEO' ? undefined : item.mediaUrl);
            
            return (
              <div 
                key={item.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                aria-hidden={!isCurrent}
              >
                {img ? (
                  <Image
                    src={img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={isCurrent}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-academic-paper text-academic-muted text-xs font-mono">
                    [Media Preview]
                  </div>
                )}
              </div>
            );
          })}
          
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-300 z-10 pointer-events-none" />
          
          {/* Interactive Click Canvas */}
          <button 
            onClick={() => setSelectedItem(currentItem)}
            className="absolute inset-0 z-20 flex items-center justify-center focus:outline-none group/play"
            aria-label={`Open viewer for ${currentItem.title}`}
          >
            {isVideo && (
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/95 text-academic-primary rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover/play:scale-110">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-1" fill="currentColor" />
              </div>
            )}
          </button>

          {/* Bottom Progress Rail and Carousel Controls */}
          {items.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-30 flex items-center justify-between text-white gap-4">
              
              {/* Segmented Progress Rail */}
              <div 
                className="flex items-center gap-1.5 flex-1 max-w-[220px] sm:max-w-[260px]"
                role="tablist"
                aria-label="Experiment slides"
              >
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={idx === currentIndex}
                    aria-label={`Slide ${idx + 1}`}
                    onClick={() => setCurrentIndex(idx)}
                    className="group/rail h-1.5 flex-1 relative flex items-center focus:outline-none py-1"
                  >
                    <div className="w-full h-1 bg-white/30 rounded-full transition-colors group-hover/rail:bg-white/50" />
                    <div 
                      className={`absolute left-0 top-1 bottom-1 bg-white rounded-full transition-all duration-300 ease-out ${idx === currentIndex ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                    />
                  </button>
                ))}
              </div>

              {/* Prev / Next Buttons & Position Counter */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wider text-white/90" aria-live="polite">
                  {formatProgress(currentIndex, items.length)}
                </span>
                
                <div className="flex items-center gap-1">
                  <button 
                    onClick={prevSlide}
                    className="p-1 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded"
                    aria-label="Previous experiment"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="p-1 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded"
                    aria-label="Next experiment"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Featured Experiment Metadata Card */}
        <div className="mt-4 sm:mt-5 p-4 sm:p-5 rounded-lg border border-academic-border bg-academic-paper">
          <div className="flex items-center justify-between gap-3 text-xs font-mono mb-2">
            <span className="text-[10px] font-bold text-academic-accent uppercase tracking-widest">
              Featured • {currentItem.category.replace('_', ' ')}
            </span>
            <div className="flex items-center text-[10px] text-academic-muted font-bold tracking-wider">
              <span>2026</span>
              {currentItem.duration && (
                <>
                  <span className="mx-1.5 text-academic-border">•</span>
                  <span>{currentItem.duration}</span>
                </>
              )}
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-academic-primary mb-2 line-clamp-1">
            {currentItem.title}
          </h3>

          {currentItem.description && (
            <p className="text-xs sm:text-sm text-academic-muted leading-relaxed line-clamp-2">
              {currentItem.description}
            </p>
          )}
        </div>
      </div>
      
      <CreativeLabViewer 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
}
