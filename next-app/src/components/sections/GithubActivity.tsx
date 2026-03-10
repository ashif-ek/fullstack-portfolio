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
                    className="bg-academic-paper border border-academic-border p-8 md:p-12 shadow-academic flex justify-center items-center overflow-x-auto"
                >
                    <div className="min-w-full md:min-w-0 flex justify-center scale-90 md:scale-100">
                        <GitHubCalendar
                            username="ashif-ek"
                            blockSize={14}
                            blockMargin={6}
                            fontSize={13}
                            theme={{
                                light: ['#f1f5f9', '#0f172a'],
                                dark: ['#1e293b', '#e2e8f0'],
                            }}
                            style={{
                                color: 'var(--academic-text)',
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
