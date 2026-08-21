import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import prisma from '../../lib/prisma';
import { CreativeLabGrid } from '../../components/creative-lab/CreativeLabGrid';
import { CreativeLabFeatured } from '../../components/creative-lab/CreativeLabFeatured';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../components/ui/ErrorFallback';

export const metadata: Metadata = {
  title: 'Creative Lab | Ashif',
  description: 'Experiments, AI visuals & ideas beyond the usual.',
  openGraph: {
    title: 'Creative Lab | Ashif',
    description: 'Experiments, AI visuals & ideas beyond the usual.',
    type: 'website',
  },
};

export const revalidate = 3600; // revalidate every hour if not triggered by on-demand revalidation

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
    <div className="min-h-screen bg-academic-bg pt-12 md:pt-16 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        
        <nav className="mb-10 md:mb-12">
          <Link 
            href="/" 
            className="group inline-flex items-center text-sm font-medium text-academic-muted hover:text-academic-primary transition-colors focus:outline-none focus:ring-2 focus:ring-academic-primary focus:ring-offset-4 focus:ring-offset-academic-bg rounded-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to home
          </Link>
        </nav>

        <header className="mb-16 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-2 flex flex-col pt-2 lg:pt-6">
            <span className="text-[10px] md:text-xs font-bold text-academic-muted uppercase tracking-widest mb-4 block">
              CREATIVE LAB / PERSONAL ARCHIVE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-academic-primary font-bold mb-6 lg:mb-8 whitespace-nowrap">
              Creative Lab
            </h1>
            <div>
              <p className="text-lg md:text-xl text-academic-primary leading-relaxed mb-4">
                A collection of experiments, visual ideas, and small things I build simply because I'm curious.
              </p>
              <p className="text-sm md:text-base text-academic-text/80 leading-relaxed border-l-2 border-academic-accent/30 pl-4 py-1">
                Not everything here needs to become a product.<br/>
                Some things are worth making just to see where the idea leads.
              </p>
            </div>
          </div>
          <div className="lg:col-span-3 w-full">
            <CreativeLabFeatured items={items.slice(0, 5)} />
          </div>
        </header>

        {/* Small editorial metadata row */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 py-6 border-y border-academic-border mb-24">
          <div className="flex flex-col">
            <span className="text-[10px] text-academic-muted uppercase tracking-widest font-bold">Total entries</span>
            <span className="text-sm text-academic-primary font-serif mt-1">{totalItems > 0 ? totalItems : '--'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-academic-muted uppercase tracking-widest font-bold">Categories</span>
            <span className="text-sm text-academic-primary font-serif mt-1">{uniqueCategories > 0 ? uniqueCategories : '--'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-academic-muted uppercase tracking-widest font-bold">Last updated</span>
            <span className="text-sm text-academic-primary font-serif mt-1">2026</span>
          </div>
        </div>

        {/* Why this exists */}
        <section className="mb-24 max-w-xl">
          <h2 className="text-sm font-bold text-academic-primary uppercase tracking-widest mb-6">
            Why this exists
          </h2>
          <div className="text-base text-academic-text/90 leading-relaxed space-y-4">
            <p>I like making things before I know exactly what they are for.</p>
            <p>Some experiments become projects.<br/>Some become ideas.<br/>Some simply teach me something I wouldn't have discovered otherwise.</p>
            <p>This is where I keep them.</p>
          </div>
        </section>

        {/* Currently exploring */}
        <section className="mb-32">
          <h2 className="text-sm font-bold text-academic-primary uppercase tracking-widest mb-6">
            Currently exploring
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-academic-text/80 max-w-2xl">
            <li className="flex items-start">
              <span className="text-academic-accent mr-3 mt-0.5">•</span>
              AI-generated short films
            </li>
            <li className="flex items-start">
              <span className="text-academic-accent mr-3 mt-0.5">•</span>
              Visual storytelling
            </li>
            <li className="flex items-start">
              <span className="text-academic-accent mr-3 mt-0.5">•</span>
              Human-centered interfaces
            </li>
            <li className="flex items-start">
              <span className="text-academic-accent mr-3 mt-0.5">•</span>
              Small experiments with absurd ideas
            </li>
            <li className="flex items-start md:col-span-2">
              <span className="text-academic-accent mr-3 mt-0.5">•</span>
              The space between engineering and creativity
            </li>
          </ul>
        </section>

        <section className="mb-24">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {items.length > 0 ? (
              <CreativeLabGrid items={items} />
            ) : (
              <div className="py-32 text-center border border-dashed border-academic-border bg-academic-paper">
                <h3 className="text-2xl font-serif text-academic-primary mb-4">Taking Shape</h3>
                <p className="text-academic-muted max-w-md mx-auto">
                  Creative Lab is still taking shape. Check back soon for experiments and visual explorations.
                </p>
              </div>
            )}
          </ErrorBoundary>
        </section>

        {/* Closing thought */}
        <footer className="pt-24 border-t border-academic-border text-center flex flex-col items-center">
          <h3 className="text-xl font-serif text-academic-primary mb-3">Still curious.</h3>
          <p className="text-academic-text/80 mb-10 text-sm">There will always be another idea worth testing.</p>
          <Link 
            href="/" 
            className="group inline-flex items-center text-sm font-medium text-academic-muted hover:text-academic-primary transition-colors focus:outline-none focus:ring-2 focus:ring-academic-primary focus:ring-offset-4 focus:ring-offset-academic-bg rounded-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to home
          </Link>
        </footer>

      </div>
    </div>
  );
}
