'use client';
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { blogs as mockBlogs } from "../../../data/mockData";
import LazyImage from "../../ui/LazyImage";
import { Blog } from "../../../types";


/*  Main BlogPost Component */
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  // Hybrid Data Strategy: Init with mock, update with BFF/Prisma
  const initialPost = mockBlogs.find((candidate) => candidate.slug === slug) || null;
  const [post, setPost] = useState<Blog | null>(initialPost);
  const [error, setError] = useState(!initialPost);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/data/blogs')
      .then(res => res.json())
      .then((blogs: Blog[]) => {
        if (!isMounted) return;

        const found = blogs.find((b: Blog) => b.slug === slug);
        if (found) {
          setPost(found);
          setError(false);
          return;
        }

        setPost(null);
        setError(true);
      })
      .catch((err) => {
        if (!isMounted) return;

        console.error("Failed to fetch fresh post", err);
        setPost((previous) => previous ?? initialPost);
        setError(!initialPost);
      });

    return () => {
      isMounted = false;
    };
  }, [initialPost, slug]);

  const formattedDate = useMemo(() => {
    if (!post?.date) return "";
    return new Date(post.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [post]);



  /* ❌ Error / Not Found */
  if (error || !post) {
    return (
      <div className="min-h-screen bg-academic-bg text-academic-text flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-serif font-light mb-4 italic text-academic-primary">Publication not found</h1>
        <Link
          href="/#blog"
          className="relative z-50 inline-flex items-center text-xs uppercase tracking-widest font-bold text-academic-muted hover:text-academic-accent transition-colors duration-200 group pointer-events-auto"
        >
          <svg
            className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Return to Archives
        </Link>
      </div>
    );
  }

  /*  Main Render */
  return (
    <div className="min-h-screen bg-academic-paper text-academic-text font-sans">
      <div className="container mx-auto px-6 max-w-3xl py-12 lg:py-24">
        {/* --- Back Button (Always clickable) --- */}
        <div className="relative z-50 mb-12 mt-8 pointer-events-auto">
          <Link
            href="/#blog"
            className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-academic-muted hover:text-academic-accent transition-colors duration-200 group"
          >
            <svg
              className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return to Archives
          </Link>
        </div>

        {/* --- Article Header --- */}
        <header className="mb-12 border-b border-academic-border pb-8">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-academic-primary mb-4 leading-tight italic">
            {post.title}
          </h1>
          <time className="block text-[10px] uppercase tracking-[0.2em] text-academic-muted font-bold">
            {formattedDate}
          </time>
        </header>

        {/* --- Featured Image --- */}
        {post.imageUrl && (
          /*  This wrapper provides the border, shape, and shadow */
          <div className="mb-16 border border-academic-border bg-academic-bg shadow-paper p-2">
            <LazyImage src={post.imageUrl} alt={post.title} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        )}

        {/* --- Markdown Content --- */}
        <article
          className="prose max-w-none
                     prose-p:text-academic-muted prose-p:leading-loose prose-p:font-light
                     prose-headings:font-serif prose-headings:text-academic-primary prose-headings:font-bold
                     prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                     prose-h1:mt-12 prose-h2:mt-10 prose-h3:mt-8
                     prose-a:text-academic-accent hover:prose-a:text-academic-primary prose-a:underline prose-a:underline-offset-4
                     prose-code:bg-academic-bg prose-code:text-academic-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:border prose-code:border-academic-border prose-code:text-sm
                     prose-pre:bg-academic-bg prose-pre:border prose-pre:border-academic-border prose-pre:shadow-sm prose-pre:text-sm prose-pre:p-6
                     prose-hr:border-academic-border prose-hr:my-12
                     prose-ul:text-academic-muted prose-ol:text-academic-muted prose-li:text-academic-muted
                     prose-blockquote:border-l-4 prose-blockquote:border-academic-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-academic-primary
                     prose-img:border prose-img:border-academic-border prose-img:p-2 prose-img:bg-academic-bg prose-img:grayscale hover:prose-img:grayscale-0 prose-img:transition-all prose-img:duration-700"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* --- Footer Back Link--- */}
        <div className="mt-20 pt-10 border-t border-academic-border relative z-50 pointer-events-auto flex justify-center">
          <Link
            href="/#blog"
            className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-academic-muted hover:text-academic-accent transition-colors duration-200 group"
          >
            <svg
              className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return to Archives
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
