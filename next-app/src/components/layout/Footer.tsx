'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useVisitors } from '../../hooks/useVisitors';

const Footer = () => {
  const { data: visitorData } = useVisitors();
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
      }).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ashifek/' },
    { name: 'WhatsApp', url: 'https://wa.me/919037499763' },
    { name: 'GitHub', url: 'https://github.com/Ashif-ek' },
    { name: 'Instagram', url: 'https://www.instagram.com/ashif.io' },
  ];

  const quickLinks = [
    { name: 'Expert Profile', url: '/about' },
    { name: 'Technical Works', url: '/#projects' },
    { name: 'Core Competencies', url: '/#skills' },
    { name: 'Correspondence', url: '/#contact' },
  ];

  return (
    <footer className="bg-academic-paper text-academic-text border-t border-academic-border py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

          {/* Brand section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-serif font-bold text-academic-primary mb-6 italic">
              Ashif<span className="text-academic-accent">.</span>E.K
            </h3>
            <p className="text-sm text-academic-muted leading-relaxed font-light">
              Synthesizing complex technical architectures through the lens of minimalist and informative design.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-academic-muted mb-8">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className="text-xs text-academic-primary hover:text-academic-accent transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Registry */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-academic-muted mb-8">Registry</h4>
            <ul className="space-y-4">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-academic-primary hover:text-academic-accent transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Identification */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-academic-muted mb-8">Temporal Data</h4>
            <div className="space-y-4">
              <div className="text-xl font-serif text-academic-primary tabular-nums">
                {currentTime || '--:--:--'}
              </div>
              <p className="text-[10px] text-academic-muted uppercase tracking-widest font-bold">
                IST // Kerala, India
              </p>

              <div className="pt-4 mt-4 border-t border-academic-border/50">
                <p className="text-[10px] text-academic-muted uppercase tracking-widest font-bold mb-1">
                  Global Identification
                </p>
                <div className="text-xl font-serif text-academic-primary tabular-nums">
                  {visitorData?.total_visitors ? String(visitorData.total_visitors).padStart(5, '0') : '-----'}
                </div>
                <p className="text-[9px] text-academic-muted uppercase tracking-[0.2em]">
                  Unique Verified Sessions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Standards */}
        <div className="pt-12 border-t border-academic-border flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-academic-muted">
            © {new Date().getFullYear()} Ashif E.K // All Formal Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-academic-muted">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-academic-secondary rounded-full" />
              Verified Architecture
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-academic-accent rounded-full" />
              Informativo Index
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
