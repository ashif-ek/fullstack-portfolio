'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, X } from 'lucide-react';
import { useRecruiterMode } from '../../context/RecruiterContext';

export default function RecruiterBanner() {
    const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();

    return (
        <AnimatePresence>
            {isRecruiterMode && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 40, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="bg-academic-accent text-white h-10 px-4 sm:px-6 fixed top-0 left-0 w-full z-[60] overflow-hidden flex items-center justify-between"
                >
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Briefcase size={15} className="animate-pulse shrink-0" />
                            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] truncate">
                                Recruiter Mode Active <span className="hidden md:inline">– Showing high-impact condensed view.</span>
                            </p>
                        </div>
                        <button
                            onClick={toggleRecruiterMode}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors shrink-0 ml-2"
                            aria-label="Dismiss Recruiter Mode"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Decorative subtle texture */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent translate-y-[-50%]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
