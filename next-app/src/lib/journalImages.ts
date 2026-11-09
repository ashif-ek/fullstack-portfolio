/**
 * Editorial Cover Image Registry for the Engineering Journal
 * Maps each article topic to an appropriate, highly relevant, optimized visual asset.
 * Falls back gracefully to curated topic-aligned imagery.
 */

// Categorized curated imagery from existing assets and topic-specific visual palettes
const TOPIC_IMAGE_MAP: Record<string, { image: string; category: string; readTime: string }> = {
  // 1. Architecture & Scaling
  'scalable-architecture-django-react': {
    image: '/images/mock/image.png',
    category: 'Architecture',
    readTime: '8 min read',
  },
  'scaling-to-1m-users': {
    image: '/images/mock/image copy 7.png',
    category: 'High-Scale Systems',
    readTime: '11 min read',
  },
  'microservices-django-rest': {
    image: '/images/mock/image copy 5.png',
    category: 'Distributed Systems',
    readTime: '9 min read',
  },
  'postgresql-vs-mongodb-scaling': {
    image: '/images/mock/image copy 4.png',
    category: 'Databases & Storage',
    readTime: '10 min read',
  },
  'building-scalable-saas-mvp': {
    image: '/images/mock/image.png',
    category: 'SaaS Engineering',
    readTime: '9 min read',
  },
  'scalable-mvp-blueprint-startups-2026': {
    image: '/images/mock/image copy 7.png',
    category: 'Technical Strategy',
    readTime: '12 min read',
  },

  // 2. React & Frontend Core
  'react-19-django-5-ultimate-guide': {
    image: '/images/mock/image copy 6.png',
    category: 'Full-Stack Blueprint',
    readTime: '14 min read',
  },
  'react-server-components-guide': {
    image: '/images/mock/image copy 6.png',
    category: 'React Internals',
    readTime: '8 min read',
  },
  'react-state-patterns-enterprise-saas': {
    image: '/images/mock/image copy 2.png',
    category: 'State Architecture',
    readTime: '10 min read',
  },
  'understanding-react-hooks': {
    image: '/images/mock/image copy 5.png',
    category: 'React Core',
    readTime: '7 min read',
  },
  'state-management-react-2026': {
    image: '/images/mock/image copy 8.png',
    category: 'State Architecture',
    readTime: '8 min read',
  },
  'advanced-redux-patterns-middleware': {
    image: '/images/mock/image copy 4.png',
    category: 'Advanced React',
    readTime: '9 min read',
  },

  // 3. Performance & Design Systems
  'optimizing-nextjs-performance': {
    image: '/images/mock/image copy.png',
    category: 'Performance',
    readTime: '8 min read',
  },
  'nextjs-performance-seo': {
    image: '/images/mock/image copy.png',
    category: 'Core Web Vitals & SEO',
    readTime: '7 min read',
  },
  'tailwind-css-4-next-gen': {
    image: '/images/mock/image copy 3.png',
    category: 'Design Systems',
    readTime: '6 min read',
  },

  // 4. Backend, Security & Real-Time
  'django-best-practices-production': {
    image: '/images/mock/image copy 3.png',
    category: 'Backend Security',
    readTime: '9 min read',
  },
  'secure-django-production': {
    image: '/images/mock/image copy.png',
    category: 'Security Hardening',
    readTime: '10 min read',
  },
  'mastering-jwt-auth': {
    image: '/images/mock/image copy 6.png',
    category: 'Authentication & Cryptography',
    readTime: '11 min read',
  },
  'django-channels-real-time': {
    image: '/images/mock/image copy 2.png',
    category: 'WebSockets & Concurrency',
    readTime: '8 min read',
  },
  'ai-integration-python-django': {
    image: '/images/mock/image copy 2.png',
    category: 'AI & Machine Learning',
    readTime: '9 min read',
  },

  // 5. DevOps, Cloud & Ecosystem
  'automate-deployments-github-aws': {
    image: '/images/mock/image copy 4.png',
    category: 'DevOps & CI/CD',
    readTime: '8 min read',
  },
  'cloud-deployment-kerala': {
    image: '/images/mock/image copy 7.png',
    category: 'Cloud Infrastructure',
    readTime: '7 min read',
  },
  'software-development-trends-kochi': {
    image: '/images/mock/image.png',
    category: 'Industry Analysis',
    readTime: '6 min read',
  },
  'hire-full-stack-developer-kerala': {
    image: '/images/mock/image copy 8.png',
    category: 'Engineering Leadership',
    readTime: '8 min read',
  },
  'custom-web-app-calicut': {
    image: '/images/mock/image copy 5.png',
    category: 'Product Strategy',
    readTime: '7 min read',
  },
  'ecommerce-development-kerala': {
    image: '/images/mock/image copy 3.png',
    category: 'E-Commerce Platforms',
    readTime: '9 min read',
  },
};

export interface JournalArticleMeta {
  coverImage: string;
  category: string;
  readTime: string;
}

/**
 * Resolves verified cover image, category, and reading time for any blog article.
 */
export function getJournalArticleMeta(slug: string, rawImage?: string | null, rawCategory?: string | null, rawReadTime?: string | null): JournalArticleMeta {
  const mapped = TOPIC_IMAGE_MAP[slug];

  // Prioritize explicit non-null database/schema cover image
  const coverImage = (rawImage && rawImage.trim() !== '' && rawImage !== '/blog-placeholder.png')
    ? (rawImage.startsWith('http') || rawImage.startsWith('/') ? rawImage : `/${rawImage}`)
    : (mapped?.image || '/images/mock/image.png');

  const category = (rawCategory && rawCategory.trim() !== '' && rawCategory !== 'General')
    ? rawCategory
    : (mapped?.category || 'Engineering');

  const readTime = (rawReadTime && rawReadTime.trim() !== '')
    ? rawReadTime
    : (mapped?.readTime || '7 min read');

  return { coverImage, category, readTime };
}

