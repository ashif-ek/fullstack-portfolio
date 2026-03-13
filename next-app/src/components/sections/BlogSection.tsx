'use client';
import { useState } from "react";
import Link from "next/link";

import { useBlogs } from "../../hooks/useBlogs";

const BlogSection = () => {
  const { data: allPosts, isLoading } = useBlogs();
  const [showAll, setShowAll] = useState(false);

  const postsToShow = showAll ? allPosts : allPosts.slice(0, 3);

  return (
    <section id="blog" className="py-32 bg-academic-bg text-academic-text relative border-t border-academic-border">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="section-title">Publications & Technical Briefs</h2>
          <p className="text-academic-muted font-serif italic mt-2">Disseminating knowledge on architectural patterns and modern engineering methodology.</p>
        </div>

        <div className="space-y-12">
          {postsToShow.map((post) => (
            <article
              key={post.id}
              className="group grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-academic-border last:border-b-0"
            >
              {/* Date Column */}
              <div className="md:col-span-1 pt-2">
                <time className="text-[10px] uppercase tracking-[0.3em] font-bold text-academic-accent">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <div className="mt-2 h-px w-8 bg-academic-border group-hover:w-16 transition-all duration-500" />
              </div>

              {/* Content Column */}
              <div className="md:col-span-3 space-y-4">
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-2xl font-serif font-bold text-academic-primary group-hover:text-academic-accent transition-colors leading-tight">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-academic-muted font-light leading-relaxed line-clamp-2 text-sm">
                  {post.summary}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex gap-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-academic-paper border border-academic-border text-academic-muted">
                      Full-Stack Engineering
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-academic-primary hover:text-academic-accent transition-colors flex items-center gap-2"
                  >
                    Examine Brief &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/blog"
            className="text-xs uppercase tracking-[0.3em] font-bold text-academic-muted hover:text-academic-accent transition-colors border border-academic-border px-8 py-3 hover:bg-academic-paper"
          >
            Access Full Register ({allPosts.length})
          </Link>
        </div>
      </div >
    </section >
  );
};

export default BlogSection;
