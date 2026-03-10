'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Lightbulb,
    AlertTriangle,
    PencilRuler,
    Code,
    Zap,
    Trophy,
    ExternalLink,
    Github as GithubIcon
} from 'lucide-react';

interface JourneyStep {
    title: string;
    icon: React.ReactNode;
    explanation: string;
    technicalDecision: string;
    color: string;
}

interface ProjectJourney {
    title: string;
    description: string;
    steps: JourneyStep[];
    githubUrl?: string;
    liveUrl?: string;
}

const journeys: ProjectJourney[] = [
    {
        title: "Luxury Perfume Ecommerce Platform",
        description: "A high-performance premium store for luxury fragrances, focusing on visual excellence and speed.",
        githubUrl: "https://github.com/ashif-ek",
        liveUrl: "https://ashif-ek.github.io",
        steps: [
            {
                title: "Idea",
                icon: <Lightbulb className="w-6 h-6" />,
                explanation: "Create a premium ecommerce store focused on luxury perfumes.",
                technicalDecision: "Brand-first immersive UI with high-fidelity visuals.",
                color: "bg-yellow-500"
            },
            {
                title: "Problem",
                icon: <AlertTriangle className="w-6 h-6" />,
                explanation: "High resolution perfume images caused slow loading and poor mobile performance.",
                technicalDecision: "Identified bottleneck in image processing and delivery pipeline.",
                color: "bg-red-500"
            },
            {
                title: "Design",
                icon: <PencilRuler className="w-6 h-6" />,
                explanation: "Architecture designed for scale and performance.",
                technicalDecision: "React frontend + Image CDN + IntersectionObserver for intelligent lazy loading.",
                color: "bg-blue-500"
            },
            {
                title: "Implementation",
                icon: <Code className="w-6 h-6" />,
                explanation: "Building the core features with modern tools.",
                technicalDecision: "Component-based architecture with Next.js and Tailwind CSS for rapid, scalable styling.",
                color: "bg-purple-500"
            },
            {
                title: "Optimization",
                icon: <Zap className="w-6 h-6" />,
                explanation: "Aggressive performance tuning and asset management.",
                technicalDecision: "Code splitting, Next/Image optimization, and Lighthouse-driven performance auditing.",
                color: "bg-cyan-500"
            },
            {
                title: "Result",
                icon: <Trophy className="w-6 h-6" />,
                explanation: "Successful deployment with verified gains.",
                technicalDecision: "38% faster page load and 95+ Lighthouse score across all metrics.",
                color: "bg-green-500"
            }
        ]
    }
];

const StepCard = ({ step, index }: { step: JourneyStep, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row gap-6 mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
        >
            {/* Icon Node */}
            <div className="flex-shrink-0 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center shadow-lg z-10 relative`}>
                    {step.icon}
                    <div className={`absolute inset-0 rounded-full ${step.color} animate-ping opacity-20`} />
                </div>
            </div>

            {/* Content Card */}
            <div className={`flex-grow bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-xl hover:border-cyan-500/30 transition-all group`}>
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Step {index + 1}</span>
                    <h4 className="text-xl font-bold text-white tracking-tight">{step.title}</h4>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">{step.explanation}</p>

                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
                    <h5 className="text-xs font-bold uppercase text-gray-500 mb-2 tracking-tighter">Technical Decision</h5>
                    <p className="text-sm text-gray-400 italic">"{step.technicalDecision}"</p>
                </div>
            </div>

            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-12 bottom-0 w-px bg-gray-700 -z-10 transform -translate-x-1/2" />
        </motion.div>
    );
};

export default function BuildJourney() {
    return (
        <section id="build-journey" className="py-24 bg-gray-950 relative overflow-hidden">
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Build <span className="text-cyan-400 font-serif italic">With Me</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-6" />
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        A look into how I design, build, and optimize real-world products through engineering first principles.
                    </p>
                </motion.div>

                {journeys.map((journey, jIndex) => (
                    <div key={jIndex} className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{journey.title}</h3>
                                <p className="text-gray-400">{journey.description}</p>
                            </div>
                            <div className="flex gap-4">
                                {journey.githubUrl && (
                                    <a href={journey.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                        <GithubIcon size={18} /> CodeBase
                                    </a>
                                )}
                                {journey.liveUrl && (
                                    <a href={journey.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                                        <ExternalLink size={18} /> Live Performance
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            {/* Vertical line for mobile and desktop */}
                            <div className="absolute left-6 md:left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-green-500/50" />

                            <div className="space-y-8 relative">
                                {journey.steps.map((step, sIndex) => (
                                    <motion.div
                                        key={sIndex}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: sIndex * 0.1 }}
                                        className="flex gap-6 relative"
                                    >
                                        {/* Step Icon */}
                                        <div className="relative z-10 flex-shrink-0">
                                            <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center shadow-xl ring-4 ring-gray-950`}>
                                                {step.icon}
                                            </div>
                                        </div>

                                        {/* Step Content */}
                                        <div className="flex-grow pt-1">
                                            <div className="bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-gray-900/60 transition-all group">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                                    <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{step.title}</h4>
                                                    <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500 border border-white/10">Phase 0{sIndex + 1}</span>
                                                </div>

                                                <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                                                    {step.explanation}
                                                </p>

                                                <div className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-white/5 group-hover:border-cyan-500/20 transition-all">
                                                    <div className="mt-1">
                                                        <Zap size={14} className="text-cyan-500" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">Technical Specialization</span>
                                                        <p className="text-sm text-gray-300 font-mono leading-relaxed">
                                                            {step.technicalDecision}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
