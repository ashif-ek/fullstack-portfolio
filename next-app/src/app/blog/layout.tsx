import React from 'react';
import { JournalHeader } from '../../components/journal/JournalHeader';
import { JournalFooter } from '../../components/journal/JournalFooter';

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-academic-bg text-academic-text selection:bg-academic-primary/20 selection:text-academic-primary transition-colors duration-300">
      <JournalHeader />
      <main className="flex-1 w-full">{children}</main>
      <JournalFooter />
    </div>
  );
}

