'use client';

import { useAuth } from "../../context/AuthContext";
import { useRecruiterMode } from "../../context/RecruiterContext";
import Hero from "../../components/sections/Hero";
import dynamic from "next/dynamic";
import Link from "next/link";
import { API_BASE_URL } from "../../lib/api";
import GithubActivity from "../../components/sections/GithubActivity";
import RecruiterCTA from "../../components/sections/RecruiterCTA";

const About = dynamic(() => import("../../components/sections/About"), { ssr: false });
const Experience = dynamic(() => import("../../components/sections/Experience"), { ssr: false });
const Skills = dynamic(() => import("../../components/sections/Skills"), { ssr: false });
const Projects = dynamic(() => import("../../components/sections/Projects"), { ssr: false });
const Certificates = dynamic(() => import("../../components/sections/Certificates"), { ssr: false });
const Contacts = dynamic(() => import("../../components/sections/Contacts"), { ssr: false });
const BlogSection = dynamic(() => import("../../components/sections/BlogSection"), { ssr: false });
const Services = dynamic(() => import("../../components/sections/Services"), { ssr: false });

import { Settings } from "../../types";
import { CreativeLabItem } from "@prisma/client";
import { CreativeLabSection } from "../creative-lab/CreativeLabSection";

interface HomeClientProps {
  settings: Settings;
  creativeLabItems: CreativeLabItem[];
}

export default function HomeClient({ settings, creativeLabItems }: HomeClientProps) {
  const { isAdmin } = useAuth();
  const { isRecruiterMode } = useRecruiterMode();

  if (settings.maintenanceMode && !isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative">
        <h1 className="text-4xl font-bold mb-4">Under Maintenance</h1>
        <p className="text-gray-400 mb-8">We are currently upgrading the site. Please check back later.</p>

        <Link
          href="/login"
          className="opacity-20 hover:opacity-100 transition-opacity text-sm text-gray-500 hover:text-cyan-400 absolute bottom-10"
        >
          Admin Login
        </Link>
      </div>
    );
  }

  return (
    <>
      {settings.showHero && <Hero condensed={isRecruiterMode} />}
      {settings.showGithubActivity && <GithubActivity />}
      {settings.showRecruiterCta && <RecruiterCTA />}
      <>
        {settings.showAbout && <About />}
        <Experience />
        <CreativeLabSection items={creativeLabItems} />
        {settings.showServices && <Services />}
        {settings.showProjects && <Projects condensed={isRecruiterMode} />}
        {settings.showSkills && <Skills condensed={isRecruiterMode} />}
        {settings.showBlog && <BlogSection />}
        {settings.showCertificates && <Certificates />}
        {settings.showContacts && <Contacts />}
      </>
    </>
  );
}
