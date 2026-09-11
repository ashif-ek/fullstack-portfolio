'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ActivityCalendarDynamic = dynamic(() => import('react-activity-calendar').then(mod => mod.ActivityCalendar as any), {
    ssr: false,
    loading: () => <div className="py-24 animate-pulse bg-academic-bg min-h-[150px]" />
});
const ActivityCalendar = ActivityCalendarDynamic as any;
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface ContributionData {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

const CONTRIBUTION_DATA: Record<number, { count: number, repos: string[] }> = {
    2026: { count: 42, repos: ['portfolio-next', 'ci-cd-automation'] },
    2025: { count: 312, repos: ['noirel-ecommerce', 'civic-connect', 'django-rest-boilerplate'] },
    2024: { count: 184, repos: ['system-design-sandbox', 'leet-code-python', 'fastapi-auth-service'] }
};

export default function GithubActivity() {
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    const [contributions, setContributions] = useState<ContributionData[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Dynamic years based on current date down to 2024
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2024 + 1 }, (_, i) => currentYear - i);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        let isMounted = true;
        
        async function fetchGitHubData() {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/github?username=ashif-ek&year=${selectedYear}`);
                if (!response.ok) throw new Error('Failed to fetch data');
                
                const data = await response.json();
                if (isMounted) {
                    setContributions(data.contributions || []);
                    setTotalCount(data.totalCount || 0);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err);
                    setError('Unable to load GitHub contributions.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        fetchGitHubData();

        return () => {
            isMounted = false;
        };
    }, [selectedYear]);

    if (!mounted) {
        return <div className="py-24 animate-pulse bg-academic-bg min-h-[400px]" />;
    }

    const isDark = resolvedTheme === 'dark';

    // Theme values tuned for contrast in both dark and light modes
    const themeColors = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section id="github-activity" className={`py-24 relative border-t overflow-hidden transition-colors duration-300 ${isDark ? 'bg-academic-bg border-academic-border' : 'bg-gray-50 border-gray-200'}`}>
            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-left mb-12"
                >
                    <h2 className={`section-title !text-left ${isDark ? '' : '!text-gray-900'}`}>Engineering Velocity</h2>
                    <p className={`font-serif italic mt-2 max-w-2xl ${isDark ? 'text-academic-muted' : 'text-gray-600'}`}>
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
                        className={`xl:col-span-9 rounded-xl p-5 md:px-10 md:py-8 shadow-lg overflow-hidden border transition-colors duration-500 ${
                            isDark 
                            ? 'bg-[#0d1117] border-[#30363d] shadow-black/50' 
                            : 'bg-white border-gray-200 shadow-gray-200/50'
                        }`}
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <h3 className={`font-medium text-lg ${isDark ? 'text-academic-primary' : 'text-gray-900'}`}>
                                Activity Overview for {selectedYear}
                            </h3>
                            <div className={`flex items-center gap-2 text-[10px] uppercase tracking-widest ${isDark ? 'text-academic-muted' : 'text-gray-500'}`}>
                                <span>Contribution settings</span>
                                <div className={`w-px h-3 ${isDark ? 'bg-academic-border' : 'bg-gray-300'}`} />
                                <span className="flex items-center gap-1 cursor-help">
                                    Metrics Registry
                                </span>
                            </div>
                        </div>

                        <div className="relative w-full overflow-x-auto pb-2 scrollbar-hide">
                            <div className="min-w-[800px] flex justify-center py-2">
                                {isLoading ? (
                                    <div className="flex items-center justify-center min-h-[150px] w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-md">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Loading fine-grained data...</p>
                                    </div>
                                ) : error ? (
                                    <div className="flex flex-col items-center justify-center min-h-[150px] w-full text-red-500 dark:text-red-400 border border-red-200 dark:border-red-900/30 rounded-md bg-red-50 dark:bg-red-900/10 p-4">
                                        <p className="text-sm font-medium">{error}</p>
                                        <button onClick={() => setSelectedYear(selectedYear)} className="mt-2 text-xs underline hover:text-red-700 dark:hover:text-red-300">Retry</button>
                                    </div>
                                ) : contributions.length === 0 ? (
                                    <div className="flex items-center justify-center min-h-[150px] w-full text-gray-500 dark:text-gray-400">
                                        <p className="text-sm">No activity recorded for {selectedYear}</p>
                                    </div>
                                ) : (
                                    <ActivityCalendar
                                        data={contributions}
                                        blockSize={12}
                                        blockMargin={4}
                                        fontSize={12}
                                        showWeekdayLabels
                                        labels={{
                                            totalCount: `${totalCount} contributions in ${selectedYear}`,
                                        }}
                                        theme={{
                                            light: themeColors.light,
                                            dark: themeColors.dark,
                                        }}
                                        colorScheme={isDark ? 'dark' : 'light'}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={`mt-6 pt-4 border-t flex flex-wrap justify-between items-center gap-6 ${isDark ? 'border-academic-border/30' : 'border-gray-200'}`}>
                            <div className={`flex items-center gap-6 text-[11px] ${isDark ? 'text-academic-muted' : 'text-gray-500'}`}>
                                <a href="https://github.com/ashif-ek" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? 'hover:text-academic-accent' : 'hover:text-slate-900'}`}>
                                    GitHub Contribution Protocol
                                </a>
                            </div>
                            <div className={`flex items-center gap-2 text-[11px] ${isDark ? 'text-academic-muted' : 'text-gray-500'}`}>
                                <span>Less</span>
                                <div className="flex gap-1">
                                    {(isDark ? themeColors.dark : themeColors.light).map(c => (
                                        <div key={c} className={`w-2.5 h-2.5 rounded-sm border ${isDark ? 'border-white/10' : 'border-black/10'}`} style={{ backgroundColor: c }} />
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
                        className="xl:col-span-3 space-y-3"
                    >
                        <div className="flex xl:flex-col gap-2 overflow-x-auto pb-2 xl:pb-0">
                            {years.map((year) => {
                                const isSelected = selectedYear === year;
                                return (
                                    <button
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
                                        className={`flex-1 xl:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all text-center xl:text-left border ${
                                            isSelected
                                                ? isDark 
                                                    ? 'bg-academic-primary text-academic-paper border-academic-primary shadow-lg shadow-academic-primary/20' 
                                                    : 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/20'
                                                : isDark 
                                                    ? 'bg-academic-paper text-academic-muted border-academic-border hover:border-academic-primary/50 hover:text-academic-primary' 
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-slate-900'
                                        }`}
                                    >
                                        {year}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="academic-card !p-5 hidden xl:block mt-3">
                            <h4 className="text-[10px] uppercase tracking-widest font-black text-academic-primary mb-3">Activity Portfolio</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-academic-accent mt-1.5" />
                                    <p className="text-xs text-academic-muted leading-relaxed">
                                        Focus on <span className="text-academic-primary font-bold">Distributed Systems</span> and <span className="text-academic-primary font-bold">Cloud-Native Architecture</span>.
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-academic-primary/5 border border-academic-border">
                                    <p className="text-[10px] uppercase font-bold text-academic-muted mb-1">Impact Repositories</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {(CONTRIBUTION_DATA[selectedYear]?.repos || []).map(repo => (
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
