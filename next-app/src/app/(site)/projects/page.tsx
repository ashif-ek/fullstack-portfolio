import { Metadata } from 'next';
import { DataService } from '../../../services/dataService';
import { Project } from '../../../lib/data/types';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Projects | Ashif E.K – Full Stack Engineer',
    description: 'Explore the portfolio of Ashif E.K, featuring full-stack applications, AI tools, and scalable architecture solutions.',
};

export default async function ProjectsPage() {
    const projects = await DataService.getProjects();

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 border-b border-academic-border pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-academic-primary mb-4 uppercase tracking-tighter">
                        Works & Engineering
                    </h1>
                    <p className="text-academic-muted text-lg max-w-2xl">
                        A collection of selected projects focusing on performance, scalability, and user-centric design.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project: Project) => (
                        <Link 
                            key={project.id} 
                            href={`/projects/${project.slug}`}
                            className="group block p-6 rounded-2xl bg-academic-paper border border-academic-border hover:border-academic-primary/30 transition-all shadow-small hover:shadow-paper"
                        >
                            <h2 className="text-xl font-bold mb-2 group-hover:text-academic-primary transition-colors uppercase">
                                {project.title}
                            </h2>
                            <p className="text-academic-muted text-sm line-clamp-3 mb-4">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags?.map((tag: string, i: number) => (
                                    <span key={i} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-academic-primary/5 text-academic-primary/70 rounded border border-academic-primary/10">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
