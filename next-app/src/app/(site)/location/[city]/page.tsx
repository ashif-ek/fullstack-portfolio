import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locations as MOCK_LOCATIONS } from '../../../../data/mockData';
import { LocationData } from '../../../../types';
import Api from '../../../../lib/api';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { MapPin, Globe, Users, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '../../../../components/ui/Breadcrumbs';
import BlogCTA from '../../../../components/sections/BlogCTA';

interface LocationPageProps {
    params: Promise<{
        city: string;
    }>;
}

async function getLiveLocations(): Promise<LocationData[]> {
    try {
        const { data } = await Api.get('/locations/');
        if (data && data.length > 0) return data;
    } catch (error) {
        console.error("Failed to fetch live locations:", error);
    }
    return MOCK_LOCATIONS;
}

export async function generateStaticParams() {
    const allLocations = await getLiveLocations();
    if (!allLocations || allLocations.length === 0) return [];

    return allLocations
        .filter(l => l && l.slug)
        .map((loc: LocationData) => ({
            city: loc.slug,
        }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
    const { city } = await params;
    const allLocations = await getLiveLocations();
    const location = allLocations.find((l: LocationData) => l.slug === city);
    if (!location) return {};

    return {
        title: location.title,
        description: location.description,
        alternates: {
            canonical: `/location/${location.slug}`,
        },
        openGraph: {
            title: location.title,
            description: location.description,
            url: `/location/${location.slug}`,
            type: 'website',
        },
    };
}

export default async function LocationPage({ params }: LocationPageProps) {
    const { city } = await params;
    const allLocations = await getLiveLocations();
    const location = allLocations.find((l: LocationData) => l.slug === city);

    if (!location) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Ashif E.K - Full-Stack Developer in ${location.city}`,
        "description": location.description,
        "url": `https://www.ashifek.in/location/${location.slug}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": location.city,
            "addressRegion": "Kerala",
            "addressCountry": "IN"
        },
        "priceRange": "$$",
        "image": "https://www.ashifek.in/profile-icon.jpg"
    };

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-16 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <div className="max-w-4xl mx-auto">
                <Breadcrumbs />
                
                <header className="mb-16">
                    <div className="flex items-center gap-2 text-academic-primary mb-6">
                        <MapPin className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">Local Expertise // Kerala</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-academic-primary leading-tight">
                        {location.title}
                    </h1>
                    <p className="text-xl text-academic-text/70 font-serif italic max-w-2xl leading-relaxed">
                        {location.description}
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
                    <div className="order-2 lg:order-1">
                        <article className="prose prose-invert prose-academic max-w-none">
                            <div className="text-academic-text/80 leading-relaxed space-y-6 text-lg text-justify">
                                <ReactMarkdown>
                                    {location.content || "# Community Focus..."}
                                </ReactMarkdown>
                            </div>
                        </article>
                        
                        <div className="mt-12 flex flex-col gap-6">
                            <div className="flex items-start gap-4 p-4 rounded-xl border border-academic-border bg-academic-primary/5">
                                <Globe className="w-6 h-6 text-academic-primary shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-academic-primary text-sm mb-1 uppercase tracking-widest">Global Standards</h4>
                                    <p className="text-sm text-academic-text/60">Delivering world-class code to Kerala's most ambitious startups.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-xl border border-academic-border bg-academic-primary/5">
                                <Users className="w-6 h-6 text-academic-primary shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-academic-primary text-sm mb-1 uppercase tracking-widest">Startup Acceleration</h4>
                                    <p className="text-sm text-academic-text/60">Bridging the gap between a local idea and a global product.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative aspect-square rounded-2xl overflow-hidden border border-academic-border shadow-2xl p-2 bg-academic-bg group">
                            <div className="absolute inset-0 bg-academic-primary/5 group-hover:bg-academic-primary/10 transition-colors" />
                            <div className="relative h-full w-full border border-academic-border rounded-xl flex flex-col items-center justify-center p-8 text-center">
                                <div className="w-20 h-20 bg-academic-primary/10 rounded-full flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-10 h-10 text-academic-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Elite Engineering for {location.city}</h3>
                                <p className="text-sm text-academic-muted mb-8 italic font-serif">
                                    "Dedicated to building the next generation of scalable SaaS products for the entrepreneurial spirit of {location.city}."
                                </p>
                                <Link 
                                    href="/contact"
                                    className="btn-primary px-8 py-3 bg-academic-primary text-white rounded-xl font-bold hover:bg-academic-primary/90 transition-all uppercase tracking-widest text-xs"
                                >
                                    Partner in {location.city}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <BlogCTA />
            </div>
        </main>
    );
}
