'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface LightboxProps {
  children: React.ReactNode;
  src: string;
  alt: string;
}

export const Lightbox = ({ children, src, alt }: LightboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsOpen(true);
  }, []);
  
  const closeLightbox = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  return (
    <>
      <div 
        onClick={openLightbox} 
        className="cursor-zoom-in w-full h-full relative"
        role="button"
        tabIndex={0}
        aria-label={`View larger image of ${alt}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox();
          }
        }}
      >
        {children}
      </div>

      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-academic-bg/90 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label={`Expanded view of ${alt}`}
            >
              <button
                className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-academic-paper border border-academic-border text-academic-primary hover:text-academic-accent rounded-full transition-colors z-[101] shadow-lg flex items-center justify-center"
                onClick={closeLightbox}
                aria-label="Close image"
                autoFocus
              >
                <X size={20} strokeWidth={2} />
              </button>
              
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} // spring-like ease
                className="relative flex items-center justify-center cursor-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt}
                  className="max-w-[90vw] max-h-[70vh] md:max-w-5xl object-contain rounded-sm md:rounded-lg shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
