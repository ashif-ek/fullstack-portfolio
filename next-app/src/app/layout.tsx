import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { RecruiterProvider } from '../context/RecruiterContext';
import QueryProvider from '../providers/QueryProvider';
import { ThemeProvider } from '../providers/ThemeProvider';
import StatusBadge from '../components/ui/StatusBadge';
import VisitorTracker from '../components/ui/VisitorTracker';
import RecruiterBanner from '../components/ui/RecruiterBanner';

const baseUrl = 'https://www.ashifek.in';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ashif E.K | Full-Stack Engineer | React & Django Expert',
    template: '%s | Ashif E.K'
  },
  description: 'Ashif E.K – Full-Stack Engineer specializing in React, Django, and scalable web solutions. Explore high-performance projects, technical case studies, and modern architecture.',
  keywords: ['Ashif E.K', 'Full-Stack Engineer', 'Software Engineer', 'React Developer', 'Django Expert', 'Web Architecture', 'Portfolio', 'India'],
  authors: [{ name: 'Ashif E.K' }],
  creator: 'Ashif E.K',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/globe.svg',
    apple: '/globe.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'Ashif E.K | Full-Stack Engineer',
    description: 'Expert React & Django developer building secure, scalable, and high-performance web applications.',
    siteName: 'Ashif E.K Portfolio',
    images: [{ url: '/globe.svg', width: 1200, height: 630, alt: 'Ashif E.K Portfolio' }],
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
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts for LCP improvement */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
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
                  "image": `${baseUrl}/profile.jpg`,
                  "sameAs": [
                    "https://github.com/ashif-ek",
                    "https://linkedin.com/in/ashifek",
                    "https://instagram.com/ashif.io",
                    "http://www.fiverr.com/s/gDLy45X",
                    "https://ashif-ek.github.io/docs-stack-material/"
                  ],
                  "knowsAbout": ["React", "Django", "JavaScript", "Web Development", "UI/UX", "Redux", "Tailwind CSS", "HTML5", "CSS3", "Flutter", "Cybersecurity", "Cloud Architecture"],
                  "alumniOf": {
                    "@type": "CollegeOrUniversity",
                    "name": "University of Calicut"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": `${baseUrl}/#website`,
                  "url": baseUrl,
                  "name": "Ashif E.K Portfolio",
                  "description": "Full-Stack Engineer specializing in React, Django, and modern web solutions.",
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
