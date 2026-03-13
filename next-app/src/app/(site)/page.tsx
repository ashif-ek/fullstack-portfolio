'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "../../context/AuthContext";
import { useRecruiterMode } from "../../context/RecruiterContext";
import Hero from "../../components/sections/Hero";
import Api, { API_BASE_URL } from "../../lib/api";

const About = dynamic(() => import("../../components/sections/About"), { ssr: false });
const Skills = dynamic(() => import("../../components/sections/Skills"), { ssr: false });
const Projects = dynamic(() => import("../../components/sections/Projects"), { ssr: false });
const Certificates = dynamic(() => import("../../components/sections/Certificates"), { ssr: false });
const Contacts = dynamic(() => import("../../components/sections/Contacts"), { ssr: false });
const BlogSection = dynamic(() => import("../../components/sections/BlogSection"), { ssr: false });
const Services = dynamic(() => import("../../components/sections/Services"), { ssr: false });
const GithubActivity = dynamic(() => import("../../components/sections/GithubActivity"), { ssr: false });
const RecruiterCTA = dynamic(() => import("../../components/sections/RecruiterCTA"), { ssr: false });

interface Settings {
  showBlog: boolean;
  showSkills: boolean;
  showProjects: boolean;
  showCertificates: boolean;
  maintenanceMode: boolean;
}

export default function Home() {
  const [sectionsReady, setSectionsReady] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    showBlog: true,
    showSkills: true,
    showProjects: true,
    showCertificates: true,
    maintenanceMode: false
  });

  useEffect(() => {
    const onIdle = () => setSectionsReady(true);
    const browser = globalThis as typeof globalThis & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof browser.requestIdleCallback === "function") {
      const callbackId = browser.requestIdleCallback(onIdle, { timeout: 1200 });
      return () => browser.cancelIdleCallback?.(callbackId);
    }

    const timeoutId = setTimeout(onIdle, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!sectionsReady) {
      return;
    }

    let isMounted = true;

    Api.get('/settings')
      .then(res => {
        if (!isMounted || !res.data || res.data.length === 0) {
          return;
        }

        const s = res.data[0];
        setSettings({
          showBlog: s.show_blog ?? true,
          showSkills: s.show_skills ?? true,
          showProjects: s.show_projects ?? true,
          showCertificates: s.show_certificates ?? true,
          maintenanceMode: s.maintenance_mode ?? false
        });
      })
      .catch(err => console.error("Failed to load settings", err));

    return () => {
      isMounted = false;
    };
  }, [sectionsReady]);

  const { isAdmin } = useAuth();
  const { isRecruiterMode } = useRecruiterMode();

  if (settings.maintenanceMode && !isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative">
        <h1 className="text-4xl font-bold mb-4">Under Maintenance</h1>
        <p className="text-gray-400 mb-8">We are currently upgrading the site. Please check back later.</p>

        <a
          href={`${API_BASE_URL}/admin`}
          className="opacity-20 hover:opacity-100 transition-opacity text-sm text-gray-500 hover:text-cyan-400 absolute bottom-10"
        >
          Admin Login
        </a>
      </div>
    );
  }

  useEffect(() => {
    Api.post('/api/portfolio-view/')
      .catch(err => console.error("Failed to increment portfolio views", err));
  }, []);

  return (
    <>
      <Hero condensed={isRecruiterMode} />
      <GithubActivity />
      <RecruiterCTA />
      {sectionsReady ? (
        <>
          {!isRecruiterMode && <About />}
          {!isRecruiterMode && <Services />}
          {settings.showProjects && <Projects condensed={isRecruiterMode} />}
          {settings.showSkills && <Skills condensed={isRecruiterMode} />}
          {!isRecruiterMode && settings.showBlog && <BlogSection />}
          {!isRecruiterMode && settings.showCertificates && <Certificates />}
          <Contacts />
        </>
      ) : (
        <section
          aria-hidden="true"
          className="min-h-32 py-12 text-center text-sm text-academic-muted border-t border-academic-border"
        >
          Loading portfolio sections...
        </section>
      )}
    </>
  );
}
