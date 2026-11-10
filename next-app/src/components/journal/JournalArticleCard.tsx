import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Blog } from '../../lib/data/types';
import { getJournalArticleMeta } from '../../lib/journalImages';

interface JournalArticleCardProps {
  article: Blog;
  priority?: boolean;
}

export function JournalArticleCard({ article, priority = false }: JournalArticleCardProps) {
  const meta = getJournalArticleMeta(article.slug, article.image, article.category, article.readTime);

  return (
    <article className="group flex flex-col h-full rounded-xl border border-academic-border bg-academic-paper overflow-hidden shadow-academic hover:shadow-paper transition-all duration-300">
      {/* Aspect-Ratio Governed Editorial Cover Frame */}
      <Link
        href={`/${article.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-academic-bg block focus:outline-none"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={meta.coverImage}
          alt={article.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold bg-academic-bg/90 backdrop-blur-sm text-academic-primary border border-academic-border">
            {meta.category}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Bar */}
          <div className="flex items-center gap-3 text-xs font-mono text-academic-muted mb-3">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={String(article.date)}>
                {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </time>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{meta.readTime}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-serif font-bold text-academic-primary mb-3 leading-snug group-hover:text-academic-accent transition-colors duration-200">
            <Link href={`/${article.slug}`} className="focus:outline-none focus:underline">
              {article.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-academic-text/75 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
            {article.excerpt}
          </p>
        </div>

        {/* Read Article Link */}
        <div className="pt-4 border-t border-academic-border/60">
          <Link
            href={`/${article.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-academic-primary group-hover:text-academic-accent transition-colors"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

