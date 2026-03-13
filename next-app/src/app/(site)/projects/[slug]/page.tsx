import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '../../../../data/mockData';
import { Project } from '../../../../types';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Github, Globe, Tag } from 'lucide-react';
import Link from 'next/link';

import Api from '../../../../lib/api';

interface ProjectPageProps {
    params: {
        slug: string;
    };
}

// Helper to fetch live projects or fallback to mock
async function getLiveProjects(): Promise<Project[]> {
    try {
        const { data } = await Api.get('/projects/');
        if (data && data.length > 0) return data;
    } catch (error) {
        console.error("Failed to fetch live projects:", error);
    }
    return projects;
}

export async function generateStaticParams() {
    const allProjects = await getLiveProjects();
    return allProjects.map((project: Project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const allProjects = await getLiveProjects();
    const project = allProjects.find((p: Project) => p.slug === params.slug);
    if (!project) return {};

    return {
        title: `${project.title} | Projects`,
        description: project.description,
        openGraph: {
            title: `${project.title} | Ashif E.K`,
            description: project.description,
            type: 'article',
            images: [{ url: project.image?.startsWith('http') ? project.image : `/projects/${project.image}` }],
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.description,
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const allProjects = await getLiveProjects();
    const project = allProjects.find((p: Project) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": project.title,
        "description": project.description,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "author": {
            "@type": "Person",
            "name": "Ashif E.K"
        },
        "featureList": project.tags?.join(", "),
        "url": `https://www.ashifek.in/projects/${project.slug}`
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
                "name": "Projects",
                "item": "https://www.ashifek.in/projects"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": project.title,
                "item": `https://www.ashifek.in/projects/${project.slug}`
            }
        ]
    };

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-16 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <div className="max-w-4xl mx-auto">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-academic-primary hover:underline mb-8 group transition-all uppercase text-xs font-bold tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </Link>

                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-academic-primary">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 mb-8">
                        {project.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-academic-primary/10 text-academic-primary text-sm border border-academic-primary/20"
                            >
                                <Tag className="w-3 h-3" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        {project.link !== '#' && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-academic-primary text-white hover:bg-academic-primary/90 transition-colors"
                            >
                                <Globe className="w-4 h-4" />
                                Live Demo
                            </a>
                        )}
                        {project.github !== '#' && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary inline-flex items-center gap-2 px-6 py-2 rounded-lg border border-academic-primary/30 text-academic-primary hover:bg-academic-primary/5 transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                Source Code
                            </a>
                        )}
                    </div>
                </header>

                <div className="prose prose-invert prose-academic max-w-none">
                    <div className="rounded-2xl overflow-hidden border border-academic-primary/20 aspect-video mb-12 shadow-2xl">
                        <img
                            src={project.image.startsWith('http') ? project.image : `/projects/${project.image}`}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="eager"
                        />
                    </div>

                    <div className="bg-academic-primary/5 p-8 rounded-2xl border border-academic-primary/10 mb-12">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            Project Overview
                        </h2>
                        <p className="text-lg text-academic-text/80 leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <section className="space-y-12">
                        <ReactMarkdown>
                            {project.content || "Case study details coming soon..."}
                        </ReactMarkdown>
                    </section>
                </div>
            </div>
        </main>
    );
}
