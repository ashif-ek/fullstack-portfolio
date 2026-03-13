import { Metadata } from 'next';
import Api from '../../lib/api';
import { Blog } from '../../types';
import { blogs as MOCK_BLOGS } from '../../data/mockData';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Journal | Ashif EK – Full Stack Engineer',
    description: 'Insights on full-stack development, software architecture, and engineering management by Ashif EK.',
};

export default async function BlogPage() {
    let blogs = MOCK_BLOGS;

    try {
        const res = await Api.get('/blogs/');
        if (res.data) blogs = res.data;
    } catch (error) {
        console.error("Failed to fetch blogs, using mocks:", error);
    }

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-academic-primary mb-6 uppercase tracking-tighter">
                        Journal
                    </h1>
                    <p className="text-academic-text/60 text-xl font-serif italic border-l-2 border-academic-primary/30 pl-6 py-2">
                        Reflections on the craft of software engineering.
                    </p>
                </header>

                <div className="space-y-12">
                    {blogs.map((blog: Blog) => (
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
