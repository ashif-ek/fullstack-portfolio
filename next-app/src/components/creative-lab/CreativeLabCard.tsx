'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { CreativeLabItem } from '@prisma/client';

interface CreativeLabCardProps {
  item: CreativeLabItem;
  onClick: (item: CreativeLabItem) => void;
}

export function CreativeLabCard({ item, onClick }: CreativeLabCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && item.mediaType === 'VIDEO') {
      videoRef.current.play().catch(() => {
        // Silently catch autoplay restriction
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && item.mediaType === 'VIDEO') {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const isVideo = item.mediaType === 'VIDEO';
  const displayImage = item.thumbnailUrl || (isVideo ? undefined : item.mediaUrl);

  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(item);
        }
      }}
      className="group flex flex-col h-full rounded-xl border border-academic-border bg-academic-paper overflow-hidden shadow-academic hover:shadow-paper transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-academic-primary cursor-pointer text-left"
      aria-label={`View ${item.title}`}
    >
      {/* Aspect-Ratio Governed Visual Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-academic-bg border-b border-academic-border">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={item.title}
            fill
            className={`object-cover transition-transform duration-500 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-academic-muted font-mono text-xs">
            [Visual Artifact]
          </div>
        )}
        
        {isVideo && isHovered && (
          <video
            ref={videoRef}
            src={item.mediaUrl}
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
          />
        )}

        <div className="absolute top-3 left-3 z-20">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold bg-academic-bg/90 backdrop-blur-sm text-academic-primary border border-academic-border">
            {item.category.replace('_', ' ')}
          </span>
        </div>

        {isVideo && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors duration-300">
            <div className={`w-11 h-11 bg-white/95 text-academic-primary rounded-full flex items-center justify-center shadow-md transform transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
              <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-academic-primary mb-2 leading-snug group-hover:text-academic-accent transition-colors duration-200">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-xs sm:text-sm text-academic-text/75 leading-relaxed line-clamp-3 mb-4">
              {item.description}
            </p>
          )}
        </div>
        
        <div className="pt-3 border-t border-academic-border/60 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-academic-muted">
          <span>2026 Archive</span>
          {item.duration && <span>{item.duration}</span>}
        </div>
      </div>
    </div>
  );
}
