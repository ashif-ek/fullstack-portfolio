'use client';

import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

export default function GithubActivity() {
    return (
        <section id="github-activity" className="py-20 bg-academic-bg relative border-t border-academic-border overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">GitHub Activity</h2>
                    <p className="text-academic-muted font-serif italic mt-2 max-w-2xl mx-auto">
                        A visual audit of open-source contributions and technical engagements.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-academic-paper border border-academic-border p-8 md:p-12 shadow-academic flex flex-col justify-center items-center overflow-x-auto"
                >
                    <div className="min-w-full md:min-w-0 flex justify-center scale-90 md:scale-100 mb-8">
                        <GitHubCalendar
                            username="ashif-ek"
                            blockSize={14}
                            blockMargin={6}
                            fontSize={13}
                            showWeekdayLabels
                            theme={{
                                light: ['#f1f5f9', '#94a3b8', '#64748b', '#475569', '#0f172a'],
                                dark: ['#1e293b', '#334155', '#475569', '#94a3b8', '#e2e8f0'],
                            }}
                        />
                    </div>

                    <div className="pt-8 border-t border-academic-border/30 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase font-bold text-academic-muted">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-academic-accent animate-pulse" />
                            <span>Live Data from GitHub API</span>
                        </div>
                        <a 
                            href="https://github.com/ashif-ek" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-academic-primary hover:text-academic-accent transition-colors group"
                        >
                            <span>Explore Repositories</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
