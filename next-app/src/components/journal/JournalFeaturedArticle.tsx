import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Blog } from '../../lib/data/types';
import { getJournalArticleMeta } from '../../lib/journalImages';

interface JournalFeaturedArticleProps {
  article: Blog;
}

export function JournalFeaturedArticle({ article }: JournalFeaturedArticleProps) {
  const meta = getJournalArticleMeta(article.slug, article.image, article.category, article.readTime);

  return (
    <section className="mb-20 md:mb-28">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-[2px] bg-academic-accent inline-block" />
        <span className="text-xs uppercase font-mono tracking-widest text-academic-accent font-bold">
          Featured Investigation
        </span>
      </div>

      <div className="group rounded-2xl border border-academic-border bg-academic-paper overflow-hidden shadow-academic hover:shadow-paper transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          {/* Cover Image */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] w-full overflow-hidden bg-academic-bg">
            <Image
              src={meta.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between h-full">
            <div>
              {/* Badges / Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-academic-muted mb-4 uppercase tracking-wider">
                <span className="px-2.5 py-1 rounded bg-academic-accent/10 text-academic-accent font-semibold">
                  {meta.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={String(article.date)}>
                    {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{meta.readTime}</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-academic-primary mb-4 leading-tight group-hover:text-academic-accent transition-colors duration-300">
                <Link href={`/blog/${article.slug}`} className="focus:outline-none focus:underline">
                  {article.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-academic-text/80 font-sans text-base sm:text-lg leading-relaxed line-clamp-3 mb-8">
                {article.excerpt}
              </p>
            </div>

            {/* Read Link */}
            <div>
              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-academic-primary group/link hover:text-academic-accent transition-colors duration-200"
              >
                <span>Read Full Investigation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

