import { Metadata } from 'next';
import { DataService } from '../../../services/dataService';
import { Skill, Tool, Certificate } from '../../../lib/data/types';
import Link from 'next/link';
import LazyImage from '../../../components/ui/LazyImage';
import profileImg from "../../../assets/profile.jpg";
import { resolveAssetUrl } from '../../../lib/api';
import FadeIn from '../../../components/ui/FadeIn';

export const metadata: Metadata = {
    title: 'About | Ashif E.K',
    description: 'I build reliable web platforms and backend systems where architecture, security, and operational correctness matter.',
};

export default async function AboutPage() {
    const aboutData = await DataService.getAbout();
    const skills = await DataService.getSkills();
    const tools = await DataService.getTools();
    const certificates = await DataService.getCertificates();

    const mainAbout = aboutData || { introduction: '', experience: '', philosophy: '', avatar: '' };

    const categorize = (item: any) => {
        const name = item.name.toLowerCase();
        if (['django', 'fastapi', 'python', 'rest api', 'authentication', 'rbac'].some(t => name.includes(t))) return 'BACKEND';
        if (['react', 'next.js', 'typescript', 'redux', 'zustand', 'html', 'css', 'tailwind'].some(t => name.includes(t))) return 'FRONTEND';
        if (['postgresql', 'redis', 'supabase', 'neon', 'sql', 'mongo'].some(t => name.includes(t))) return 'DATA';
        if (['docker', 'aws', 'ec2', 'rds', 's3', 'nginx', 'gunicorn', 'github actions', 'ci/cd', 'git'].some(t => name.includes(t))) return 'INFRASTRUCTURE';
        return 'OTHER';
    };

    const categorizedSkills = skills.reduce((acc: any, skill: Skill) => {
        const category = categorize(skill);
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill.name);
        return acc;
    }, {} as Record<string, string[]>);
    
    tools.forEach((tool: Tool) => {
        const category = categorize(tool);
        if (!categorizedSkills[category]) categorizedSkills[category] = [];
        if (!categorizedSkills[category].includes(tool.name)) categorizedSkills[category].push(tool.name);
    });

    const renderSkills = (title: string, items: string[]) => {
        if (!items || items.length === 0) return null;
        return (
            <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-academic-muted mb-3">{title}</h3>
                <p className="text-sm text-academic-text/90 leading-relaxed">
                    {items.join(' · ')}
                </p>
            </div>
        );
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.ashifek.in"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://www.ashifek.in/about"
            }
        ]
    };

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            
            {/* Hero Section */}
            <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-6 border-b border-academic-border/50">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
                        
                        {/* Text Content (Left) */}
                        <div className="lg:col-span-8 order-2 lg:order-1">
                            <FadeIn>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-academic-primary mb-4 md:mb-6">
                                    Ashif E.K
                                </h1>
                                <h2 className="text-xl md:text-2xl font-serif text-academic-muted mb-8 md:mb-12">
                                    Full-Stack Engineer
                                </h2>
                            </FadeIn>
                            
                            <FadeIn delay={0.1}>
                                <p className="text-xl md:text-3xl font-medium text-academic-primary/90 leading-snug max-w-3xl mb-12">
                                    I build reliable web platforms and backend systems where architecture, security, and operational correctness matter.
                                </p>
                            </FadeIn>
                            
                            <FadeIn delay={0.2}>
                                <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-bold uppercase tracking-[0.2em] text-academic-muted">
                                    <span>Kerala, India</span>
                                    <span>Full-Stack Engineering</span>
                                    <span>Django · React · FastAPI · PostgreSQL</span>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Portrait (Right) */}
                        <div className="lg:col-span-4 order-1 lg:order-2">
                            <FadeIn delay={0.3} direction="left">
                                <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:ml-auto">
                                    <div className="absolute inset-0 border border-academic-border translate-x-3 translate-y-3" />
                                    <div className="relative h-full w-full bg-academic-paper border border-academic-border p-2">
                                        <div className="w-full h-full relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                            <LazyImage
                                                src={resolveAssetUrl(mainAbout.avatar) || profileImg.src}
                                                alt="Ashif E.K Portrait"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-6 -right-2 text-[9px] uppercase tracking-widest text-academic-muted/50 font-mono">
                                        IDX_01 // ABOUT
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                        
                    </div>
                </div>
            </section>

            <div className="container mx-auto max-w-6xl px-6 pt-24 md:pt-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-24 md:space-y-32">
                        
                        {/* Narrative */}
                        <FadeIn>
                            <section>
                                <div className="flex items-baseline gap-4 mb-12">
                                    <span className="text-xs font-mono text-academic-muted">01</span>
                                    <h2 className="text-2xl font-serif font-bold tracking-tight text-academic-primary">Profile</h2>
                                </div>
                                <div className="prose prose-academic max-w-none text-base md:text-lg text-academic-text/80 leading-relaxed space-y-6">
                                    <p>{mainAbout.introduction}</p>
                                    <p>{mainAbout.experience}</p>
                                    <p>{mainAbout.philosophy}</p>
                                </div>
                            </section>
                        </FadeIn>

                        {/* Experience */}
                        <FadeIn>
                            <section>
                                <div className="flex items-baseline gap-4 mb-12">
                                    <span className="text-xs font-mono text-academic-muted">02</span>
                                    <h2 className="text-2xl font-serif font-bold tracking-tight text-academic-primary">Experience</h2>
                                </div>
                                
                                <div className="space-y-16">
                                    {/* Bridgeon */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                                        <div className="md:col-span-1 text-sm font-bold tracking-widest uppercase text-academic-muted pt-1">
                                            2025 — Present
                                        </div>
                                        <div className="md:col-span-3">
                                            <h3 className="text-xl font-serif font-bold text-academic-primary mb-1">Full Stack Developer</h3>
                                            <p className="text-sm font-medium text-academic-muted mb-4">Bridgeon</p>
                                            <p className="text-xs font-bold tracking-[0.1em] uppercase text-academic-muted/70 mb-6 pb-4 border-b border-academic-border/50">
                                                Django REST Framework · React · PostgreSQL · AWS
                                            </p>
                                            <ul className="space-y-3 text-academic-text/80 text-sm md:text-base leading-relaxed list-disc list-outside ml-4">
                                                <li className="pl-2">Architected and deployed scalable backend services, reducing API latency by up to 35%.</li>
                                                <li className="pl-2">Implemented robust JWT and RBAC authorization across multiple distributed services.</li>
                                                <li className="pl-2">Built idempotent payment workflows integrating Razorpay for secure transactions.</li>
                                                <li className="pl-2">Managed EC2 and RDS deployments configured with Nginx and Gunicorn.</li>
                                                <li className="pl-2">Designed and automated CI/CD pipelines to ensure rapid and reliable deployments.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Regional Technologies */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                                        <div className="md:col-span-1 text-sm font-bold tracking-widest uppercase text-academic-muted pt-1">
                                            2024 — 2025
                                        </div>
                                        <div className="md:col-span-3">
                                            <h3 className="text-xl font-serif font-bold text-academic-primary mb-1">Backend & Mobile Developer</h3>
                                            <p className="text-sm font-medium text-academic-muted mb-4">Regional Technologies</p>
                                            <p className="text-xs font-bold tracking-[0.1em] uppercase text-academic-muted/70 mb-6 pb-4 border-b border-academic-border/50">
                                                Django · Flutter · REST APIs
                                            </p>
                                            <ul className="space-y-3 text-academic-text/80 text-sm md:text-base leading-relaxed list-disc list-outside ml-4">
                                                <li className="pl-2">Engineered the core Django backend supporting cross-platform mobile applications.</li>
                                                <li className="pl-2">Developed dynamic Flutter interfaces connected seamlessly to backend REST APIs.</li>
                                                <li className="pl-2">Designed governance architecture and RBAC for precise access control.</li>
                                                <li className="pl-2">Architected a resilient workflow and escalation system for critical data handling.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </FadeIn>

                        {/* Engineering Principles */}
                        <FadeIn>
                            <section>
                                <div className="flex items-baseline gap-4 mb-12">
                                    <span className="text-xs font-mono text-academic-muted">03</span>
                                    <h2 className="text-2xl font-serif font-bold tracking-tight text-academic-primary">Engineering Principles</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-academic-primary mb-3">Reliability</h3>
                                        <p className="text-sm text-academic-text/80 leading-relaxed">Systems should behave predictably under real conditions. I design for failure, ensuring graceful degradation and reliable recovery.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-academic-primary mb-3">Security</h3>
                                        <p className="text-sm text-academic-text/80 leading-relaxed">Secure defaults, explicit authorization, and controlled access. Security is an architectural prerequisite, not an afterthought.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-academic-primary mb-3">Maintainability</h3>
                                        <p className="text-sm text-academic-text/80 leading-relaxed">Prefer clear boundaries and understandable systems over clever abstractions. Code is read far more often than it is written.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-academic-primary mb-3">Performance</h3>
                                        <p className="text-sm text-academic-text/80 leading-relaxed">Measure bottlenecks and optimize actual constraints. Premature optimization is avoided in favor of measurable improvements.</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-academic-primary mb-3">Automation</h3>
                                        <p className="text-sm text-academic-text/80 leading-relaxed">Automate repetitive operational work and deployment processes to eliminate human error and accelerate delivery.</p>
                                    </div>
                                </div>
                            </section>
                        </FadeIn>

                    </div>

                    {/* Sidebar / Supporting Content Column */}
                    <div className="lg:col-span-4 space-y-24 md:space-y-32">
                        
                        {/* Expertise Taxonomy */}
                        <FadeIn>
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-academic-primary mb-8 border-b border-academic-border pb-4">Technical Expertise</h2>
                                <div className="space-y-8">
                                    {renderSkills('Backend', categorizedSkills.BACKEND)}
                                    {renderSkills('Frontend', categorizedSkills.FRONTEND)}
                                    {renderSkills('Data', categorizedSkills.DATA)}
                                    {renderSkills('Infrastructure', categorizedSkills.INFRASTRUCTURE)}
                                    {renderSkills('Architecture', ['Clean Architecture', 'Service-oriented systems', 'Multi-tenancy', 'API-driven systems'])}
                                </div>
                            </section>
                        </FadeIn>

                        {/* Education */}
                        <FadeIn>
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-academic-primary mb-8 border-b border-academic-border pb-4">Education</h2>
                                <div>
                                    <h3 className="text-sm font-bold text-academic-primary mb-1">Bachelor of Computer Applications</h3>
                                    <p className="text-xs text-academic-muted mb-2">SAFA Arts & Science College · University of Calicut</p>
                                    <p className="text-xs font-mono text-academic-muted/70">2022 — 2025</p>
                                </div>
                            </section>
                        </FadeIn>

                        {/* Certifications */}
                        <FadeIn>
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-academic-primary mb-8 border-b border-academic-border pb-4">Certifications</h2>
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-sm font-bold text-academic-primary mb-1">Certified Cyber Security Analyst (CCSA)</h3>
                                        <p className="text-xs text-academic-muted">Red Team Hacker Academy · 2022</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-academic-primary mb-1">Python Django & Flutter Certification</h3>
                                        <p className="text-xs text-academic-muted">Regional Technologies · 2025</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-academic-primary mb-1">Workshop Participation Certificate</h3>
                                        <p className="text-xs text-academic-muted">Prosevo Technologies · 2024</p>
                                    </div>
                                </div>
                            </section>
                        </FadeIn>

                    </div>
                </div>
            </div>

            {/* Transition & CTA */}
            <section className="mt-32 pt-32 pb-16 border-t border-academic-border/50">
                <div className="container mx-auto max-w-4xl px-6 text-center">
                    <FadeIn>
                        <p className="text-lg font-serif italic text-academic-muted mb-8">
                            Systems are best understood through what they actually ship.
                        </p>
                        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-academic-primary hover:text-academic-accent transition-colors mb-24 group">
                            View Selected Projects
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="max-w-2xl mx-auto bg-academic-primary/5 p-12 md:p-16 border border-academic-primary/10">
                            <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight text-academic-primary mb-4">
                                LET'S BUILD SOMETHING USEFUL.
                            </h2>
                            <p className="text-sm md:text-base text-academic-text/80 mb-8 max-w-md mx-auto">
                                For engineering teams, product work, or technically demanding projects.
                            </p>
                            <a href="mailto:ashifek11@gmail.com" className="inline-block px-8 py-3 bg-academic-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-academic-primary/90 transition-colors">
                                Get in touch
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>

        </main>
    );
}
