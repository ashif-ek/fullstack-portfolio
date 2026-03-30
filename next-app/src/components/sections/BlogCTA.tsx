'use client';

import Link from 'next/link';
import { Rocket, ArrowRight } from 'lucide-react';

const BlogCTA = () => {
    return (
        <section className="mt-16 p-8 rounded-3xl bg-academic-primary text-white overflow-hidden relative group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-widest mb-4">
                        <Rocket className="w-4 h-4" />
                        Next-Gen Engineering
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        Ready to Build Your Scalable MVP?
                    </h2>
                    <p className="text-white/80 text-lg max-w-xl">
                        Partner with Ashif E.K to transform your vision into a high-performance React & Django application. Let's engineer your success.
                    </p>
                </div>
                
                <div className="shrink-0 flex flex-col gap-4 w-full md:w-auto">
                    <Link 
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-academic-primary font-bold rounded-xl hover:bg-white/90 transition-all group/btn"
                    >
                        Schedule a Strategy Call
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-center text-white/60 text-sm">
                        Limited availability for Q2 2026.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BlogCTA;
