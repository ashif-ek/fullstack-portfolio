import { Metadata } from 'next';
import { DataService } from '../../services/dataService';
import { Skill, Tool } from '../../lib/data/types';
import Link from 'next/link';
import LazyImage from '../../components/ui/LazyImage';
import profileImg from "../../assets/profile.jpg";
import { resolveAssetUrl } from '../../lib/api';
import FadeIn from '../../components/ui/FadeIn';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import {
    ArrowLeft,
    MapPin,
    Mail,
    Phone,
    Github,
    Linkedin,
    FileText,
    Briefcase,
    GraduationCap,
    Award,
    Terminal,
    Server,
    Layers,
    Cloud,
    ShieldCheck,
    Cpu,
    Wrench,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Expertise Profile | Ashif E.K',
    description: 'Engineering profile of Ashif E.K — Full-Stack Engineer. Experience, stack, and background.',
};

// ---------------------------------------------------------------------------
// Contact + external links
// ---------------------------------------------------------------------------
const CONTACT = {
    email: 'ashifek11@gmail.com',
    phone: '+91 9037499763',
    phoneHref: 'tel:+919037499763',
    github: 'https://github.com/ashif-ek',
    linkedin: 'https://www.linkedin.com/in/ashifek',
    docsStack: 'https://ashif-ek.github.io/docs-stack-material/',
};

// ---------------------------------------------------------------------------
// Experience — normally comes from the CMS as a JSON string in
// `mainAbout.experience`. We parse it into structured cards; if the field is
// empty, unparsable, or plain prose, we fall back to this resume-accurate list.
// ---------------------------------------------------------------------------
type ExperienceEntry = {
    role: string;
    company: string;
    period: string;
    highlights: string[];
    link?: string;
};

const FALLBACK_EXPERIENCE: ExperienceEntry[] = [
    {
        role: 'Full Stack Developer',
        company: 'Bridgeon',
        period: 'May 2025 — Present',
        highlights: [
            'Architected and delivered scalable web applications using Django REST Framework, React, and PostgreSQL following modular, service-oriented design.',
            'Designed secure REST APIs implementing JWT authentication, RBAC, and layered permission enforcement.',
            'Improved backend performance by optimizing database queries and request execution paths, cutting API response latency by up to 35%.',
            'Built state-driven admin interfaces using React + Redux Toolkit, ensuring predictable data flow and fewer UI inconsistencies.',
            'Implemented Razorpay payment workflows with transaction verification, idempotent order handling, and failure recovery.',
            'Deployed to AWS (EC2, RDS) with Nginx + Gunicorn — reverse proxying, process management, and zero-downtime deploys via CI/CD.',
        ],
    },
    {
        role: 'Project Intern',
        company: 'Regional Technologies',
        period: 'Oct 2024 — Mar 2025',
        highlights: [
            'Built a cross-platform digital governance platform: Django backend services plus a Flutter mobile app for citizen–administration interaction.',
            'Modeled hierarchical governance architecture (District → Higher Authority → Panchayath → Citizens) with role-based permission controls.',
            'Developed REST APIs for citizen services — requests, complaint submission, notifications, and community updates.',
            'Implemented complaint escalation workflows, forwarding unresolved Panchayath-level issues to higher authorities.',
            'Designed normalized, query-efficient data models, reducing redundant joins under relational workloads.',
        ],
    },
];

function parseExperience(raw?: string): ExperienceEntry[] {
    if (!raw) return FALLBACK_EXPERIENCE;
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((item: any) => ({
                role: item.role ?? '',
                company: item.company ?? '',
                period: item.period ?? '',
                highlights: Array.isArray(item.highlights) ? item.highlights : [],
                link: typeof item.link === 'string' ? item.link : undefined,
            }));
        }
    } catch {
        // CMS field held plain prose rather than JSON — use the fallback below.
    }
    return FALLBACK_EXPERIENCE;
}

// ---------------------------------------------------------------------------
// "How I Build" — chunks a philosophy sentence into short, scannable points
// instead of one dense paragraph. Splits on the lead colon (if present),
// then on commas, and drops a leading "and".
// ---------------------------------------------------------------------------
const FALLBACK_PRINCIPLES = {
    lead: 'Reliability, security, and maintainability',
    points: [
        'design for failure and graceful degradation',
        'secure defaults, built in rather than bolted on',
        'clear boundaries over clever abstractions',
        'measured, not premature, optimization',
    ],
};

