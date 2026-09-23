import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

interface StandalonePageShellProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    lastUpdated?: string;
}

export default function StandalonePageShell({
    children,
    title,
    description,
    lastUpdated
}: StandalonePageShellProps) {
    return (
        <div className="min-h-screen bg-academic-bg text-academic-text flex flex-col font-sans">
            {/* Top Bar */}
            <header className="sticky top-0 z-50 w-full border-b border-academic-border bg-academic-bg/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link 
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-academic-text/70 hover:text-academic-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-academic-primary rounded-md px-2 py-1 -ml-2"
                        aria-label="Back to Home"
                    >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        <span>Back to Home</span>
                    </Link>
                    <div aria-label="Toggle Theme">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-12 md:py-16">
                <header className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-academic-primary mb-4">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-xl text-academic-muted max-w-2xl">
                            {description}
                        </p>
                    )}
                    {lastUpdated && (
                        <p className="text-sm text-academic-muted/70 mt-6 font-mono">
                            Last Updated: {lastUpdated}
                        </p>
                    )}
                </header>
                
                <div className="prose prose-invert prose-academic max-w-none text-academic-text/80 leading-relaxed prose-headings:text-academic-primary prose-a:text-academic-primary hover:prose-a:text-academic-primary/80">
                    {children}
                </div>
            </main>

            {/* Bottom Navigation */}
            <footer className="w-full border-t border-academic-border py-8 mt-auto bg-academic-bg">
                <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-academic-muted">
                        Legal & Information
                    </p>
                    <nav className="flex items-center gap-4 text-sm font-medium">
                        <Link 
                            href="/privacy" 
                            className="text-academic-text/70 hover:text-academic-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-academic-primary rounded-md px-2 py-1"
                        >
                            Privacy Policy
                        </Link>
                        <span className="text-academic-border" aria-hidden="true">&middot;</span>
                        <Link 
                            href="/terms" 
                            className="text-academic-text/70 hover:text-academic-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-academic-primary rounded-md px-2 py-1"
                        >
                            Terms & Conditions
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
