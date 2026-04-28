import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Blog } from '../../../../lib/data/types';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft } from 'lucide-react';
import { DataService } from '../../../../services/dataService';
import Breadcrumbs from '../../../../components/ui/Breadcrumbs';
import BlogCTA from '../../../../components/sections/BlogCTA';

interface BlogPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const allBlogs = await DataService.getBlogs();
    if (!allBlogs || allBlogs.length === 0) return [];

    return allBlogs
        .filter(b => b && b.slug)
        .map((blog: Blog) => ({
            slug: blog.slug,
        }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = await DataService.getBlogBySlug(slug);
    if (!blog) return {};

    return {
        title: `${blog.title} | Journal`,
        description: blog.excerpt,
        alternates: {
            canonical: `/blog/${blog.slug}`,
        },
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            type: 'article',
            url: `/blog/${blog.slug}`,
            publishedTime: String(blog.date),
            authors: ['Ashif E.K'],
            images: [
                { 
                    url: blog.image || '/blog-placeholder.png',
                    width: 1200,
                    height: 630,
                    alt: blog.title 
                }
            ],
            section: 'Software Engineering',
            tags: ['React 19', 'Django 5.x', 'Full Stack', 'Architecture'],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.excerpt,
            images: [blog.image || '/blog-placeholder.png'],
            creator: '@ashif_io',
        },
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const blog = await DataService.getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.excerpt,
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
                <Breadcrumbs />
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
                    {blog.image && (
                        <div className="relative rounded-2xl overflow-hidden border border-academic-border mb-12 shadow-2xl p-2 bg-academic-bg min-h-[400px]">
                            <Image
                                src={blog.image.startsWith('http') || blog.image.startsWith('/') ? blog.image : `/${blog.image}`}
                                alt={blog.title}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 p-2 rounded-2xl"
                                priority
                            />
                        </div>
                    )}
                    
                    <div className="text-academic-text/80 leading-relaxed space-y-6 text-lg">
                        <ReactMarkdown>
                            {blog.content}
                        </ReactMarkdown>
                    </div>
                </article>

                <BlogCTA />

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
