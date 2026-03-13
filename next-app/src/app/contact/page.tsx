import { Metadata } from 'next';
import { profile } from '../../data/mockData';
import { Mail, Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact | Ashif EK',
    description: 'Get in touch with Ashif EK for full-stack development projects, architectural consulting, or technical collaborations.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-academic-primary mb-6 uppercase tracking-tighter">
                        Correspondence
                    </h1>
                    <p className="text-academic-text/60 text-xl font-serif italic border-l-2 border-academic-primary/30 pl-6 py-2">
                        Opening a channel for technical discourse and collaboration.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <section className="space-y-8">
                        <div>
                            <h2 className="text-sm uppercase tracking-[0.2em] text-academic-muted mb-4 font-bold">Direct Channel</h2>
                            <a 
                                href={`mailto:${profile.email}`}
                                className="text-2xl md:text-3xl font-bold hover:text-academic-primary transition-colors inline-flex items-center gap-3"
                            >
                                {profile.email}
                                <ArrowRight className="w-6 h-6 opaicty-50" />
                            </a>
                        </div>

                        <div>
                            <h2 className="text-sm uppercase tracking-[0.2em] text-academic-muted mb-6 font-bold">Digital Presence</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {profile.socialLinks.map((link) => (
                                    <a 
                                        key={link.name} 
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 rounded-xl bg-academic-paper border border-academic-border hover:border-academic-primary/30 transition-all flex items-center gap-3"
                                    >
                                        <span className="p-2 bg-academic-primary/5 rounded-lg text-academic-primary">
                                            {link.name === 'Github' && <Github className="w-5 h-5" />}
                                            {link.name === 'LinkedIn' && <Linkedin className="w-5 h-5" />}
                                            {link.name === 'Instagram' && <Instagram className="w-5 h-5" />}
                                            {link.name !== 'Github' && link.name !== 'LinkedIn' && link.name !== 'Instagram' && <Mail className="w-5 h-5" />}
                                        </span>
                                        <span className="font-bold text-sm uppercase tracking-wider">{link.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="p-8 rounded-3xl bg-academic-primary/5 border border-academic-primary/10 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight text-academic-primary">Local Availability</h3>
                        <p className="text-academic-text/70 mb-6 leading-relaxed">
                            Currently based in India, operating on IST (UTC+5:30). Open to remote collaborations worldwide and selectively available for architectural consulting.
                        </p>
                        <div className="space-y-2">
                            <p className="text-sm text-academic-muted flex justify-between border-b border-academic-border pb-2">
                                <span>Response Latency</span>
                                <span className="font-mono text-academic-primary">{'< 24 Hours'}</span>
                            </p>
                            <p className="text-sm text-academic-muted flex justify-between border-b border-academic-border pb-2">
                                <span>Collaborations</span>
                                <span className="font-mono text-academic-primary">Open</span>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
