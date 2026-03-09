'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjects } from '../../hooks/useProjects';
import LazyImage from '../ui/LazyImage';
import Api, { resolveAssetUrl } from '../../lib/api';

const projectImages: Record<string, string> = {
  '1': "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
  '2': "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  '3': "https://images.unsplash.com/photo-1499750310159-5254f4cc65af?auto=format&fit=crop&q=80&w=800",
  '4': "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
};

const Projects = () => {
  const { data: projects = [] } = useProjects();
  const router = useRouter();

  const projectOrder = ["noirel", "civic", "blog", "salary", "timelens"];

  const sortedProjects = [...projects].sort((a, b) => {
    const getIndex = (title: string) => {
      const lowerTitle = title.toLowerCase();
      for (let i = 0; i < projectOrder.length; i++) {
        if (lowerTitle.includes(projectOrder[i])) return i;
      }
      return projectOrder.length;
    };
    return getIndex(a.title) - getIndex(b.title);
  });

  const handleProjectClick = async (projectId: string, projectSlug: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await Api.post(`/projects/${projectId}/click/`);
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
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col bg-academic-bg border border-academic-border overflow-hidden shadow-academic hover:shadow-paper transition-all duration-500 cursor-pointer"
              onClick={(e) => handleProjectClick(project.id, project.slug, e)}
            >
              <div className="relative overflow-hidden h-64 border-b border-academic-border">
                {/** Prefer curated placeholders, fallback to backend image when available. */}
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

                <p className="text-academic-muted mb-8 leading-relaxed font-light text-sm line-clamp-3">
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
                    onClick={(e) => handleProjectClick(project.id, project.slug, e)}
                    aria-label={`Read case study for ${project.title}`}
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
                  {project.github && (
                    <a
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow basis-full md:basis-0 inline-block bg-academic-bg text-academic-primary border border-academic-border hover:bg-academic-paper transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-bold text-center py-4 px-2"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
