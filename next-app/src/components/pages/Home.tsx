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
import Footer from '../layout/Footer';
import UserLayout from '../layout/UserLayout';
import LoadingSpinner from '../ui/LoadingSpinner';
import Api, { API_BASE_URL } from '../../lib/api';

export default function Home() {
  const [settings, setSettings] = useState({
    showBlog: true,
    showSkills: true,
    showProjects: true,
    showCertificates: true,
    maintenanceMode: false
  });

  useEffect(() => {
    Api.get('/settings')
      .then(res => {
        if (res.data) setSettings(res.data);
      })
      .catch(err => console.error("Failed to load settings", err));
  }, []);

  useEffect(() => {
    // Register global portfolio view
    Api.post('/portfolio-view/')
      .catch(err => console.error("Failed to register portfolio view", err));
  }, []);

  const { isAdmin } = useAuth();

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

  return (
    <>
      <Hero />
      <About />
      {settings.showBlog && <BlogSection />}
      {settings.showSkills && <Skills />}
      {settings.showProjects && <Projects />}
      {settings.showCertificates && <Certificates />}
      <Contacts />
    </>
  );
}

