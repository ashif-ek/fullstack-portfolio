'use client';
import { useState } from 'react';
import {
    Layers,
    Server,
    BrainCircuit,
    Building2,
    Database,
    Cloud,
    ShieldCheck,
    Zap,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

const SPECIALIZATIONS = [
    {
        id: 1,
        title: "FULL-STACK SAAS ENGINEERING",
        description: "Building production-ready web platforms across Next.js, React, Python backends, PostgreSQL, and modular application architecture.",
        technologies: ["Next.js", "React", "Python", "PostgreSQL"],
        Icon: Layers
    },
    {
        id: 2,
        title: "BACKEND & API ARCHITECTURE",
        description: "Designing secure, maintainable REST APIs and backend services with FastAPI, Django REST Framework, layered architecture, and robust validation.",
        technologies: ["FastAPI", "Django REST", "SQLAlchemy", "Pydantic"],
        Icon: Server
    },
    {
        id: 3,
        title: "AI, LLM & RAG SYSTEMS",
        description: "Building practical AI applications with LLM orchestration, retrieval-augmented generation, vector search, and structured AI workflows.",
        technologies: ["LangChain", "LangGraph", "RAG", "ChromaDB"],
        Icon: BrainCircuit
    },
    {
        id: 4,
        title: "MULTI-TENANT ARCHITECTURE",
        description: "Designing tenant-aware SaaS systems with schema-based isolation, secure authentication, role-based access, and scalable service boundaries.",
        technologies: ["Multi-Tenancy", "RBAC", "JWT", "Microservices"],
        Icon: Building2
    },
    {
        id: 5,
        title: "DATABASE & DATA ENGINEERING",
        description: "Designing reliable data workflows, PostgreSQL systems, ELT pipelines, vector search, and efficient database access patterns.",
        technologies: ["PostgreSQL", "SQL", "Prisma", "ELT", "Vector Search"],
        Icon: Database
    },
    {
        id: 6,
        title: "CLOUD & DEVOPS",
        description: "Deploying and operating production applications with containerization, cloud infrastructure, reverse proxies, and automated CI/CD.",
        technologies: ["AWS", "Docker", "Nginx", "GitHub Actions"],
        Icon: Cloud
    },
    {
        id: 7,
        title: "SECURITY & AUTHENTICATION",
        description: "Implementing secure authentication and authorization with JWT, RBAC, MFA, SSO, HTTP-only cookies, and layered permission controls.",
        technologies: ["JWT", "RBAC", "MFA", "SSO"],
        Icon: ShieldCheck
    },
    {
        id: 8,
        title: "FRONTEND ENGINEERING & PERFORMANCE",
        description: "Building responsive interfaces with React and Next.js while applying lazy loading, efficient state management, accessibility, and performance optimization.",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
        Icon: Zap
    }
];

const Services = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section id="services" className="py-16 md:py-32 bg-academic-bg text-academic-text relative border-t border-academic-border">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-20">
                    <h2 className="section-title">Technical Specializations</h2>
                    <p className="text-academic-muted font-serif italic mt-2">A classification of engineering capabilities, architecture patterns, and production systems.</p>
                </div>

                <div 
                    id="specializations-grid"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {SPECIALIZATIONS.map((spec, index) => {
                        const Icon = spec.Icon;
                        
                        // Responsive CSS hiding logic based on index
                        // Mobile: show 2 initially (0, 1) -> Hide 2+ if collapsed
                        // Desktop (lg): show 4 initially (0, 1, 2, 3) -> Hide 4+ if collapsed
                        // Tablet (sm): grid is 2 cols, showing 4 initially is fine, so let's match desktop logic for sm+
                        const visibilityClasses = isExpanded 
                            ? 'flex' 
                            : index >= 2 && index < 4 
                                ? 'hidden sm:flex' 
                                : index >= 4 
                                    ? 'hidden' 
                                    : 'flex';

                        return (
                            <div
                                key={spec.id}
                                className={`academic-card group flex-col h-full ${visibilityClasses}`}
                            >
                                <div className="w-10 h-10 bg-academic-bg border border-academic-border rounded flex items-center justify-center mb-4 group-hover:bg-academic-primary group-hover:text-white transition-all duration-300">
                                    <span className="text-lg text-academic-primary group-hover:text-white transition-colors">
                                        <Icon size={18} strokeWidth={1.8} />
                                    </span>
                                </div>
                                
                                <h3 className="text-base font-serif font-bold text-academic-primary mb-2 group-hover:text-academic-accent transition-colors">
                                    {spec.title}
                                </h3>
                                
                                <p className="text-academic-muted leading-relaxed text-sm font-light mb-4 line-clamp-3">
                                    {spec.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-academic-border/50">
                                    <h4 className="text-[9px] font-bold tracking-[0.2em] text-academic-muted uppercase mb-2">Technologies</h4>
                                    <p className="text-[11px] text-academic-primary font-bold tracking-wide">
                                        {spec.technologies.join(' · ')}
                                    </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-academic-border flex justify-between items-center">
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-academic-muted">Sector {index + 1} // Classified</span>
                                    <span className="text-[8px] px-2 py-0.5 border border-academic-accent/30 text-academic-accent rounded-full font-bold">ACTIVE</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-16">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                        aria-controls="specializations-grid"
                        className="group inline-flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] font-bold text-academic-primary hover:text-academic-accent transition-colors p-4 focus:outline-none focus:ring-2 focus:ring-academic-primary focus:ring-offset-4 focus:ring-offset-academic-bg rounded-sm"
                    >
                        {isExpanded ? (
                            <>
                                COLLAPSE SPECIALIZATIONS
                                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                            </>
                        ) : (
                            <>
                                EXPAND ALL SPECIALIZATIONS
                                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Services;
