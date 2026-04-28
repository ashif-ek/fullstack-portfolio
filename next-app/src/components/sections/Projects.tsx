import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProjects } from '../../hooks/useProjects';
import LazyImage from '../ui/LazyImage';
import { resolveAssetUrl } from '../../lib/api';
import { DataService } from '../../services/dataService';
import { Skeleton } from '../ui/Skeleton';

const projectImages: Record<string, string> = {
  '1': "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
  '2': "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  '3': "https://images.unsplash.com/photo-1499750310159-5254f4cc65af?auto=format&fit=crop&q=80&w=800",
  '4': "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
};

const ProjectSkeleton = () => (
  <div className="flex flex-col bg-academic-bg border border-academic-border overflow-hidden shadow-academic">
    <Skeleton className="h-64 w-full" />
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-20 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-12 w-full pt-4" />
    </div>
  </div>
);

const Projects = ({ condensed = false }: { condensed?: boolean }) => {
  const { data: projects = [], isLoading } = useProjects();
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  const handleProjectClick = async (projectId: string, projectSlug: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await DataService.trackProjectClick(projectId);
    } catch (error) {
      console.error("Failed to track click:", error);
    }
    router.push(`/projects/${projectSlug}`);
  };

  return (
    <section id="projects" className="py-16 md:py-32 bg-academic-paper text-academic-text relative border-t border-academic-border">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="mb-20">
          <h2 className="section-title">Project Case Studies</h2>
          <p className="text-academic-muted font-serif italic mt-2">A curated selection of technical implementations and architectural solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {isLoading ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : (
            displayedProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col bg-academic-bg border border-academic-border overflow-hidden shadow-academic hover:shadow-paper transition-all duration-500 cursor-pointer"
                onClick={(e) => handleProjectClick(String(project.id), project.slug, e)}
              >
                <div className="relative overflow-hidden h-64 border-b border-academic-border">
                  <LazyImage
                    src={projectImages[String(project.id)] ?? resolveAssetUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-academic-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-serif font-bold text-academic-primary group-hover:text-academic-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className={`text-academic-muted mb-8 leading-relaxed font-light text-sm transition-all duration-500 ${condensed ? 'line-clamp-2' : 'line-clamp-3'}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-academic-bg text-academic-muted border border-academic-border text-[10px] uppercase tracking-widest font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    <button
                      onClick={(e) => handleProjectClick(String(project.id), project.slug, e)}
                      className="flex-grow basis-full md:basis-0 inline-block academic-button text-[10px] uppercase tracking-[0.2em] font-bold w-full text-center py-4 px-2"
                    >
                      Read Case Study
                    </button>
                    {project.link && (
                      <a
                        href={project.link}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow basis-full md:basis-0 inline-block bg-academic-bg text-academic-primary border border-academic-border hover:bg-academic-paper transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-bold text-center py-4 px-2"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!isLoading && projects.length > 2 && (
          <div className="mt-10 flex justify-center">
             <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs uppercase tracking-widest font-bold text-academic-muted hover:text-academic-primary transition-colors"
            >
              {showAll ? 'Show Fewer Projects' : `View All ${projects.length} Technical Works`}
            </button>
          </div>
        )}

        <div className="mt-10 flex justify-center border-t border-academic-border pt-10">
          <Link
            href="/projects"
            className="academic-button px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-4 group"
          >
            Review Full Archive
            <span className="w-8 h-px bg-academic-paper group-hover:w-12 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
