import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogs as MOCK_BLOGS } from '../../../../data/mockData';
import { Blog } from '../../../../types';
import Api from '../../../../lib/api';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';

interface BlogPageProps {
    params: {
        slug: string;
    };
}

async function getLiveBlogs(): Promise<Blog[]> {
    try {
        const { data } = await Api.get('/blogs/');
        if (data && data.length > 0) return data;
    } catch (error) {
        console.error("Failed to fetch live blogs:", error);
    }
    return MOCK_BLOGS;
}

export async function generateStaticParams() {
    const allBlogs = await getLiveBlogs();
    return allBlogs.map((blog: Blog) => ({
        slug: blog.slug,
    }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const allBlogs = await getLiveBlogs();
    const blog = allBlogs.find((b: Blog) => b.slug === params.slug);
    if (!blog) return {};

    return {
        title: `${blog.title} | Blog`,
        description: blog.summary,
        openGraph: {
            title: blog.title,
            description: blog.summary,
            type: 'article',
            publishedTime: blog.date,
            authors: ['Ashif E.K'],
            images: [{ url: blog.imageUrl || '/blog-placeholder.png' }],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.summary,
        },
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const allBlogs = await getLiveBlogs();
    const blog = allBlogs.find((b: Blog) => b.slug === params.slug);

    if (!blog) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.summary,
        "datePublished": blog.date,
        "author": {
            "@type": "Person",
            "name": "Ashif E.K"
        },
        "url": `https://www.ashifek.in/blog/${blog.slug}`
    };

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-16 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-academic-primary hover:underline mb-12 group transition-all uppercase text-xs font-bold tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Journal
                </Link>

                <header className="mb-12 border-b border-academic-border pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-academic-primary leading-tight">
                        {blog.title}
                    </h1>
                    <div className="flex items-center gap-2 text-academic-muted text-sm font-mono uppercase tracking-widest">
                        <Calendar className="w-4 h-4" />
                        {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </header>

                <article className="prose prose-invert prose-academic max-w-none">
                    {blog.imageUrl && (
                        <div className="rounded-2xl overflow-hidden border border-academic-border mb-12 shadow-2xl p-2 bg-academic-bg">
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    )}
                    
                    <div className="text-academic-text/80 leading-relaxed space-y-6 text-lg">
                        <ReactMarkdown>
                            {blog.content}
                        </ReactMarkdown>
                    </div>
                </article>

                <footer className="mt-20 pt-10 border-t border-academic-border flex justify-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-academic-primary hover:underline group transition-all uppercase text-xs font-bold tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Return to Archives
                    </Link>
                </footer>
            </div>
        </main>
    );
}
