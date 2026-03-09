import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-academic-bg font-sans">
            <nav className="bg-academic-paper border-b border-academic-border px-8 py-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-serif text-academic-primary italic font-bold">Ashif.E.K // Admin</h1>
                    <a href="/" className="text-xs uppercase tracking-widest text-academic-muted hover:text-academic-accent transition-colors font-bold">
                        Return to Public Portal
                    </a>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
}
