'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    FileDown,
    Calendar,
    Linkedin,
    Github,
    CheckCircle,
    Briefcase,
    ExternalLink,
    Clock
} from 'lucide-react';

export default function RecruiterCTA() {
    const [currentTime, setCurrentTime] = useState<string>('');
    const [timezone, setTimezone] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1].replace('_', ' '));
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="recruiter-access" className="py-24 bg-academic-bg relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-academic-primary mb-4 tracking-tight">
                        Let's Build Something Great Together
                    </h2>
                    <p className="text-academic-muted max-w-2xl mx-auto text-lg">
                        For recruiters and teams looking for a full-stack engineer who values technical excellence and architectural clarity.
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Action Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-2 academic-card p-8 md:p-12 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] uppercase tracking-widest font-black text-green-500">Available for Hire</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-academic-border/50 border border-academic-border">
                                        <Clock size={12} className="text-academic-muted" />
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">{currentTime} • {timezone}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-academic-primary mb-6">
                                    Ready to contribute to your next high-impact project.
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                <a
                                    href="mailto:ashifek11@gmail.com?subject=Hiring Inquiry"
                                    className="academic-button group flex items-center justify-center gap-2 py-4"
                                    aria-label="Hire Me: Send an email"
                                >
                                    <Mail size={18} className="group-hover:scale-110 transition-transform" />
                                    <span>Hire Me</span>
                                </a>

                                <a
                                    href="/resume/Ashif-Resume.pdf"
                                    download
                                    className="px-6 py-4 rounded-lg bg-academic-paper border border-academic-border text-academic-primary hover:bg-academic-primary/5 transition-all text-center flex items-center justify-center gap-2 group font-medium tracking-wide"
                                    aria-label="Download Resume"
                                >
                                    <FileDown size={18} className="group-hover:translate-y-1 transition-transform" />
                                    <span>CV / Resume</span>
                                </a>

                                <a
                                    // Change this to your Google Meet or Calendly link
                                    // Example: href="https://meet.google.com/your-code"
                                    href="mailto:ashifek11@gmail.com?subject=Schedule a Call"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-4 rounded-lg bg-academic-paper border border-academic-border text-academic-primary hover:bg-academic-primary/5 transition-all text-center flex items-center justify-center gap-2 group font-medium tracking-wide"
                                    aria-label="Schedule a call"
                                >
                                    <Calendar size={18} className="group-hover:rotate-12 transition-transform" />
                                    <span>Schedule Call</span>
                                </a>
                            </div>
                        </motion.div>

                        {/* Quick Links Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="academic-card p-8 flex flex-col"
                        >
                            <h4 className="text-xs uppercase tracking-[0.3em] font-black text-academic-primary mb-8 pb-4 border-b border-academic-border">
                                Professional Indices
                            </h4>

                            <div className="space-y-4 flex-grow">
                                <a
                                    href="https://linkedin.com/in/ashif-ek"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 rounded-xl hover:bg-academic-primary/5 border border-transparent hover:border-academic-border transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                                            <Linkedin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-academic-primary">LinkedIn</p>
                                            <p className="text-xs text-academic-muted">Professional Network</p>
                                        </div>
                                    </div>
                                    <ExternalLink size={14} className="text-academic-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>

                                <a
                                    href="https://github.com/ashif-ek"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 rounded-xl hover:bg-academic-primary/5 border border-transparent hover:border-academic-border transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-academic-primary/10 flex items-center justify-center text-academic-primary">
                                            <Github size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-academic-primary">GitHub</p>
                                            <p className="text-xs text-academic-muted">Open Source Code</p>
                                        </div>
                                    </div>
                                    <ExternalLink size={14} className="text-academic-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>

                                <a
                                    href="#projects"
                                    className="flex items-center justify-between p-4 rounded-xl hover:bg-academic-primary/5 border border-transparent hover:border-academic-border transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-academic-accent/10 flex items-center justify-center text-academic-accent">
                                            <Briefcase size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-academic-primary">View Projects</p>
                                            <p className="text-xs text-academic-muted">Full Portfolio</p>
                                        </div>
                                    </div>
                                    <CheckCircle size={14} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>

                            <p className="mt-8 text-[10px] text-center text-academic-muted italic">
                                Optimized for rapid technical evaluation and collaborative discourse.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
