import { Metadata } from 'next';
import { DataService } from '../../../services/dataService';
import { Service } from '../../../types';
import Link from 'next/link';
import { 
    Code2, 
    Rocket, 
    Server, 
    Zap,
    ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Expert Full-Stack Services | React, Django & MVP Development',
    description: 'High-performance engineering services for startups and enterprises. Specializing in React 19, Django 5.x, and scalable cloud architectures.',
};

const iconMap: Record<string, any> = {
    CodeIcon: Code2,
    RocketIcon: Rocket,
    ServerIcon: Server,
    LightningIcon: Zap,
};

export default async function ServicesPage() {
    const services = await DataService.getServices();

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="mb-20 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-academic-primary mb-6 uppercase tracking-tighter">
                        Engineering Services
                    </h1>
                    <p className="text-academic-text/60 text-xl font-serif italic max-w-2xl mx-auto">
                        A classification of architectural specializations and strategic digital solutions for modern startups.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = iconMap[service.icon] ?? Code2;
                        return (
                            <Link 
                                href={`/services/${service.slug}`} 
                                key={service.id}
                                className="academic-card group flex flex-col hover:border-academic-primary transition-all duration-500"
                            >
                                <div className="w-12 h-12 bg-academic-bg border border-academic-border rounded flex items-center justify-center mb-6 group-hover:bg-academic-primary group-hover:text-white transition-all duration-300">
                                    <Icon size={20} strokeWidth={1.8} />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-academic-primary mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-academic-muted leading-relaxed text-sm font-light mb-8 flex-1">
                                    {service.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-academic-border flex justify-between items-center group">
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-academic-muted">
                                        Sector {index + 1} // Detail
                                    </span>
                                    <div className="flex items-center gap-1 text-academic-primary font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Explore <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
