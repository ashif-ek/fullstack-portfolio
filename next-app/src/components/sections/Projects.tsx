'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProjects } from '../../hooks/useProjects';
import LazyImage from '../ui/LazyImage';
import { resolveAssetUrl } from '../../lib/api';
import { DataService } from '../../services/dataService';
import { Skeleton } from '../ui/Skeleton';

import project1 from '../../assets/projects/project1.png';
import { cn, buttonClasses, Button } from '../ui/Button';
import { Lightbox } from '../ui/Lightbox';

const getProjectImage = (project: any) => {
  if (project.image) return project.image;
  return project1.src; // Fallback
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

  const desiredOrder = ['workpilot-ai', 'cipher-analytics', 'noirel-ecommerce', 'system-design-sandbox'];
  const sortedProjects = [...projects].sort((a, b) => {
    const indexA = desiredOrder.findIndex(slug => (a.slug || '').includes(slug));
    const indexB = desiredOrder.findIndex(slug => (b.slug || '').includes(slug));
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  const displayedProjects = showAll ? sortedProjects : sortedProjects.slice(0, 4);

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
                className="group flex flex-col bg-academic-bg border border-academic-border overflow-hidden shadow-academic hover:shadow-paper transition-all duration-500 relative"
              >
                <div className="relative overflow-hidden h-64 border-b border-academic-border">
                  <Lightbox src={getProjectImage(project)} alt={project.title}>
                    <LazyImage
                      src={getProjectImage(project)}
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-academic-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </Lightbox>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-serif font-bold text-academic-primary group-hover:text-academic-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {(project.slug === 'cipher-analytics' || project.slug === 'noirel-ecommerce') && (
                    <div className="mb-4 py-1.5 px-3 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 animate-pulse" />
                      Interactive UI Demo (Backend offline for scheduled maintenance)
                    </div>
                  )}

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
                    <Button
                      onClick={(e) => handleProjectClick(String(project.id), project.slug, e)}
                      className="flex-grow basis-full md:basis-0 py-4 px-2 text-[10px] uppercase tracking-[0.2em] font-bold text-center w-full"
                    >
                      Read Case Study
                    </Button>
                    {project.link && (
                      <a
                        href={project.link}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonClasses, "flex-grow basis-full md:basis-0 py-4 px-2 text-[10px] uppercase tracking-[0.2em] font-bold text-center w-full")}
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
          <div className="mt-16 flex flex-col-reverse md:flex-row justify-between items-center gap-8 border-t border-academic-border pt-10">
            <Link
              href="/projects"
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-academic-muted transition-colors hover:text-academic-primary"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Review Full Archive
            </Link>

            <button
              onClick={() => setShowAll(!showAll)}
              className={cn(buttonClasses, "px-12 py-4 flex items-center gap-4 group text-[10px] uppercase tracking-[0.3em] font-bold")}
            >
              {showAll ? 'Show Fewer Projects' : `View All ${projects.length} Technical Works`}
              <span className="w-8 h-px bg-academic-paper group-hover:w-12 transition-all" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
