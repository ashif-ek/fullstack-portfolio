import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Service } from '../../../../lib/data/types';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

import { DataService } from '../../../../services/dataService';
import Breadcrumbs from '../../../../components/ui/Breadcrumbs';
import BlogCTA from '../../../../components/sections/BlogCTA';

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const allServices = await DataService.getServices();
    if (!allServices || allServices.length === 0) return [];
    
    return allServices
        .filter(s => s && s.slug)
        .map((service: Service) => ({
            slug: service.slug,
        }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = await DataService.getServiceBySlug(slug);
    if (!service) return {};

    return {
        title: `${service.title} | Services`,
        description: service.description,
        alternates: {
            canonical: `/services/${service.slug}`,
        },
        openGraph: {
            title: `${service.title} | Ashif E.K`,
            description: service.description,
            url: `/services/${service.slug}`,
            type: 'website',
        },
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = await DataService.getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Person",
            "name": "Ashif E.K"
        },
        "url": `https://www.ashifek.in/services/${service.slug}`
    };

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-16 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <div className="max-w-4xl mx-auto">
                <Breadcrumbs />
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-academic-primary hover:underline mb-12 group transition-all uppercase text-xs font-bold tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to All Services
                </Link>

                <header className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-primary/10 text-academic-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-academic-primary/20">
                        Professional Specialization
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-academic-primary leading-tight">
                        {service.title}
                    </h1>
                    <p className="text-xl text-academic-text/70 font-serif italic max-w-2xl">
                        {service.description}
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-12 mb-20">
                    <div className="lg:col-span-2">
                        <article className="prose prose-invert prose-academic max-w-none">
                            <div className="text-academic-text/80 leading-relaxed space-y-6 text-lg text-justify">
                                <ReactMarkdown>
                                    {service.content || "# Details coming soon..."}
                                </ReactMarkdown>
                            </div>
                        </article>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-academic-primary/5 p-8 rounded-2xl border border-academic-primary/10 sticky top-24">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <CheckCircle2 className="text-academic-primary w-5 h-5" />
                                Selection Criteria
                            </h3>
                            <ul className="space-y-4 text-sm text-academic-text/70">
                                <li className="flex gap-3">
                                    <span className="text-academic-primary font-bold">01.</span>
                                    Scalable architecture that grows with your startup's user base.
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-academic-primary font-bold">02.</span>
                                    Security-first development approach using Django's elite features.
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-academic-primary font-bold">03.</span>
                                    Premium UI/UX focus with high-performance React 19 / Next.js code.
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-academic-primary font-bold">04.</span>
                                    Full project lifecycle management from Discovery to Cloud Deployment.
                                </li>
                            </ul>
                            
                            <Link 
                                href="/contact"
                                className="mt-8 w-full btn-primary inline-flex items-center justify-center py-3 bg-academic-primary text-white rounded-xl font-bold hover:bg-academic-primary/90 transition-all"
                            >
                                Start Your Project
                            </Link>
                        </div>
                    </div>
                </div>

                <BlogCTA />
            </div>
        </main>
    );
}
