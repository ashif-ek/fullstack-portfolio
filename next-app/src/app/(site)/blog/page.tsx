import { Metadata } from 'next';
import { DataService } from '../../../services/dataService';
import { Blog } from '../../../types';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Full-Stack Engineering Journal | Ashif E.K – React & Django Authority',
    description: 'Expert insights on React 19, Django 5.x, scalable web architecture, and MVP development strategies for modern startups.',
};

export default async function BlogPage() {
    const blogs = await DataService.getBlogs();

    // Sort blogs: Pillar content first, then date
    const sortedBlogs = [...blogs].sort((a, b) => {
        const isAPillar = a.slug.includes('ultimate-guide') || a.slug.includes('blueprint');
        const isBPillar = b.slug.includes('ultimate-guide') || b.slug.includes('blueprint');
        if (isAPillar && !isBPillar) return -1;
        if (!isAPillar && isBPillar) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16 border-b border-academic-border pb-12">
                    <h1 className="text-5xl md:text-7xl font-bold text-academic-primary mb-6 uppercase tracking-tighter">
                        Engineering Journal
                    </h1>
                    <p className="text-academic-text/60 text-xl font-serif italic border-l-2 border-academic-primary/30 pl-6 py-2 max-w-2xl">
                        Deep dives into React 19, Django 5.x, and the architectural patterns that power high-scale digital products.
                    </p>
                </header>

                <div className="space-y-12">
                    {sortedBlogs.map((blog: Blog) => (
                        <article 
                            key={blog.id} 
                            className="group relative border-b border-academic-border pb-12 last:border-0"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                <h2 className="text-2xl md:text-3xl font-bold group-hover:text-academic-primary transition-colors">
                                    <Link href={`/blog/${blog.slug}`}>
                                        {blog.title}
                                    </Link>
                                </h2>
                                <div className="flex items-center gap-2 text-academic-muted text-sm shrink-0">
                                    <Calendar className="w-4 h-4" />
                                    <time dateTime={blog.date}>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                                </div>
                            </div>
                            <p className="text-academic-text/70 text-lg leading-relaxed mb-6 line-clamp-2">
                                {blog.summary}
                            </p>
                            <Link 
                                href={`/blog/${blog.slug}`}
                                className="inline-flex items-center gap-2 text-academic-primary font-bold uppercase tracking-widest text-sm hover:gap-3 transition-all"
                            >
                                Read Investigation <span>→</span>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