function chunkPrinciples(raw?: string): { lead: string; points: string[] } {
    if (!raw) return FALLBACK_PRINCIPLES;
    const [firstPart, ...restParts] = raw.split(':');
    const lead = (restParts.length ? firstPart : '').trim().replace(/\.$/, '');
    const tail = (restParts.length ? restParts.join(':') : raw).trim();
    const points = tail
        .split(',')
        .map((seg) => seg.replace(/^\s*and\s+/i, '').replace(/\.\s*$/, '').trim())
        .filter(Boolean);
    return {
        lead: lead || FALLBACK_PRINCIPLES.lead,
        points: points.length ? points : FALLBACK_PRINCIPLES.points,
    };
}

// ---------------------------------------------------------------------------
// Skills sidebar — categorized from CMS skills/tools, with a resume-based
// fallback so every category renders correctly before the CMS is updated.
// ---------------------------------------------------------------------------
const FALLBACK_SKILLS: Record<string, string[]> = {
    LANGUAGES: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
    BACKEND: ['Django', 'Django REST Framework', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'Celery', 'Redis'],
    FRONTEND: ['React.js', 'Next.js', 'Zustand', 'Tailwind CSS'],
    AI_DATA: ['LangChain', 'LangGraph', 'RAG', 'ChromaDB', 'Vector Search', 'PostgreSQL'],
    ARCHITECTURE: ['Clean Architecture', 'Microservices', 'Schema-Based Multi-Tenancy', 'MFA', 'SSO'],
    CLOUD_DEVOPS: ['AWS (EC2, RDS, S3)', 'Docker', 'GitHub Actions', 'Nginx', 'Gunicorn'],
    OBSERVABILITY: ['Prometheus', 'Grafana', 'Lighthouse', 'CodeQL'],
};

const CATEGORY_LABELS: Record<string, string> = {
    LANGUAGES: 'Languages',
    BACKEND: 'Backend',
    FRONTEND: 'Frontend',
    AI_DATA: 'AI & Data',
    ARCHITECTURE: 'Architecture & Security',
    CLOUD_DEVOPS: 'Cloud & DevOps',
    OBSERVABILITY: 'Observability',
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    LANGUAGES: <Terminal size={14} />,
    BACKEND: <Server size={14} />,
    FRONTEND: <Layers size={14} />,
    AI_DATA: <Cpu size={14} />,
    ARCHITECTURE: <ShieldCheck size={14} />,
    CLOUD_DEVOPS: <Cloud size={14} />,
    OBSERVABILITY: <Wrench size={14} />,
};

const CATEGORY_ORDER = ['LANGUAGES', 'BACKEND', 'FRONTEND', 'AI_DATA', 'CLOUD_DEVOPS', 'ARCHITECTURE', 'OBSERVABILITY'];

const CERTIFICATIONS = [
    { name: 'Certified Cyber Security Analyst (CCSA)', org: 'Red Team Hacker Academy', year: '2022' },
    { name: 'Python Django & Flutter Certification', org: 'Regional Technologies', year: '2025' },
];

