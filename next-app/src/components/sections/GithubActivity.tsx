'use client';

import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

export default function GithubActivity() {
    return (
        <section id="github-activity" className="py-20 bg-gray-900/50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        GitHub <span className="text-cyan-400">Activity</span>
                    </h2>
                    <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full mb-6" />
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A visual representation of my open-source contributions and activity on GitHub.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 p-6 md:p-10 rounded-2xl shadow-xl flex justify-center items-center overflow-x-auto"
                >
                    <div className="min-w-full md:min-w-0 flex justify-center">
                        <GitHubCalendar
                            username="ashif-ek"
                            blockSize={15}
                            blockMargin={5}
                            fontSize={14}
                            theme={{
                                light: ['#1e293b', '#06b6d4'],
                                dark: ['#1e293b', '#06b6d4'],
                            }}
                            style={{
                                color: '#94a3b8',
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
