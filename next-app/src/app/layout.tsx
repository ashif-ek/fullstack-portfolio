import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import QueryProvider from '../providers/QueryProvider';
import StatusBadge from '../components/ui/StatusBadge';
import VisitorTracker from '../components/ui/VisitorTracker';

export const metadata: Metadata = {
  title: 'Ashif E.K | Full-Stack Engineer | React & Django Portfolio',
  description: 'Ashif E.K – Full-Stack Engineer specializing in React, Django, and modern web solutions. Explore projects, skills, and achievements.',
  keywords: ['Ashif E.K', 'Portfolio', 'React', 'Django', 'Web Development', 'Software Engineer', 'Full-Stack Engineer'],
  authors: [{ name: 'Ashif E.K' }],
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {

    type: 'website',
    title: 'Ashif E.K | Full-Stack Engineer',
    description: "Explore Ashif E.K's portfolio – React & Django expert creating modern web solutions.",
    url: 'https://ashif-ek.vercel.app/',
    siteName: 'Ashif E.K Portfolio',
    images: [{ url: 'https://ashif-ek.vercel.app/social-preview.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashif E.K | Full-Stack Engineer',
    description: 'Portfolio of Ashif E.K – React & Django expert creating modern web solutions.',
    images: ['https://ashif-ek.vercel.app/social-preview.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://ashif-ek.vercel.app/#person",
                  "name": "Ashif E.K",
                  "jobTitle": "Full-Stack Engineer",
                  "description": "I specialize in React, Django, Redux, javascript, html css tailwind to building secure, scalable, and high-performance applications that solve complex problems and deliver exceptional user experiences.",
                  "url": "https://ashif-ek.vercel.app/",
                  "image": "https://ashif-ek.vercel.app/profile.jpg",
                  "sameAs": [
                    "https://github.com/ashif-ek",
                    "https://linkedin.com/in/ashifek",
                    "https://instagram.com/ashif.io",
                    "http://www.fiverr.com/s/gDLy45X",
                    "https://ashif-ek.github.io/docs-stack-material/"
                  ],
                  "knowsAbout": ["React", "Django", "JavaScript", "Web Development", "UI/UX", "Redux", "Tailwind CSS", "HTML5", "CSS3", "Flutter", "Cybersecurity"],
                  "alumniOf": {
                    "@type": "CollegeOrUniversity",
                    "name": "University of Calicut"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://ashif-ek.vercel.app/#website",
                  "url": "https://ashif-ek.vercel.app/",
                  "name": "Ashif E.K Portfolio",
                  "description": "Full-Stack Engineer specializing in React, Django, and modern web solutions.",
                  "publisher": {
                    "@id": "https://ashif-ek.vercel.app/#person"
                  },
                  "inLanguage": "en-US"
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://ashif-ek.vercel.app/#service",
                  "url": "https://ashif-ek.vercel.app/",
                  "name": "Ashif E.K - Full-Stack Engineer",
                  "description": "Professional web development and software engineering services.",
                  "priceRange": "$$",
                  "image": "https://ashif-ek.vercel.app/profile.jpg",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "IN"
                  },
                  "founder": {
                    "@id": "https://ashif-ek.vercel.app/#person"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <QueryProvider>
          <AuthProvider>
            <VisitorTracker />
            {children}
            <StatusBadge />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
