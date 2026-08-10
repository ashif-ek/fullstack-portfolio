import React from 'react';
import { Metadata } from 'next';
import prisma from '../../lib/prisma';
import { CreativeLabGrid } from '../../components/creative-lab/CreativeLabGrid';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../components/ui/ErrorFallback';

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

  return (
    <div className="min-h-screen bg-academic-bg pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-serif text-academic-primary font-bold mb-6">
            Creative Lab
          </h1>
          <p className="text-xl text-academic-text/80 max-w-2xl leading-relaxed border-l-4 border-academic-accent pl-6 py-2">
            Experiments, AI visuals & ideas beyond the usual. A space for visual explorations and things I build just because I’m curious.
          </p>
        </header>

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
      </div>
    </div>
  );
}
