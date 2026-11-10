import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Blog } from '../../../lib/data/types';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, Bookmark } from 'lucide-react';
import { serverDataService as DataService } from '../../../services/serverDataService';
import { getJournalArticleMeta } from '../../../lib/journalImages';
import { JournalArticleCard } from '../../../components/journal/JournalArticleCard';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const allBlogs = await DataService.getBlogs();
  if (!allBlogs || allBlogs.length === 0) return [];

  return allBlogs
    .filter((b) => b && b.slug)
    .map((blog: Blog) => ({
      slug: blog.slug,
    }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await DataService.getBlogBySlug(slug);
  if (!blog) return {};

  const meta = getJournalArticleMeta(blog.slug, blog.image, blog.category, blog.readTime);

  return {
    title: `${blog.title} | Engineering Journal`,
    description: blog.excerpt,
    alternates: {
      canonical: `https://journal.ashifek.in/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      url: `https://journal.ashifek.in/${blog.slug}`,
      publishedTime: String(blog.date),
      authors: ['Ashif E.K'],
      images: [
        {
          url: meta.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      section: meta.category,
      tags: ['React 19', 'Django 5.x', 'Full Stack', 'Software Architecture', meta.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [meta.coverImage],
      creator: '@ashif_io',
    },
  };
}

export default async function JournalArticlePage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await DataService.getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await DataService.getBlogs();
  const relatedArticles = allBlogs
    .filter((b: Blog) => b.slug !== blog.slug)
    .slice(0, 3);

  const meta = getJournalArticleMeta(blog.slug, blog.image, blog.category, blog.readTime);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: meta.coverImage.startsWith('http') ? meta.coverImage : `https://journal.ashifek.in${meta.coverImage}`,
    datePublished: blog.date,
    author: {
      '@type': 'Person',
      name: 'Ashif E.K',
      url: 'https://www.ashifek.in',
    },
    publisher: {
      '@type': 'Person',
      name: 'Ashif E.K',
      url: 'https://www.ashifek.in',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://journal.ashifek.in/${blog.slug}`,
    },
  };

  return (
    <article className="pt-8 sm:pt-12 pb-24 md:pb-32 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb / Back to Journal */}
        <nav className="mb-8 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-academic-muted">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 hover:text-academic-primary transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Journal Index</span>
          </Link>
          <span className="hidden sm:inline-block">Volume MMXXVI / Technical Essay</span>
        </nav>

        {/* Article Editorial Header */}
        <header className="mb-12 border-b border-academic-border pb-10">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-academic-muted mb-6 uppercase tracking-wider">
            <span className="px-3 py-1 rounded bg-academic-accent/10 text-academic-accent font-semibold border border-academic-accent/20">
              {meta.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={String(blog.date)}>
                {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{meta.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-academic-primary leading-[1.15] tracking-tight mb-6">
            {blog.title}
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-academic-muted leading-relaxed max-w-3xl">
            {blog.excerpt}
          </p>
        </header>

        {/* Cover Image Feature */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-academic-border bg-academic-paper shadow-academic mb-12 sm:mb-16">
          <Image
            src={meta.coverImage}
            alt={blog.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-academic-primary prose-p:text-academic-text/85 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-a:text-academic-accent prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-code:text-academic-primary prose-code:bg-academic-paper prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-academic-border prose-pre:bg-academic-paper prose-pre:border prose-pre:border-academic-border prose-pre:rounded-xl prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:border-l-academic-accent prose-blockquote:text-academic-muted prose-img:rounded-xl">
            <ReactMarkdown>
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Author Colophon Box */}
          <div className="mt-16 p-8 rounded-2xl border border-academic-border bg-academic-paper shadow-academic flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-academic-border">
              <Image
                src="/profile-icon.jpg"
                alt="Ashif E.K"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif font-bold text-lg text-academic-primary">
                  Ashif E.K
                </h3>
                <span className="text-xs font-mono text-academic-muted">• Full-Stack Engineer</span>
              </div>
              <p className="text-sm text-academic-muted leading-relaxed font-sans mb-4">
                Specializing in high-performance React architectures, Django 5.x async systems, and production SaaS scaling.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono">
                <Link
                  href="https://www.ashifek.in"
                  className="text-academic-primary hover:text-academic-accent font-semibold underline underline-offset-4"
                >
                  Visit Engineering Portfolio
                </Link>
                <Link
                  href="/"
                  className="text-academic-muted hover:text-academic-primary"
                >
                  More Journal Articles →
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-20 pt-12 border-t border-academic-border">
              <div className="flex items-center gap-3 mb-8">
                <Bookmark className="w-5 h-5 text-academic-accent" />
                <h2 className="font-serif text-2xl font-bold text-academic-primary">
                  Further Investigations
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedArticles.map((rel: Blog) => {
                  const relMeta = getJournalArticleMeta(rel.slug, rel.image, rel.category, rel.readTime);
                  return (
                    <Link
                      key={rel.slug}
                      href={`/${rel.slug}`}
                      className="group p-5 rounded-xl border border-academic-border bg-academic-paper hover:shadow-paper transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-academic-accent font-semibold block mb-2">
                          {relMeta.category}
                        </span>
                        <h4 className="font-serif font-bold text-base text-academic-primary group-hover:text-academic-accent transition-colors line-clamp-2 mb-2">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-academic-muted line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-academic-primary mt-4 inline-block group-hover:translate-x-1 transition-transform">
                        Read →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Navigation Anchors */}
          <div className="mt-16 pt-8 border-t border-academic-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-academic-primary hover:text-academic-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Journal Index</span>
            </Link>

            <Link
              href="https://www.ashifek.in"
              className="text-xs font-mono uppercase tracking-wider text-academic-muted hover:text-academic-primary transition-colors"
            >
              Back to Main Portfolio
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
