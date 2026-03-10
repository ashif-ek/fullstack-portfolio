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
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-academic-accent text-white py-2 px-6 relative z-[60] overflow-hidden"
                >
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Briefcase size={16} className="animate-pulse" />
                            <p className="text-xs font-bold uppercase tracking-[0.2em]">
                                Recruiter Mode Active <span className="hidden md:inline">– Showing high-impact condensed view.</span>
                            </p>
                        </div>
                        <button
                            onClick={toggleRecruiterMode}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
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
