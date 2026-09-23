'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CreativeLabItem } from '@prisma/client';
import { CreativeLabCard } from './CreativeLabCard';
import { CreativeLabViewer } from './CreativeLabViewer';

interface CreativeLabSectionProps {
  items: CreativeLabItem[];
}

export function CreativeLabSection({ items }: CreativeLabSectionProps) {
  const [selectedItem, setSelectedItem] = useState<CreativeLabItem | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 border-t border-academic-border" id="creative-lab">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-academic-primary font-bold mb-4">
              Creative Lab
            </h2>
            <p className="text-lg text-academic-text/80 max-w-2xl leading-relaxed">
              Experiments, AI visuals & ideas beyond the usual.
            </p>
          </div>
          <Link 
            href="/creative-lab"
            className="group flex items-center gap-2 text-academic-primary font-bold hover:text-academic-accent transition-colors pb-1 border-b-2 border-transparent hover:border-academic-accent uppercase tracking-widest text-sm"
          >
            VIEW ALL VIDEOS
            <span className="transform transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item, index) => (
            <div key={item.id} className={index >= 2 ? 'hidden md:block' : 'block'}>
              <CreativeLabCard 
                item={item} 
                onClick={setSelectedItem} 
              />
            </div>
          ))}
        </div>
      </div>
      
      <CreativeLabViewer 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </section>
  );
}
