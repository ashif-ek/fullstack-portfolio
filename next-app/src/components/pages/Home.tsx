// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Certificates from '../sections/Certificates';
import BlogSection from '../sections/BlogSection';
import Contacts from '../sections/Contacts';
import GithubActivity from '../sections/GithubActivity';
import BuildJourney from '../sections/BuildJourney';
import RecruiterCTA from '../sections/RecruiterCTA';
import Services from '../sections/Services';
import Footer from '../layout/Footer';
import UserLayout from '../layout/UserLayout';
import LoadingSpinner from '../ui/LoadingSpinner';
import Api, { API_BASE_URL } from '../../lib/api';

export default function Home() {
  const [settings, setSettings] = useState({
    show_hero: true,
    show_about: true,
    show_services: true,
    show_blog: true,
    show_skills: true,
    show_projects: true,
    show_certificates: true,
    show_github_activity: true,
    show_build_journey: true,
    show_recruiter_cta: true,
    show_contacts: true,
    maintenance_mode: false
  });

  useEffect(() => {
    Api.get('/settings')
      .then(res => {
        if (res.data && res.data.length > 0) {
          // SiteSettings is often a single record or list depending on implementation
          const siteSettings = Array.isArray(res.data) ? res.data[0] : res.data;
          setSettings(siteSettings);
        }
      })
      .catch(err => console.error("Failed to load settings", err));
  }, []);

  useEffect(() => {
    // Register global portfolio view
    Api.post('/portfolio-view/')
      .catch(err => console.error("Failed to register portfolio view", err));
  }, []);

  const { isAdmin } = useAuth();

  if (settings.maintenance_mode && !isAdmin) {
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

  return (
    <>
      {settings.show_hero && <Hero />}
      {settings.show_about && <About />}
      {settings.show_github_activity && <GithubActivity />}
      {settings.show_services && <Services />}
      {settings.show_blog && <BlogSection />}
      {settings.show_skills && <Skills />}
      {settings.show_projects && <Projects />}
      {settings.show_certificates && <Certificates />}
      {settings.show_build_journey && <BuildJourney />}
      {settings.show_recruiter_cta && <RecruiterCTA />}
      {settings.show_contacts && <Contacts />}
    </>
  );
}

