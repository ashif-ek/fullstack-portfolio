import { Metadata } from 'next';
import { serverDataService as DataService } from '../../services/serverDataService';
import { Blog } from '../../lib/data/types';
import { JournalFeaturedArticle } from '../../components/journal/JournalFeaturedArticle';
import { JournalArticleCard } from '../../components/journal/JournalArticleCard';

export const metadata: Metadata = {
  title: 'Engineering Journal | Ashif E.K – High-Scale Systems & Architecture',
  description: 'Deep dives, architectural blueprints, and production engineering insights on React 19, Django 5.x, cloud infrastructure, and modern system design.',
  alternates: {
    canonical: 'https://journal.ashifek.in',
  },
  openGraph: {
    title: 'Engineering Journal | Ashif E.K',
    description: 'Deep dives, architectural blueprints, and production engineering insights.',
    url: 'https://journal.ashifek.in',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Journal | Ashif E.K',
    description: 'Deep dives, architectural blueprints, and production engineering insights.',
  },
};

export const revalidate = 3600;

export default async function JournalLandingPage() {
  const blogs = await DataService.getBlogs();

  // Sort blogs: Pillar content / newest first
  const sortedBlogs = [...blogs].sort((a, b) => {
    const isAPillar = a.slug.includes('ultimate-guide') || a.slug.includes('blueprint');
    const isBPillar = b.slug.includes('ultimate-guide') || b.slug.includes('blueprint');
    if (isAPillar && !isBPillar) return -1;
    if (!isAPillar && isBPillar) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const featuredArticle = sortedBlogs[0];
  const remainingArticles = sortedBlogs.slice(1);

  return (
    <div className="pt-12 sm:pt-16 pb-24 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Editorial Hero */}
        <header className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-academic-border bg-academic-paper text-[11px] font-mono uppercase tracking-widest text-academic-muted mb-6">
            <span>Volume MMXXVI</span>
            <span>•</span>
            <span>Peer-Grade Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-academic-primary mb-6">
            Engineering Journal
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-academic-muted leading-relaxed mb-6">
            Architectural blueprints, runtime investigations, and production case studies for engineers building high-scale digital products.
          </p>

          <div className="h-px w-16 bg-academic-accent mx-auto mb-6" />

          <p className="text-xs sm:text-sm font-mono text-academic-muted/80 max-w-xl mx-auto">
            Covering React 19, Django 5.x async engines, database scaling, microservices & zero-downtime operations.
          </p>
        </header>

        {/* Featured Article Section */}
        {featuredArticle && (
          <JournalFeaturedArticle article={featuredArticle} />
        )}

        {/* Article Collection Section */}
        <section>
          <div className="flex items-center justify-between pb-6 mb-10 border-b border-academic-border">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-academic-primary inline-block" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-academic-primary">
                All Published Investigations
              </h2>
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-academic-muted">
              {sortedBlogs.length} Articles Available
            </span>
          </div>

          {/* Responsive Editorial Grid: Mobile 1 col, Tablet 2 cols, Desktop 3 cols */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {remainingArticles.map((article: Blog, index: number) => (
              <JournalArticleCard
                key={article.id || article.slug}
                article={article}
                priority={index < 3}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
