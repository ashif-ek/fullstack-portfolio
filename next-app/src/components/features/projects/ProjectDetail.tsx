'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { resolveAssetUrl } from '../../../lib/api';
import LazyImage from "../../ui/LazyImage";
import { Project } from "../../../types";

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        // Fetch all projects from BFF and find by slug/id
        fetch(`/api/data/projects`)
            .then(res => res.json())
            .then((projects: Project[]) => {
                if (!isMounted) return;
                const found = projects.find(
                    (p: Project) => String(p.id) === id || p.slug === id
                );
                if (found) {
                    setProject(found);
                    setError(false);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                if (!isMounted) return;
                console.error("Failed to fetch project detail", err);
                setError(true);
            });

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (error || !project) {
        return (
            <div className="min-h-screen bg-academic-paper text-academic-text flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-2xl font-serif font-light mb-4 italic text-academic-primary">
                    {error ? "Case Study not found" : "Retrieving records..."}
                </h1>
                <Link
                    href="/#projects"
                    className="relative z-50 inline-flex items-center text-xs uppercase tracking-widest font-bold text-academic-muted hover:text-academic-accent transition-colors duration-200 group pointer-events-auto"
                >
                    <svg
                        className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Return to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-academic-paper text-academic-text font-sans pb-24">
            <div className="container mx-auto px-6 max-w-4xl py-12 lg:py-24">
                {/* --- Back Button --- */}
                <div className="relative z-50 mb-12 pointer-events-auto">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-academic-muted hover:text-academic-accent transition-colors duration-200 group"
                    >
                        <svg
                            className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Return to Case Studies
                    </Link>
                </div>

                {/* --- Header --- */}
                <header className="mb-12 border-b border-academic-border pb-8">
                    <h1 className="text-4xl lg:text-5xl font-serif font-bold text-academic-primary mb-6 leading-tight italic">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        {project.tags && project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-academic-bg text-academic-secondary border border-academic-border text-[10px] uppercase tracking-widest font-bold"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                {/* --- Image --- */}
                {project.image && (
                    <div className="mb-16 border border-academic-border bg-academic-bg shadow-paper p-2">
                        <LazyImage src={resolveAssetUrl(project.image)} alt={project.title} className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                )}

                {/* --- Content --- */}
                <div className="prose max-w-none
                     prose-p:text-academic-muted prose-p:leading-loose prose-p:font-light
                     prose-headings:font-serif prose-headings:text-academic-primary prose-headings:font-bold
                     prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                     prose-h1:mt-12 prose-h2:mt-10 prose-h3:mt-8
                     prose-a:text-academic-accent hover:prose-a:text-academic-primary prose-a:underline prose-a:underline-offset-4
                     prose-code:bg-academic-bg prose-code:text-academic-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:border prose-code:border-academic-border prose-code:text-sm
                     prose-pre:bg-academic-bg prose-pre:border prose-pre:border-academic-border prose-pre:shadow-sm prose-pre:text-sm prose-pre:p-6
                     prose-hr:border-academic-border prose-hr:my-12
                     prose-ul:text-academic-muted prose-ol:text-academic-muted prose-li:text-academic-muted
                     prose-blockquote:border-l-4 prose-blockquote:border-academic-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-academic-primary">
                    <h2 className="text-2xl font-serif font-bold text-academic-primary mb-6 border-b border-academic-border pb-2 inline-block">Abstract</h2>
                    <p className="whitespace-pre-wrap text-academic-text mb-12">{project.description}</p>

                    {project.content && (
                        <ReactMarkdown>{project.content}</ReactMarkdown>
                    )}
                </div>

                {/* --- Links --- */}
                <div className="mt-16 pt-10 border-t border-academic-border flex flex-col sm:flex-row gap-6">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="academic-button inline-flex justify-center items-center text-xs w-full sm:w-auto px-8 py-4 uppercase tracking-[0.2em] font-bold"
                        >
                            Examine Live Deployment
                            <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    )}

                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-academic-bg text-academic-primary border border-academic-border hover:bg-academic-paper transition-all duration-300 inline-flex justify-center items-center text-xs w-full sm:w-auto px-8 py-4 uppercase tracking-[0.2em] font-bold"
                        >
                            Review Source Matrix
                            <svg className="w-4 h-4 ml-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
