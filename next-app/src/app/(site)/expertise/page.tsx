import { Metadata } from 'next';
import { DataService } from '../../../services/dataService';
import { Skill, Tool, Certificate } from '../../../lib/data/types';
import Link from 'next/link';
import LazyImage from '../../../components/ui/LazyImage';
import profileImg from "../../../assets/profile.jpg";
import { resolveAssetUrl } from '../../../lib/api';
import FadeIn from '../../../components/ui/FadeIn';
import { MapPin, Briefcase, Code2, Award, BookOpen, Layers, Terminal, Server, Shield, Activity, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Expertise Profile | Ashif E.K',
    description: 'Comprehensive profile detailing my experience, technical skills, and engineering philosophy.',
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

    const renderSkills = (title: string, icon: React.ReactNode, items: string[]) => {
        if (!items || items.length === 0) return null;
        return (
            <div className="bg-academic-paper border border-academic-border/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 border-b border-academic-border/40 pb-3">
                    <div className="text-academic-primary/80">{icon}</div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-academic-primary">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {items.map((item, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-academic-bg border border-academic-border/50 text-xs font-medium text-academic-text/80 hover:border-academic-primary/40 hover:text-academic-primary transition-colors cursor-default">
                            {item}
                        </span>
                    ))}
                </div>
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
                "name": "Expertise",
                "item": "https://www.ashifek.in/expertise"
            }
        ]
    };

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text font-sans pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            
            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-24 px-6 bg-gradient-to-b from-academic-paper/50 to-transparent border-b border-academic-border/40">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col-reverse md:flex-row gap-12 items-center justify-between">
                        {/* Text Content (Left) */}
                        <div className="flex-1 w-full text-center md:text-left">
                            <FadeIn>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-primary/10 text-academic-primary text-xs font-bold uppercase tracking-widest mb-6">
                                    <MapPin size={12} />
                                    <span>Kerala, India</span>
                                </div>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-academic-primary mb-4 leading-tight">
                                    Ashif E.K
                                </h1>
                                <h2 className="text-xl md:text-2xl font-medium text-academic-muted mb-8">
                                    Full-Stack Engineer & Architect
                                </h2>
                            </FadeIn>
                            
                            <FadeIn delay={0.1}>
                                <p className="text-lg md:text-xl text-academic-text/80 leading-relaxed max-w-2xl mb-10 mx-auto md:mx-0">
                                    I specialize in building scalable, reliable, and secure web platforms, bridging the gap between elegant frontend interfaces and robust backend architectures.
                                </p>
                            </FadeIn>
                            
                            <FadeIn delay={0.2}>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                    <a href="mailto:ashifek11@gmail.com" className="px-6 py-3 bg-academic-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-academic-primary/90 transition-colors">
                                        Contact Me
                                    </a>
                                    <Link href="/projects" className="px-6 py-3 border border-academic-border bg-academic-paper rounded-lg text-sm font-bold text-academic-primary hover:bg-academic-bg transition-colors">
                                        View Projects
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Portrait (Right) */}
                        <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 relative flex-shrink-0">
                            <FadeIn delay={0.3} direction="up">
                                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-academic-paper bg-academic-paper relative group">
                                    <div className="absolute inset-0 bg-academic-primary/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                                    <LazyImage
                                        src={resolveAssetUrl(mainAbout.avatar) || profileImg.src}
                                        alt="Ashif E.K Portrait"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto max-w-6xl px-6 pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-24">
                        
                        {/* Narrative Profile */}
                        <FadeIn>
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-academic-primary/10 text-academic-primary rounded-lg">
                                        <BookOpen size={24} />
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tight text-academic-primary">Profile</h2>
                                </div>
                                <div className="bg-academic-paper rounded-2xl p-8 border border-academic-border/60 shadow-sm">
                                    <div className="prose prose-lg max-w-none text-academic-text/80 leading-relaxed space-y-6">
                                        <p>{mainAbout.introduction}</p>
                                        <p>{mainAbout.experience}</p>
                                        <p>{mainAbout.philosophy}</p>
                                    </div>
                                </div>
                            </section>
                        </FadeIn>

                        {/* Professional Experience */}
                        <FadeIn>
                            <section>
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="p-2 bg-academic-primary/10 text-academic-primary rounded-lg">
                                        <Briefcase size={24} />
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tight text-academic-primary">Experience</h2>
                                </div>
                                
                                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-academic-border before:to-transparent">
                                    
                                    {/* Bridgeon */}
                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-academic-bg bg-academic-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            <Code2 size={16} />
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-academic-paper border border-academic-border/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-bold text-lg text-academic-primary">Full Stack Developer</h3>
                                            </div>
                                            <div className="text-sm font-medium text-academic-muted mb-4 flex items-center justify-between">
                                                <span>Bridgeon</span>
                                                <span className="px-2 py-1 bg-academic-primary/5 text-academic-primary text-xs rounded-md font-bold">2025 — Present</span>
                                            </div>
                                            <ul className="space-y-2 text-academic-text/80 text-sm leading-relaxed mb-4">
                                                <li className="flex items-start gap-2"><span className="text-academic-primary/50 mt-1">•</span> Architected scalable backend services, reducing API latency by 35%.</li>
                                                <li className="flex items-start gap-2"><span className="text-academic-primary/50 mt-1">•</span> Implemented robust JWT and RBAC authorization across microservices.</li>
                                                <li className="flex items-start gap-2"><span className="text-academic-primary/50 mt-1">•</span> Built idempotent payment workflows with Razorpay integration.</li>
                                                <li className="flex items-start gap-2"><span className="text-academic-primary/50 mt-1">•</span> Managed automated CI/CD and AWS deployments (EC2, RDS).</li>
                                            </ul>
                                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-academic-border/40">
                                                {['Django', 'React', 'PostgreSQL', 'AWS'].map(tech => (
                                                    <span key={tech} className="text-xs font-bold px-2 py-1 bg-academic-bg rounded-md text-academic-muted">{tech}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Regional Technologies */}
                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-academic-bg bg-academic-muted text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            <Code2 size={16} />
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-academic-paper border border-academic-border/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-bold text-lg text-academic-primary">Backend Developer</h3>
                                            </div>
                                            <div className="text-sm font-medium text-academic-muted mb-4 flex items-center justify-between">
                                                <span>Regional Technologies</span>
                                                <span className="px-2 py-1 bg-academic-bg text-academic-muted text-xs rounded-md font-bold">2024 — 2025</span>
                                            </div>
                                            <ul className="space-y-2 text-academic-text/80 text-sm leading-relaxed mb-4">
                                                <li className="flex items-start gap-2"><span className="text-academic-primary/50 mt-1">•</span> Engineered core Django backend supporting cross-platform mobile apps.</li>
                                                <li className="flex items-start gap-2"><span className="text-academic-primary/50 mt-1">•</span> Developed dynamic Flutter interfaces connected to REST APIs.</li>
                                                <li className="flex items-start gap-2"><span className="text-academic-primary/50 mt-1">•</span> Designed governance architecture and precision RBAC.</li>
                                            </ul>
                                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-academic-border/40">
                                                {['Django', 'Flutter', 'REST API'].map(tech => (
                                                    <span key={tech} className="text-xs font-bold px-2 py-1 bg-academic-bg rounded-md text-academic-muted">{tech}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </section>
                        </FadeIn>

                        {/* Engineering Principles */}
                        <FadeIn>
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-academic-primary/10 text-academic-primary rounded-lg">
                                        <Layers size={24} />
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tight text-academic-primary">Engineering Principles</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-academic-paper border border-academic-border/50 rounded-xl hover:border-academic-primary/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-3 text-academic-primary">
                                            <Activity size={20} />
                                            <h3 className="font-bold text-lg">Reliability</h3>
                                        </div>
                                        <p className="text-sm text-academic-text/80 leading-relaxed">Systems should behave predictably under real conditions. I design for failure, ensuring graceful degradation and reliable recovery.</p>
                                    </div>
                                    <div className="p-6 bg-academic-paper border border-academic-border/50 rounded-xl hover:border-academic-primary/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-3 text-academic-primary">
                                            <Shield size={20} />
                                            <h3 className="font-bold text-lg">Security</h3>
                                        </div>
                                        <p className="text-sm text-academic-text/80 leading-relaxed">Secure defaults, explicit authorization, and controlled access. Security is an architectural prerequisite, not an afterthought.</p>
                                    </div>
                                    <div className="p-6 bg-academic-paper border border-academic-border/50 rounded-xl hover:border-academic-primary/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-3 text-academic-primary">
                                            <RefreshCw size={20} />
                                            <h3 className="font-bold text-lg">Maintainability</h3>
                                        </div>
                                        <p className="text-sm text-academic-text/80 leading-relaxed">Prefer clear boundaries and understandable systems over clever abstractions. Code is read far more often than written.</p>
                                    </div>
                                    <div className="p-6 bg-academic-paper border border-academic-border/50 rounded-xl hover:border-academic-primary/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-3 text-academic-primary">
                                            <Server size={20} />
                                            <h3 className="font-bold text-lg">Performance</h3>
                                        </div>
                                        <p className="text-sm text-academic-text/80 leading-relaxed">Measure bottlenecks and optimize actual constraints. Premature optimization is avoided in favor of measurable improvements.</p>
                                    </div>
                                </div>
                            </section>
                        </FadeIn>

                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 space-y-16">
                        
                        {/* Technical Expertise */}
                        <FadeIn>
                            <section>
                                <h2 className="text-xl font-bold tracking-tight text-academic-primary mb-6 flex items-center gap-2">
                                    <Terminal size={20} />
                                    Technical Expertise
                                </h2>
                                <div className="space-y-4">
                                    {renderSkills('Backend', <Server size={18} />, categorizedSkills.BACKEND)}
                                    {renderSkills('Frontend', <Layers size={18} />, categorizedSkills.FRONTEND)}
                                    {renderSkills('Data & Database', <Activity size={18} />, categorizedSkills.DATA)}
                                    {renderSkills('Infrastructure', <Shield size={18} />, categorizedSkills.INFRASTRUCTURE)}
                                    {renderSkills('Architecture', <RefreshCw size={18} />, ['Clean Architecture', 'Microservices', 'Multi-tenancy', 'REST APIs'])}
                                </div>
                            </section>
                        </FadeIn>

                        {/* Certifications */}
                        <FadeIn>
                            <section>
                                <h2 className="text-xl font-bold tracking-tight text-academic-primary mb-6 flex items-center gap-2">
                                    <Award size={20} />
                                    Certifications
                                </h2>
                                <div className="space-y-4">
                                    <div className="p-5 bg-academic-paper border border-academic-border/50 rounded-xl flex gap-4 items-start hover:shadow-md transition-shadow">
                                        <div className="p-2 bg-academic-primary/10 rounded-lg text-academic-primary shrink-0">
                                            <Award size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm text-academic-primary mb-1">Cyber Security Analyst (CCSA)</h3>
                                            <p className="text-xs text-academic-muted">Red Team Hacker Academy · 2022</p>
                                        </div>
                                    </div>
                                    <div className="p-5 bg-academic-paper border border-academic-border/50 rounded-xl flex gap-4 items-start hover:shadow-md transition-shadow">
                                        <div className="p-2 bg-academic-primary/10 rounded-lg text-academic-primary shrink-0">
                                            <Award size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm text-academic-primary mb-1">Python Django & Flutter</h3>
                                            <p className="text-xs text-academic-muted">Regional Technologies · 2025</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </FadeIn>

                        {/* Education */}
                        <FadeIn>
                            <section>
                                <h2 className="text-xl font-bold tracking-tight text-academic-primary mb-6 flex items-center gap-2">
                                    <BookOpen size={20} />
                                    Education
                                </h2>
                                <div className="p-6 bg-academic-paper border border-academic-border/50 rounded-xl relative overflow-hidden">
                                    <div className="absolute -right-4 -top-4 opacity-5 text-academic-primary">
                                        <BookOpen size={80} />
                                    </div>
                                    <h3 className="font-bold text-academic-primary mb-2">Bachelor of Computer Applications</h3>
                                    <p className="text-sm text-academic-text/80 mb-4">SAFA Arts & Science College</p>
                                    <div className="inline-block px-3 py-1 bg-academic-primary/10 text-academic-primary text-xs rounded-lg font-bold">
                                        2022 — 2025
                                    </div>
                                </div>
                            </section>
                        </FadeIn>

                    </div>
                </div>
            </div>

            {/* CTA */}
            <section className="mt-24 py-20 bg-academic-paper border-t border-academic-border/50">
                <div className="container mx-auto max-w-4xl px-6 text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-bold tracking-tight text-academic-primary mb-4">
                            Let's Build Something Meaningful.
                        </h2>
                        <p className="text-lg text-academic-text/80 mb-8 max-w-xl mx-auto">
                            Available for technically demanding projects, engineering team roles, and architectural consulting.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a href="mailto:ashifek11@gmail.com" className="px-8 py-3 bg-academic-primary text-white rounded-lg font-bold shadow-lg shadow-academic-primary/20 hover:bg-academic-primary/90 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                Get in Touch
                            </a>
                            <Link href="/resume/ASHIF-E.K-RESUME-FULL-STACK.pdf" target="_blank" className="px-8 py-3 border border-academic-border bg-academic-bg rounded-lg font-bold text-academic-primary hover:bg-academic-primary/5 transition-colors">
                                View Resume
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