export default async function AboutPage() {
    const aboutData = await DataService.getAbout();
    const skills = await DataService.getSkills();
    const tools = await DataService.getTools();

    const mainAbout = aboutData || { introduction: '', experience: '', philosophy: '', avatar: '' };
    const experience = parseExperience(mainAbout.experience);
    const principles = chunkPrinciples(mainAbout.philosophy);

    const categorize = (name: string): string => {
        const n = name.toLowerCase();
        if (['python', 'javascript', 'typescript', 'sql'].some(t => n.includes(t))) return 'LANGUAGES';
        if (['langchain', 'langgraph', 'rag', 'chromadb', 'vector'].some(t => n.includes(t))) return 'AI_DATA';
        if (['django', 'fastapi', 'sqlalchemy', 'pydantic', 'alembic', 'rest api', 'jwt', 'rbac', 'celery', 'redis', 'websocket'].some(t => n.includes(t))) return 'BACKEND';
        if (['react', 'next.js', 'zustand', 'tailwind', 'html', 'css'].some(t => n.includes(t))) return 'FRONTEND';
        if (['postgresql', 'mongo', 'elt'].some(t => n.includes(t))) return 'AI_DATA';
        if (['clean architecture', 'microservices', 'multi-tenan', 'mfa', 'sso', 'http-only', 'httponly'].some(t => n.includes(t))) return 'ARCHITECTURE';
        if (['aws', 'ec2', 'rds', 's3', 'cloudinary', 'docker', 'nginx', 'gunicorn', 'github actions', 'jenkins', 'ci/cd', 'git'].some(t => n.includes(t))) return 'CLOUD_DEVOPS';
        if (['prometheus', 'grafana', 'flower', 'lighthouse', 'codeql', 'coderabbit'].some(t => n.includes(t))) return 'OBSERVABILITY';
        return 'BACKEND';
    };

    const categorizedSkills: Record<string, string[]> = {};
    [...skills.map((s: Skill) => s.name), ...tools.map((t: Tool) => t.name)].forEach((name) => {
        const cat = categorize(name);
        if (!categorizedSkills[cat]) categorizedSkills[cat] = [];
        if (!categorizedSkills[cat].includes(name)) categorizedSkills[cat].push(name);
    });

    CATEGORY_ORDER.forEach((cat) => {
        if (!categorizedSkills[cat] || categorizedSkills[cat].length === 0) {
            categorizedSkills[cat] = FALLBACK_SKILLS[cat];
        }
    });

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.ashifek.in" },
            { "@type": "ListItem", "position": 2, "name": "Expertise", "item": "https://www.ashifek.in/expertise" }
        ]
    };

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text font-sans pb-24 relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Top Navigation */}
            <div className="absolute top-0 left-0 right-0 z-50">
                <div className="container mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-academic-muted hover:text-academic-primary transition-colors">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <ThemeToggle />
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-6 pt-24 md:pt-28">

                <FadeIn>
                    {/* Compact identity block — no hero banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-academic-border/60 shrink-0 bg-academic-paper">
                            <LazyImage
                                src={resolveAssetUrl(mainAbout.avatar) || profileImg.src}
                                alt="Ashif E.K"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-academic-primary">
                                    Ashif E.K
                                </h1>
                                <span className="text-sm font-medium text-academic-muted">
                                    Full-Stack Engineer
                                </span>
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 text-xs text-academic-muted">
                                <MapPin size={12} />
                                <span>Kerala, India</span>
                            </div>
                            <p className="mt-3 text-sm text-academic-text/80 leading-relaxed max-w-2xl">
                                {mainAbout.introduction ||
                                    'Building scalable, production-grade SaaS and AI-powered platforms with Django, FastAPI, Next.js, PostgreSQL, and AWS — with hands-on work in RAG, schema-based multi-tenancy, and secure authentication.'}
                            </p>
                        </div>

                        <div className="flex sm:flex-col gap-2 shrink-0">
                            <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-academic-primary text-white rounded-lg text-xs font-bold hover:bg-academic-primary/90 transition-colors">
                                <Mail size={13} /> Contact
                            </a>
                            <Link href="/resume/ASHIF-E.K-RESUME-FULL-STACK.pdf" target="_blank" className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-academic-border bg-academic-paper rounded-lg text-xs font-bold text-academic-primary hover:bg-academic-bg transition-colors">
                                Résumé
                            </Link>
                        </div>
                    </div>

                    {/* Direct contact + links — no portfolio link here, this page already lives inside the portfolio */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 py-4 text-xs text-academic-muted border-y border-academic-border/40">
                        <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-academic-primary transition-colors">
                            <Github size={14} /> GitHub
                        </a>
                        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-academic-primary transition-colors">
                            <Linkedin size={14} /> LinkedIn
                        </a>
                        <a href={CONTACT.docsStack} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-academic-primary transition-colors">
                            <FileText size={14} /> Docs Stack
                        </a>
                        <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1.5 hover:text-academic-primary transition-colors">
                            <Mail size={14} /> {CONTACT.email}
                        </a>
                        <a href={CONTACT.phoneHref} className="inline-flex items-center gap-1.5 hover:text-academic-primary transition-colors">
                            <Phone size={14} /> {CONTACT.phone}
                        </a>
                    </div>
                </FadeIn>

                <FadeIn delay={0.08}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 pt-12">

                        {/* Main column */}
                        <div className="lg:col-span-8 space-y-14">

                            {/* Experience — parsed from CMS JSON, chunked highlights, no bullet icons */}
                            <section>
                                <div className="flex items-center gap-2 mb-6">
                                    <Briefcase size={17} className="text-academic-primary" />
                                    <h2 className="text-lg font-bold tracking-tight text-academic-primary">Experience</h2>
                                </div>

                                <div className="space-y-5">
                                    {experience.map((job) => (
                                        <div key={`${job.company}-${job.role}`} className="border border-academic-border/50 rounded-xl p-5 bg-academic-paper">
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                                <div>
                                                    <h3 className="font-bold text-sm text-academic-primary">{job.role}</h3>
                                                    <p className="text-xs text-academic-muted">
                                                        {job.link ? (
                                                            <a href={job.link} target="_blank" rel="noopener noreferrer" className="hover:text-academic-primary transition-colors">
                                                                {job.company}
                                                            </a>
                                                        ) : job.company}
                                                    </p>
                                                </div>
                                                <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-academic-bg text-academic-muted">
                                                    {job.period}
                                                </span>
                                            </div>

                                            {/* Small chunks, no bullet-point icons — just clean, spaced lines */}
                                            <div className="space-y-1.5">
                                                {job.highlights.map((h, i) => (
                                                    <p key={i} className="text-sm text-academic-text/80 leading-relaxed border-l-2 border-academic-border/50 pl-3">
                                                        {h}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* How I Build — philosophy text chunked into short points, no bullet icons */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <Layers size={17} className="text-academic-primary" />
                                    <h2 className="text-lg font-bold tracking-tight text-academic-primary">How I Build</h2>
                                </div>
                                <p className="text-sm text-academic-text/80 leading-relaxed mb-3">
                                    <span className="font-bold text-academic-primary">{principles.lead}.</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {principles.points.map((point, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-lg bg-academic-paper border border-academic-border/50 text-xs text-academic-text/80 capitalize">
                                            {point}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-10">

                            {/* Technical expertise */}
                            <section>
                                <h2 className="text-sm font-bold text-academic-primary mb-4">Technical Expertise</h2>
                                <div className="space-y-4">
                                    {CATEGORY_ORDER.map((cat) => {
                                        const items = categorizedSkills[cat];
                                        if (!items || items.length === 0) return null;
                                        return (
                                            <div key={cat}>
                                                <div className="flex items-center gap-1.5 mb-2 text-academic-muted">
                                                    {CATEGORY_ICONS[cat]}
                                                    <span className="text-[11px] font-semibold">{CATEGORY_LABELS[cat]}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {items.map((item) => (
                                                        <span key={item} className="px-2.5 py-1 rounded-md bg-academic-paper border border-academic-border/50 text-[11px] font-medium text-academic-text/80">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Certifications */}
                            <section>
                                <h2 className="text-sm font-bold text-academic-primary mb-4 flex items-center gap-2">
                                    <Award size={15} /> Certifications
                                </h2>
                                <div className="space-y-3">
                                    {CERTIFICATIONS.map((c) => (
                                        <div key={c.name} className="p-3.5 bg-academic-paper border border-academic-border/50 rounded-lg">
                                            <h3 className="text-xs font-bold text-academic-primary">{c.name}</h3>
                                            <p className="text-[11px] text-academic-muted mt-1">{c.org}, {c.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h2 className="text-sm font-bold text-academic-primary mb-4 flex items-center gap-2">
                                    <GraduationCap size={15} /> Education
                                </h2>
                                <div className="p-3.5 bg-academic-paper border border-academic-border/50 rounded-lg">
                                    <h3 className="text-xs font-bold text-academic-primary">Bachelor of Computer Applications</h3>
                                    <p className="text-[11px] text-academic-muted mt-1">SAFA Arts &amp; Science College, 2022 — 2025</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </FadeIn>

                {/* Compact closing CTA */}
                <FadeIn delay={0.12}>
                    <div className="mt-20 pt-10 border-t border-academic-border/50 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-academic-primary">Open to engineering roles and architectural consulting.</h2>
                            <p className="text-sm text-academic-muted mt-1">Reach out directly — I usually reply within a day.</p>
                        </div>
                        <a href={`mailto:${CONTACT.email}`} className="px-5 py-2.5 bg-academic-primary text-white rounded-lg text-sm font-bold hover:bg-academic-primary/90 transition-colors shrink-0">
                            Get in Touch
                        </a>
                    </div>
                </FadeIn>

                {/* Bottom Navigation */}
                <div className="mt-16 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-academic-muted hover:text-academic-primary transition-colors">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}