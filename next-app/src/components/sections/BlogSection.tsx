import { useState } from "react";
import Link from "next/link";
import { useBlogs } from "../../hooks/useBlogs";
import { Skeleton } from "../ui/Skeleton";

const BlogSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pb-12 border-b border-academic-border last:border-b-0">
    <div className="md:col-span-2 pt-2">
      <Skeleton className="h-4 w-24" />
      <div className="mt-2 h-px w-8 bg-academic-border" />
    </div>
    <div className="md:col-span-4 h-48 md:h-32 lg:h-40">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="md:col-span-6 space-y-3 flex flex-col justify-center">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-12 w-full" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  </div>
);

const mockImages = [
  '/images/mock/image.png',
  '/images/mock/image copy.png',
  '/images/mock/image copy 2.png',
  '/images/mock/image copy 3.png',
  '/images/mock/image copy 4.png',
  '/images/mock/image copy 5.png',
  '/images/mock/image copy 6.png',
  '/images/mock/image copy 7.png',
  '/images/mock/image copy 8.png'
];

const BlogSection = () => {
  const { data: allPosts = [], isLoading } = useBlogs();
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
          {isLoading ? (
            <>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </>
          ) : (
            postsToShow.map((post, index) => (
              <article
                key={post.id}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pb-12 border-b border-academic-border last:border-b-0"
              >
                {/* Date Column */}
                <div className="md:col-span-2 pt-2">
                  <time className="text-[10px] uppercase tracking-[0.3em] font-bold text-academic-accent block mb-2">
                    {post.date ? new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    }) : "N/A"}
                  </time>
                  <div className="h-px w-8 bg-academic-border group-hover:w-16 transition-all duration-500" />
                </div>

                {/* Image Column */}
                <div className="md:col-span-4 relative h-48 md:h-32 lg:h-40 overflow-hidden border border-academic-border">
                  <Link href={`/blog/${post.slug}`} className="block w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={(post as any).imageUrl || post.image || mockImages[index % mockImages.length]} 
                      alt={post.title}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                  </Link>
                </div>

                {/* Content Column */}
                <div className="md:col-span-6 space-y-3 flex flex-col justify-center">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-academic-primary group-hover:text-academic-accent transition-colors leading-tight">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-academic-muted font-light leading-relaxed line-clamp-2 text-sm">
                    {post.excerpt || (post as any).summary}
                  </p>
                  <div className="flex items-center justify-between pt-2 mt-auto">
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-academic-paper border border-academic-border text-academic-muted">
                      Engineering
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-academic-primary hover:text-academic-accent transition-colors flex items-center gap-2"
                    >
                      Examine Brief &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {!isLoading && allPosts.length > 0 && (
          <div className="text-center mt-20">
            <Link
              href="/blog"
              className="text-xs uppercase tracking-[0.3em] font-bold text-academic-muted hover:text-academic-accent transition-colors border border-academic-border px-8 py-3 hover:bg-academic-paper"
            >
              Access Full Register ({allPosts.length})
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
