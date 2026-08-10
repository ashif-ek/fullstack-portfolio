'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { CreativeLabItem } from '@prisma/client';
import Image from 'next/image';

interface CreativeLabViewerProps {
  item: CreativeLabItem | null;
  onClose: () => void;
}

export function CreativeLabViewer({ item, onClose }: CreativeLabViewerProps) {
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      
      // Focus management
      setTimeout(() => closeBtnRef.current?.focus(), 50);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [item, onClose]);

  if (!item) return null;

  return mounted && typeof document !== 'undefined' ? createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-academic-bg/95 backdrop-blur-md p-4 md:p-8"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="viewer-title"
      >
        <button
          ref={closeBtnRef}
          className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-academic-paper border border-academic-border text-academic-primary hover:text-academic-accent rounded-full transition-colors z-[101] shadow-lg flex items-center justify-center focus:ring-2 focus:ring-academic-primary focus:outline-none"
          onClick={onClose}
          aria-label="Close viewer"
        >
          <X size={20} strokeWidth={2} />
        </button>
        
        <motion.div
          initial={{ scale: 0.98, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} 
          className="relative flex flex-col md:flex-row max-w-7xl w-full max-h-[90vh] bg-academic-paper border border-academic-border rounded-lg shadow-2xl overflow-hidden cursor-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 bg-black/5 flex items-center justify-center relative overflow-hidden min-h-[300px]">
            {item.mediaType === 'VIDEO' ? (
              <video
                src={item.mediaUrl}
                poster={item.thumbnailUrl || undefined}
                controls
                autoPlay
                className="w-full h-full object-contain max-h-[70vh] md:max-h-[90vh]"
                aria-label={`Video of ${item.title}`}
              />
            ) : (
              <div className="relative w-full h-full min-h-[50vh]">
                <Image
                  src={item.mediaUrl}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </div>
            )}
          </div>
          
          <div className="w-full md:w-[350px] p-6 md:p-8 flex flex-col gap-4 overflow-y-auto bg-academic-paper border-t md:border-t-0 md:border-l border-academic-border">
            <div>
              <span className="text-xs font-bold text-academic-muted uppercase tracking-widest mb-2 block">
                {item.category.replace('_', ' ')}
              </span>
              <h2 id="viewer-title" className="text-2xl font-serif text-academic-primary font-bold leading-tight">
                {item.title}
              </h2>
            </div>
            
            <p className="text-academic-text/80 text-sm leading-relaxed">
              {item.description}
            </p>
            
            {item.tools && item.tools.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xs font-bold text-academic-muted uppercase tracking-widest mb-2">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tools.map(tool => (
                    <span key={tool} className="px-2 py-1 text-xs border border-academic-border rounded text-academic-primary bg-academic-bg/50">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {item.duration && (
              <div className="mt-2">
                 <h3 className="text-xs font-bold text-academic-muted uppercase tracking-widest mb-1">Duration</h3>
                 <p className="text-sm text-academic-text">{item.duration}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  ) : null;
}
