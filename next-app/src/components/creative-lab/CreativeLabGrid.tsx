'use client';

import React, { useState } from 'react';
import { CreativeLabItem } from '@prisma/client';
import { CreativeLabCard } from './CreativeLabCard';
import { CreativeLabViewer } from './CreativeLabViewer';

interface CreativeLabGridProps {
  items: CreativeLabItem[];
}

export function CreativeLabGrid({ items }: CreativeLabGridProps) {
  const [selectedItem, setSelectedItem] = useState<CreativeLabItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <CreativeLabCard 
            key={item.id} 
            item={item} 
            onClick={setSelectedItem} 
          />
        ))}
      </div>
      
      <CreativeLabViewer 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
}
