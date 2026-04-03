import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { RecruiterProvider } from '../context/RecruiterContext';
import QueryProvider from '../providers/QueryProvider';
import { ThemeProvider } from '../providers/ThemeProvider';
import StatusBadge from '../components/ui/StatusBadge';
import VisitorTracker from '../components/ui/VisitorTracker';
import RecruiterBanner from '../components/ui/RecruiterBanner';
import BackendInitializer from '../components/providers/BackendInitializer';

const baseUrl = 'https://www.ashifek.in';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ashif E.K | Full-Stack Engineer | React & Django Expert',
    template: '%s | Ashif E.K'
  },
  description: 'Ashif E.K – Full-Stack Engineer specializing in React, Django, and scalable web solutions. Explore high-performance projects, technical case studies, and modern architecture.',
  keywords: [
    'Ashif E.K', 
    'React 19 Developer Kochi', 
    'Django 5.x Expert Calicut', 
    'Full Stack Developer Trivandrum',
    'SaaS MVP Development Kerala', 
    'Startup Technical Strategy', 
    'Web Architecture Specialist', 
    'Custom Software Development India',
    'Modern Cloud Solutions'
  ],
  authors: [{ name: 'Ashif E.K' }],
  creator: 'Ashif E.K',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/profile-icon.jpg',
    apple: '/profile-icon.jpg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'Ashif E.K | Full-Stack Engineer',
    description: 'Expert React & Django developer building secure, scalable, and high-performance web applications.',
    siteName: 'Ashif E.K Portfolio',
    images: [{ url: '/profile-icon.jpg', width: 1200, height: 630, alt: 'Ashif E.K Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashif E.K | Full-Stack Engineer',
    description: 'Portfolio of Ashif E.K – React & Django expert creating modern web solutions.',
    images: ['/social-preview.png'],
    creator: '@ashif_io',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts for LCP improvement */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${baseUrl}/#person`,
                  "name": "Ashif E.K",
                  "jobTitle": "Full-Stack Engineer",
                  "description": "Specializing in React, Django, and high-performance web applications. Expert in building secure, scalable, and optimized digital experiences.",
                  "url": baseUrl,
                  "image": `${baseUrl}/profile-icon.jpg`,
                  "sameAs": [
                    "https://github.com/ashif-ek",
                    "https://linkedin.com/in/ashifek",
                    "https://instagram.com/ashif.io",
                    "http://www.fiverr.com/s/gDLy45X",
                    "https://ashif-ek.github.io/docs-stack-material/"
                  ],
                  "knowsAbout": ["React 19", "Django 5.x", "Micro-services", "Full-stack Engineering", "SaaS Architecture", "Performance Optimization", "Cloud-Native", "DevOps", "AI Integration", "Security Infrastructure", "MVP Strategy"],
                  "alumniOf": {
                    "@type": "CollegeOrUniversity",
                    "name": "University of Calicut"
                  },
                  "award": "Elite SEO & Performance Specialist"
                },
                {
                  "@type": "ProfessionalService",
                  "@id": `${baseUrl}/#service`,
                  "name": "Ashif E.K | Full-Stack Engineering Services",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Kochi",
                    "addressRegion": "Kerala",
                    "addressCountry": "IN"
                  },
                  "url": baseUrl,
                  "telephone": "+91-XXXXXXXXXX",
                  "priceRange": "$$",
                  "image": `${baseUrl}/profile-icon.jpg`,
                  "areaServed": ["Kerala", "India", "Global"]
                },
                {
                  "@type": "WebSite",
                  "@id": `${baseUrl}/#website`,
                  "url": baseUrl,
                  "name": "Ashif E.K | Full-Stack Engineering Authority",
                  "description": "Premium full-stack solutions with React and Django. Building the next generation of scalable SaaS.",
                  "publisher": {
                    "@id": `${baseUrl}/#person`
                  },
                  "inLanguage": "en-US"
                }
              ]
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased text-academic-text bg-academic-bg selection:bg-academic-primary/20 selection:text-academic-primary transition-colors duration-300">
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <RecruiterProvider>
              <RecruiterBanner />
              <AuthProvider>
                <BackendInitializer />
                <VisitorTracker />
                {children}
                <StatusBadge />
              </AuthProvider>
            </RecruiterProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
