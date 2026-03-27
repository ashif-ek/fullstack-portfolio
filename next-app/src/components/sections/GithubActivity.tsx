'use client';
import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const CONTRIBUTION_DATA: Record<number, { count: number, repos: string[] }> = {
    2026: { count: 42, repos: ['portfolio-next', 'ci-cd-automation'] },
    2025: { count: 312, repos: ['noirel-ecommerce', 'civic-connect', 'django-rest-boilerplate'] },
    2024: { count: 184, repos: ['system-design-sandbox', 'leet-code-python', 'fastapi-auth-service'] }
};

export default function GithubActivity() {
    const [selectedYear, setSelectedYear] = useState<number>(2026);
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    const years = [2026, 2025, 2024];

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="py-24 animate-pulse bg-academic-bg min-h-[400px]" />;
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <section id="github-activity" className="py-24 bg-academic-bg relative border-t border-academic-border overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-left mb-12"
                >
                    <h2 className="section-title !text-left">Engineering Velocity</h2>
                    <p className="text-academic-muted font-serif italic mt-2 max-w-2xl">
                        A longitudinal record of technical contributions and architectural developments.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                    {/* Main Activity Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={`xl:col-span-9 rounded-xl p-6 md:p-10 shadow-academic overflow-hidden border transition-colors duration-500 ${
                            isDark 
                            ? 'bg-[#0d1117] border-[#30363d]' 
                            : 'bg-academic-paper border-academic-border'
                        }`}
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <h3 className="text-academic-primary font-medium text-lg">
                                {CONTRIBUTION_DATA[selectedYear].count} contributions in {selectedYear}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-academic-muted">
                                <span>Contribution settings</span>
                                <div className="w-px h-3 bg-academic-border" />
                                <span className="flex items-center gap-1 cursor-help">
                                    Metrics Registry
                                </span>
                            </div>
                        </div>

                        <div className="relative w-full overflow-x-auto pb-4 scrollbar-hide">
                            <div className="min-w-[800px] flex justify-center py-4">
                                <GitHubCalendar
                                    username="ashif-ek"
                                    blockSize={12}
                                    blockMargin={4}
                                    fontSize={12}
                                    showWeekdayLabels
                                    year={selectedYear}
                                    labels={{
                                        totalCount: `{{count}} contributions in ${selectedYear}`,
                                    }}
                                    theme={{
                                        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-academic-border/30 flex flex-wrap justify-between items-center gap-6">
                            <div className="flex items-center gap-6 text-[11px] text-academic-muted">
                                <a href="https://github.com/ashif-ek" target="_blank" rel="noopener noreferrer" className="hover:text-academic-accent transition-colors">
                                    GitHub Contribution Protocol
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-academic-muted">
                                <span>Less</span>
                                <div className="flex gap-1">
                                    {(isDark 
                                        ? ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                                        : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
                                    ).map(c => (
                                        <div key={c} className="w-2.5 h-2.5 rounded-sm border border-academic-border/10" style={{ backgroundColor: c }} />
                                    ))}
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar / Year Selector */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="xl:col-span-3 space-y-4"
                    >
                        <div className="flex xl:flex-col gap-2 overflow-x-auto pb-2 xl:pb-0">
                            {years.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`flex-1 xl:flex-none px-4 py-3 rounded-lg text-sm font-bold transition-all text-center xl:text-left border ${
                                        selectedYear === year
                                            ? 'bg-academic-primary text-academic-paper border-academic-primary shadow-lg shadow-academic-primary/20'
                                            : 'bg-academic-paper text-academic-muted border-academic-border hover:border-academic-primary/50 hover:text-academic-primary'
                                    }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>

                        <div className="academic-card !p-6 hidden xl:block">
                            <h4 className="text-[10px] uppercase tracking-widest font-black text-academic-primary mb-4">Activity Portfolio</h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-academic-accent mt-1.5" />
                                    <p className="text-xs text-academic-muted leading-relaxed">
                                        Focus on <span className="text-academic-primary font-bold">Distributed Systems</span> and <span className="text-academic-primary font-bold">Cloud-Native Architecture</span>.
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-academic-primary/5 border border-academic-border">
                                    <p className="text-[10px] uppercase font-bold text-academic-muted mb-1">Impact Repositories</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {CONTRIBUTION_DATA[selectedYear].repos.map(repo => (
                                            <span key={repo} className="text-[9px] px-2 py-0.5 rounded bg-academic-paper border border-academic-border text-academic-primary font-mono cursor-default">
                                                {repo}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 flex justify-center"
                >
                    <a 
                        href="https://github.com/ashif-ek" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-8 py-4 rounded-full bg-academic-paper border border-academic-border hover:border-academic-primary transition-all shadow-sm"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-academic-paper bg-academic-primary/10 flex items-center justify-center overflow-hidden">
                                     <div className="w-full h-full bg-academic-primary/20" />
                                </div>
                            ))}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-academic-primary">Expand Full Technical Index</span>
                        <svg className="w-4 h-4 text-academic-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
