'use client';

import React, { useMemo, useState, useRef } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useProjects } from '../../hooks/useProjects';
import { useCertificates } from '../../hooks/useCertificates';
import { Skeleton } from '../ui/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Code2, Award, Star, ExternalLink, Plus, GitMerge, ChevronRight } from 'lucide-react';
import { Project, Certificate, ExperienceItem } from '../../types';

const journeyMock = [
  {
    id: "journey-1",
    year: "2021",
    description: "Started learning software development by exploring and modifying open-source GitHub projects to understand how real-world applications are built."
  },
  {
    id: "journey-2",
    year: "2022",
    description: "Built my first original web applications while learning modern full-stack development technologies."
  },
  {
    id: "journey-3",
    year: "2025",
    description: "Joined Bridgeon Solutions as a Full-Stack Developer Intern."
  },
  {
    id: "journey-4",
    year: "2025",
    description: "Built several production-quality full-stack applications covering e-commerce, AI, enterprise workflows, authentication systems, and scalable backend architectures."
  },
  {
    id: "journey-5",
    year: "2026",
    description: "Building scalable SaaS platforms using React, Next.js, Django, FastAPI, PostgreSQL, Docker, AWS, and modern engineering practices."
  }
];

export default function Experience() {
  const { about: aboutData, isLoading: profileLoading } = useProfile();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: certificates, isLoading: certsLoading } = useCertificates();

  const [activeBranch, setActiveBranch] = useState<string | null>(null);
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const experienceList: ExperienceItem[] = useMemo(() => {
    if (!aboutData?.experience) return [];
    try {
      const parsed = JSON.parse(aboutData.experience);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }, [aboutData]);

  // Separate Education from Certifications
  const educationList = useMemo(() => {
    return (certificates || []).filter(c => c.category?.toLowerCase().includes('degree') || c.category?.toLowerCase().includes('education') || c.title.toLowerCase().includes('bachelor'));
  }, [certificates]);

  const certsList = useMemo(() => {
    return (certificates || []).filter(c => !(c.category?.toLowerCase().includes('degree') || c.category?.toLowerCase().includes('education') || c.title.toLowerCase().includes('bachelor')));
  }, [certificates]);

  const branches = [
    {
      id: 'work',
      title: 'Work Experience',
      icon: <Briefcase size={20} strokeWidth={1.5} />,
      subtitle: 'Roles, responsibilities & impact',
      content: (
        <div className="space-y-10 mt-6 pt-6 border-t border-academic-border/50">
          {experienceList.map((exp, idx) => (
            <div key={idx} className="relative">
              <h4 className="text-lg font-bold text-academic-primary">{exp.company}</h4>
              <p className="text-academic-primary font-medium text-sm mb-1">{exp.role}</p>
              <p className="text-academic-muted text-xs font-mono mb-4">{exp.period}</p>
              {exp.highlights && (
                <ul className="space-y-3 text-sm text-academic-muted font-light leading-relaxed">
                  {exp.highlights.map((h: string, hi: number) => (
                    <li key={hi} className="flex gap-3 items-start">
                      <span className="text-academic-accent mt-1 opacity-70 flex-shrink-0">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'education',
      title: 'Education',
      icon: <GraduationCap size={20} strokeWidth={1.5} />,
      subtitle: 'Academic journey & milestones',
      content: (
        <div className="space-y-10 mt-6 pt-6 border-t border-academic-border/50">
          {educationList.map((edu, idx) => (
            <div key={idx} className="relative">
              <h4 className="text-lg font-bold text-academic-primary">{edu.title}</h4>
              <p className="text-academic-primary font-medium text-sm mb-1">{edu.issuer}</p>
              <p className="text-academic-muted text-xs font-mono mb-4">{edu.date}</p>
              <p className="text-sm text-academic-muted font-light">{edu.description}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'certs',
      title: 'Certifications',
      icon: <Award size={20} strokeWidth={1.5} />,
      subtitle: 'Professional credentials & courses',
      content: (
        <div className="space-y-10 mt-6 pt-6 border-t border-academic-border/50">
          {certsList.map((cert, idx) => (
            <div key={idx} className="relative">
              <h4 className="text-lg font-bold text-academic-primary">{cert.title}</h4>
              <p className="text-academic-primary font-medium text-sm mb-1">{cert.issuer}</p>
              <p className="text-academic-muted text-xs font-mono mb-4">{cert.date}</p>
              <p className="text-sm text-academic-muted font-light">{cert.description}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'projects',
      title: 'Featured Projects',
      icon: <Code2 size={20} strokeWidth={1.5} />,
      subtitle: 'Showcase of major work',
      content: (
        <div className="space-y-10 mt-6 pt-6 border-t border-academic-border/50">
          {(projects || []).slice(0, 3).map((proj, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-lg font-bold text-academic-primary">{proj.title}</h4>
                {proj.link && proj.link !== '#' && (
                  <a href={proj.link} target="_blank" rel="noreferrer" className="text-academic-accent hover:opacity-80">
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
              <p className="text-sm text-academic-muted font-light mb-4">{proj.description}</p>
              <div className="flex flex-wrap gap-2">
                {proj.tags.map((t: string) => (
                  <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-academic-bg border border-academic-border text-academic-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'journey',
      title: 'Developer Journey',
      icon: <Star size={20} strokeWidth={1.5} />,
      subtitle: 'Growth from curiosity to professional software engineering.',
      content: (
        <div className="mt-6 pt-6 border-t border-academic-border/50 relative">
          <div className="absolute left-[7px] md:left-[13px] top-10 bottom-2 w-px bg-academic-border/60"></div>
          
          <div className="space-y-12">
            {journeyMock.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                <div className="absolute left-0 md:left-1.5 top-1.5 w-4 h-4 rounded-full bg-academic-bg border-2 border-academic-primary z-10"></div>
                
                <h4 className="text-xl font-bold text-academic-primary mb-3 font-mono">{item.year}</h4>
                <p className="text-sm text-academic-muted font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  const isLoading = profileLoading || projectsLoading || certsLoading;

  return (
    <section id="experience" className="py-24 md:py-32 bg-academic-bg text-academic-text border-t border-academic-border overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10" ref={containerRef}>
        
        {isLoading ? (
          <div className="space-y-4 max-w-xl mx-auto">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <div>
            <div className="mb-16">
              <span className="text-academic-accent text-xs font-mono font-bold tracking-widest uppercase mb-4 block">
                Journey Overview
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-academic-primary tracking-tight mb-6">
                Professional Tenure
              </h2>
              <p className="text-academic-muted text-lg font-light leading-relaxed">
                Explore my professional journey through an interactive roadmap.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8 relative">
              
              {/* LEFT COLUMN: Root Node */}
              <div className="lg:w-[340px] shrink-0 flex flex-col justify-center lg:sticky lg:top-1/3 z-20">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="academic-card relative bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 shadow-xl shadow-black/10 flex items-center justify-between group overflow-hidden hover:-translate-y-[2px] hover:border-white/20 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 mx-auto w-full max-w-[340px]"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-slate-400 group-hover:text-white transition-colors duration-500">
                      <GitMerge size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-snug">Professional Tenure</h3>
                      <p className="text-sm text-slate-400 font-mono mt-0.5">Root Node</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 text-slate-400">
                    <ChevronRight size={20} className="group-hover:translate-x-1 group-hover:text-white transition-transform duration-500" />
                  </div>
                </motion.div>
              </div>

              {/* SVG CONNECTORS & RIGHT COLUMN */}
              <div className="flex-1 relative flex">
                
                {/* SVG Spine Container (Desktop Only) */}
                <div className="hidden lg:block w-24 shrink-0 relative pointer-events-none z-0">
                  {/* Vertical Spine */}
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: 'calc(100% - 100px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    className="absolute left-10 top-16 w-[1.5px] bg-[#D8D8D8] rounded-full"
                  />
                  {/* Root to Spine Connector */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '40px' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
                    className="absolute left-0 top-16 h-[1.5px] bg-[#D8D8D8] rounded-full"
                  />
                </div>

                {/* Vertical Cards */}
                <div className="flex-1 flex flex-col gap-4 relative z-10">
                  {branches.map((branch, i) => {
                    const isActive = activeBranch === branch.id;
                    const isHovered = hoveredBranch === branch.id || isActive;
                    
                    return (
                      <motion.div 
                        key={branch.id}
                        className="relative flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + (i * 0.15) }}
                      >
                        {/* Horizontal Branch from Spine to Card (Desktop) */}
                        <div className="hidden lg:block absolute -left-14 top-10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '40px' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.6 + (i * 0.15), ease: 'easeOut' }}
                            className={`h-[1.5px] rounded-full transition-colors duration-300 ${isHovered ? 'bg-academic-accent' : 'bg-[#D8D8D8]'}`}
                          />
                        </div>

                        {/* Connection Node */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.8 + (i * 0.15) }}
                          className={`hidden lg:flex absolute -left-[23px] top-[35px] w-[10px] h-[10px] rounded-full bg-white border flex items-center justify-center transition-all duration-300 z-20 ${
                            isHovered ? 'scale-125 border-academic-accent' : 'border-[#D8D8D8]'
                          }`}
                        >
                          <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${isHovered ? 'bg-academic-accent' : 'bg-[#D8D8D8]'}`} />
                        </motion.div>

                        <div className="w-full md:w-[480px] lg:w-[520px]">
                          <motion.div 
                            layout
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setActiveBranch(isActive ? null : branch.id);
                              }
                            }}
                            onHoverStart={() => setHoveredBranch(branch.id)}
                            onHoverEnd={() => setHoveredBranch(null)}
                            className={`bg-academic-paper border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-academic-accent ${
                              isActive 
                                ? 'border-academic-accent/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] -translate-y-[2px]' 
                                : 'border-academic-border/60 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgb(0,0,0,0.04)] hover:border-academic-border'
                            }`}
                            onClick={() => setActiveBranch(isActive ? null : branch.id)}
                          >
                            <motion.div layout="position" className="py-4 px-6 flex items-center gap-5">
                              
                              {/* Icon */}
                              <div className={`w-12 h-12 shrink-0 rounded-full bg-academic-bg border border-academic-border/50 flex items-center justify-center transition-colors duration-300 ${isActive ? 'text-academic-accent' : 'text-academic-muted'}`}>
                                {branch.icon}
                              </div>
                              
                              {/* Title & Subtitle */}
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-academic-primary leading-tight">{branch.title}</h3>
                                <p className="text-sm text-academic-muted mt-1 font-light">{branch.subtitle}</p>
                              </div>
                              
                              {/* Expand Icon */}
                              <div className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${isActive ? 'border-academic-border text-academic-muted rotate-45' : 'border-transparent text-academic-muted hover:border-academic-border hover:bg-academic-bg'}`}>
                                <Plus size={16} />
                              </div>

                            </motion.div>

                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 pb-8 cursor-auto" onClick={(e) => e.stopPropagation()}>
                                    {branch.content}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
