'use client';
import { useState } from 'react';
import type { ElementType } from 'react';

import { useServices } from '../../hooks/useServices';
import {
    Code2,
    Rocket,
    Server,
    Zap
} from 'lucide-react';

const iconMap: Record<string, ElementType> = {
    CodeIcon: Code2,
    RocketIcon: Rocket,
    ServerIcon: Server,
    LightningIcon: Zap,
};

const Services = () => {
    const { data: services = [] } = useServices();
    const [showAllServices, setShowAllServices] = useState(false);

    const displayedServices = showAllServices ? services : services.slice(0, 4);

    return (
        <section id="services" className="py-16 md:py-32 bg-academic-bg text-academic-text relative border-t border-academic-border">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-20">
                    <h2 className="section-title">Technical Specializations</h2>
                    <p className="text-academic-muted font-serif italic mt-2">A classification of architectural services and strategic engineering solutions.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayedServices.map((service, index) => {
                        const Icon = iconMap[service.icon] ?? Code2;

                        return (
                            <div
                                key={service.id}
                                className="academic-card group flex flex-col"
                            >
                                <div className="w-12 h-12 bg-academic-bg border border-academic-border rounded flex items-center justify-center mb-6 group-hover:bg-academic-primary group-hover:text-white transition-all duration-300">
                                    <span className="text-xl text-academic-primary group-hover:text-white transition-colors">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </span>
                                </div>
                                <h3 className="text-lg font-serif font-bold text-academic-primary mb-3 group-hover:text-academic-accent transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-academic-muted leading-relaxed text-sm font-light">
                                    {service.description}
                                </p>

                                <div className="mt-8 pt-6 border-t border-academic-border flex justify-between items-center">
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-academic-muted">Sector {index + 1} // Classified</span>
                                    <span className="text-[8px] px-2 py-0.5 border border-academic-accent/30 text-academic-accent rounded-full font-bold">ACTIVE</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {services.length > 4 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowAllServices(!showAllServices)}
                            className="text-xs uppercase tracking-[0.3em] font-bold text-academic-muted hover:text-academic-accent transition-colors p-4"
                        >
                            {showAllServices ? "Collapse Specializations" : "Expand All Specializations"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;
