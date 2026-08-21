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
        // Handle autoplay policy failure silently
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
    <button
      onClick={() => onClick(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className="group flex flex-col text-left w-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-academic-primary focus:ring-offset-8 focus:ring-offset-academic-bg"
      aria-label={`View ${item.title}`}
    >
      <div className="relative aspect-[4/3] md:aspect-video w-full overflow-hidden bg-academic-bg/50 border border-academic-border/50 group-hover:border-academic-border transition-colors duration-500">
        {displayImage && (
          <Image
            src={displayImage}
            alt={item.title}
            fill
            className={`object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {isVideo && isHovered && (
          <video
            ref={videoRef}
            src={item.mediaUrl}
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"
          />
        )}

        {isVideo && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors duration-300">
            <div className={`w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-black shadow-lg transform transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
              <Play className="w-5 h-5 ml-1" fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      <div className="pt-6 pb-2 flex-1 flex flex-col w-full">
        <span className="text-[10px] font-bold text-academic-muted uppercase tracking-widest mb-3">
          {item.category.replace('_', ' ')}
        </span>
        <h3 className="text-xl font-serif text-academic-primary mb-3 group-hover:text-academic-accent transition-colors">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm text-academic-text/80 leading-relaxed mb-6 line-clamp-3">
            {item.description}
          </p>
        )}
        
        <div className="mt-auto flex items-center text-[10px] text-academic-muted font-bold uppercase tracking-widest">
          <span>2026</span>
          {item.duration && (
            <>
              <span className="mx-2 text-academic-border">•</span>
              <span>{item.duration}</span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
