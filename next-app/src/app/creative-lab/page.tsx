import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Compass, Sparkles } from 'lucide-react';
import prisma from '../../lib/prisma';
import { CreativeLabGrid } from '../../components/creative-lab/CreativeLabGrid';
import { CreativeLabFeatured } from '../../components/creative-lab/CreativeLabFeatured';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../components/ui/ErrorFallback';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

export const metadata: Metadata = {
  title: 'Creative Lab | Ashif E.K – AI Visuals, Creative Code & Experiments',
  description: 'A curated digital atelier of generative visuals, creative engineering, interactive prototypes, and aesthetic explorations.',
  alternates: {
    canonical: 'https://lab.ashifek.in',
  },
  openGraph: {
    title: 'Creative Lab | Ashif E.K',
    description: 'A curated digital atelier of generative visuals, creative engineering, and aesthetic explorations.',
    url: 'https://lab.ashifek.in',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Lab | Ashif E.K',
    description: 'A curated digital atelier of generative visuals and creative engineering.',
  },
};

export const revalidate = 3600;

async function getCreativeLabItems() {
  try {
    return await prisma.creativeLabItem.findMany({
      where: { published: true },
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });
  } catch (error) {
    console.error("Failed to fetch creative lab items:", error);
    return [];
  }
}

export default async function CreativeLabPage() {
  const items = await getCreativeLabItems();
  
  const totalItems = items.length;
  const uniqueCategories = new Set(items.map(item => item.category)).size;

  return (
    <div className="min-h-screen flex flex-col bg-academic-bg text-academic-text selection:bg-academic-primary/20 selection:text-academic-primary transition-colors duration-300">
      
      {/* 1. Header: Minimal, Sticky, Pixel-Aligned */}
      <header className="w-full border-b border-academic-border/70 bg-academic-bg/95 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link 
            href="https://www.ashifek.in" 
            className="group inline-flex items-center text-xs md:text-sm font-medium tracking-wide text-academic-muted hover:text-academic-primary transition-colors focus:outline-none focus:ring-2 focus:ring-academic-primary focus:ring-offset-2 rounded-sm"
            aria-label="Back to Ashif E.K Portfolio Home"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col items-center">
            <span className="font-serif text-base md:text-lg font-bold tracking-tight text-academic-primary">
              Creative Lab
            </span>
            <span className="text-[9px] md:text-[10px] uppercase font-mono tracking-widest text-academic-muted/80">
              Personal Archive / Atelier
            </span>
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-10 sm:pt-14 pb-24 md:pb-32">
        
        {/* 2. Hero Section: Refined 2-Column Composition */}
        <section className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Editorial Manifesto & Typography */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-academic-border bg-academic-paper text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-academic-muted mb-6 w-fit">
                <Sparkles className="w-3 h-3 text-academic-accent" />
                <span>Explorations & Experiments</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-academic-primary tracking-tight leading-[1.1] mb-6">
                Creative Lab
              </h1>

              <p className="text-base sm:text-lg font-serif italic text-academic-muted leading-relaxed mb-6">
                A digital atelier for experiments, generative visuals, and interactive curiosities built beyond standard commercial constraints.
              </p>

              <div className="border-l-2 border-academic-accent/40 pl-4 py-1.5 text-xs sm:text-sm text-academic-text/85 leading-relaxed bg-academic-paper/40 rounded-r-md">
                Not everything here needs to become a product. Some things are worth engineering simply to discover where the idea leads.
              </div>
            </div>

            {/* Right Column: Featured Carousel Experience */}
            <div className="lg:col-span-7 w-full">
              <CreativeLabFeatured items={items.slice(0, 5)} />
            </div>

          </div>
        </section>

        {/* 3. Archival Metadata Matrix Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-academic-border mb-16 md:mb-24 bg-academic-paper/50 rounded-lg px-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-academic-muted uppercase tracking-widest font-semibold">Archived Works</span>
            <span className="text-lg font-serif font-bold text-academic-primary mt-1">{totalItems > 0 ? totalItems : '--'} Entries</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-academic-muted uppercase tracking-widest font-semibold">Domains</span>
            <span className="text-lg font-serif font-bold text-academic-primary mt-1">{uniqueCategories > 0 ? `${uniqueCategories} Disciplines` : '--'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-academic-muted uppercase tracking-widest font-semibold">Mediums</span>
            <span className="text-lg font-serif font-bold text-academic-primary mt-1">AI Video & Code</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-academic-muted uppercase tracking-widest font-semibold">Edition</span>
            <span className="text-lg font-serif font-bold text-academic-primary mt-1">2026 Archive</span>
          </div>
        </div>

        {/* 4. Atelier Curatorial Statement */}
        <section className="mb-20 md:mb-28 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[2px] bg-academic-accent inline-block" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-academic-accent font-bold">
              Curatorial Statement
            </h2>
          </div>

          <div className="text-sm sm:text-base text-academic-text/85 leading-relaxed space-y-4 font-serif">
            <p>
              Engineering often demands deterministic predictability. The Creative Lab represents the deliberate counterweight: a space where curiosity leads, intuition guides, and technical tools are pushed beyond their intended boundaries.
            </p>
            <p className="font-sans text-xs sm:text-sm text-academic-muted">
              Here you will find AI-directed visual explorations, kinetic typography, creative shader shaders, and prototypes exploring the tactile intersection of human emotion and computing machinery.
            </p>
          </div>
        </section>

        {/* 5. Experiment Collection Gallery */}
        <section className="mb-24 md:mb-32">
          <div className="flex items-center justify-between pb-5 mb-8 sm:mb-10 border-b border-academic-border">
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-academic-primary" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-academic-primary">
                Atelier Collection
              </h2>
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-academic-muted">
              {items.length} Explorations
            </span>
          </div>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {items.length > 0 ? (
              <CreativeLabGrid items={items} />
            ) : (
              <div className="py-24 text-center border border-dashed border-academic-border bg-academic-paper rounded-xl">
                <h3 className="text-2xl font-serif text-academic-primary mb-3">Taking Shape</h3>
                <p className="text-academic-muted text-sm max-w-md mx-auto">
                  New creative code and generative media items are currently being processed in the pipeline.
                </p>
              </div>
            )}
          </ErrorBoundary>
        </section>

      </main>

      {/* 6. Footer: Minimal, Symmetrical Colophon */}
      <footer className="w-full border-t border-academic-border/70 bg-academic-bg text-academic-text py-12 md:py-16 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link 
            href="https://www.ashifek.in" 
            className="group inline-flex items-center text-xs md:text-sm font-medium tracking-wide text-academic-muted hover:text-academic-primary transition-colors focus:outline-none focus:ring-2 focus:ring-academic-primary focus:ring-offset-2 rounded-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <div className="text-center">
            <p className="font-serif text-sm text-academic-primary font-medium">
              Creative Lab / Atelier
            </p>
            <p className="text-xs text-academic-muted font-sans mt-0.5">
              Experiments in computational aesthetics and generative media.
            </p>
          </div>

          <div className="text-xs text-academic-muted font-mono tracking-wider">
            © {new Date().getFullYear()} / Ashif E.K
          </div>
        </div>
      </footer>

    </div>
  );
}
