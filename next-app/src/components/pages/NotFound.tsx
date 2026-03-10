'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-academic-bg text-academic-text font-sans flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Signature Grid Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--academic-text)_1px,_transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-8xl md:text-[12rem] font-serif font-black text-academic-primary/10 select-none"
            >
              404
            </motion.h1>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-academic-primary tracking-tight -mt-12 md:-mt-20">
              Entry Not Found
            </h2>
          </div>

          <div className="h-px w-24 bg-academic-accent mx-auto" />

          <p className="text-academic-muted font-light leading-relaxed max-w-md mx-auto italic">
            "The archive reveals no record of this specific coordinate. It appears this digital manuscript has been misplaced or retracted."
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="academic-button group flex items-center justify-center gap-3 py-4 px-10 text-xs font-bold uppercase tracking-[0.2em]"
            >
              <Home size={14} className="group-hover:scale-110 transition-transform" />
              Return to Atrium
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-academic-primary hover:bg-academic-primary/5 border border-academic-primary/20 transition-all duration-300 rounded-sm flex items-center justify-center gap-3"
            >
              <ArrowLeft size={14} />
              Previous Record
            </button>
          </div>
        </motion.div>

        {/* Decorative corner elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 border-l border-t border-academic-border opacity-50" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 border-r border-b border-academic-border opacity-50" />
      </div>

      {/* Subtle bottom-right signature or meta-data */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <p className="text-[10px] uppercase tracking-widest text-academic-muted/40 font-bold">
          Err: 0x404_MISPLACED_ENTRY
        </p>
      </div>
    </div>
  );
}

