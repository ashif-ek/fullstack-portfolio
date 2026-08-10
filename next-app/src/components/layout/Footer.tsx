'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useVisitors } from '../../hooks/useVisitors';
import { Card } from '../ui/Card';

const Footer = () => {
  const { data: visitorData } = useVisitors();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isHovered, setIsHovered] = useState<string | null>(null);

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
    { name: 'GitHub', url: 'https://github.com/ashif-ek' },
    { name: 'Instagram', url: 'https://www.instagram.com/ashif.io' },
  ];

  const contactLinks = [
    { name: 'ashifek11@gmail.com', url: 'mailto:ashifek11@gmail.com' },
    { name: '+91 90374 99763', url: 'tel:+919037499763' },
    { name: 'WhatsApp', url: 'https://wa.me/919037499763' },
  ];

  const quickLinks = [
    { name: 'Expert Profile', url: '/about' },
    { name: 'Technical Works', url: '/#projects' },
    { name: 'Core Competencies', url: '/#skills' },
    { name: 'Correspondence', url: '/#contact' },
  ];

  return (
    <footer className="relative bg-academic-bg text-academic-text border-t border-academic-border py-12 md:py-16 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute -top-[200px] -right-[200px] w-[400px] h-[400px] bg-academic-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[200px] -left-[200px] w-[400px] h-[400px] bg-academic-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 md:mb-16">

          {/* Brand section */}
          <div className="md:col-span-2 lg:col-span-4 flex flex-col lg:border-r border-academic-border lg:pr-8">
            <h3 className="text-2xl font-serif font-bold text-academic-primary mb-4 italic transition-transform duration-500 hover:-translate-y-1 hover:text-academic-accent cursor-default">
              Ashif E.K
            </h3>
            <p className="text-sm text-academic-muted leading-relaxed font-light">
              Synthesizing complex technical architectures through the lens of minimalist and informative design.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1 lg:col-span-2 flex flex-col">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-academic-muted mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={`nav-${index}`} 
                    onMouseEnter={() => setIsHovered(`nav-${index}`)}
                    onMouseLeave={() => setIsHovered(null)}
                    className="transform transition-transform duration-300 hover:translate-x-1"
                >
                  <Link
                    href={link.url}
                    className={`text-xs transition-colors duration-300 font-medium flex items-center gap-2 ${isHovered === `nav-${index}` ? 'text-academic-accent' : 'text-academic-primary'}`}
                  >
                    <span className={`w-1 h-1 rounded-full bg-academic-accent transition-opacity duration-300 ${isHovered === `nav-${index}` ? 'opacity-100' : 'opacity-0'}`} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Registry */}
          <div className="md:col-span-1 lg:col-span-3 flex flex-col">
            <div className="mb-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-academic-muted mb-4">
                Direct Contact
              </h4>
              <ul className="space-y-2">
                {contactLinks.map((link, index) => (
                  <li key={`contact-${index}`}
                      onMouseEnter={() => setIsHovered(`contact-${index}`)}
                      onMouseLeave={() => setIsHovered(null)}
                      className="transform transition-transform duration-300 hover:translate-x-1"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs transition-colors duration-300 font-medium flex items-center gap-2 ${isHovered === `contact-${index}` ? 'text-academic-secondary' : 'text-academic-primary'}`}
                    >
                      <span className={`w-1 h-1 rounded-full bg-academic-secondary transition-opacity duration-300 ${isHovered === `contact-${index}` ? 'opacity-100' : 'opacity-0'}`} />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-academic-muted mb-4">
                Social Registry
              </h4>
              <ul className="space-y-2">
                {socialLinks.map((link, index) => (
                  <li key={`social-${index}`}
                      onMouseEnter={() => setIsHovered(`social-${index}`)}
                      onMouseLeave={() => setIsHovered(null)}
                      className="transform transition-transform duration-300 hover:translate-x-1"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs transition-colors duration-300 font-medium flex items-center gap-2 ${isHovered === `social-${index}` ? 'text-academic-accent' : 'text-academic-primary'}`}
                    >
                      <span className={`w-1 h-1 rounded-full bg-academic-secondary transition-opacity duration-300 ${isHovered === `social-${index}` ? 'opacity-100' : 'opacity-0'}`} />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Identification */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col lg:border-l border-academic-border lg:pl-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-academic-muted mb-4">
              Temporal Data
            </h4>
            <div className="flex flex-col gap-4">
              <Card className="!p-4 bg-academic-bg border-academic-border !shadow-none hover:!shadow-academic">
                <div className="text-xl font-serif text-academic-primary tabular-nums font-bold tracking-wider">
                  {currentTime || '--:--:--'}
                </div>
                <p className="text-[9px] text-academic-muted uppercase tracking-[0.2em] mt-1">
                  IST // Kerala, India
                </p>
              </Card>

              {visitorData?.total_visitors ? (
                <Card className="!p-4 bg-academic-bg border-academic-border !shadow-none hover:!shadow-academic relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-academic-accent/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <p className="text-[9px] text-academic-muted uppercase tracking-[0.2em] font-bold mb-1">
                    Global Identification
                  </p>
                  <div className="text-xl font-serif text-academic-primary tabular-nums font-bold tracking-wider">
                    {String(visitorData.total_visitors).padStart(5, '0')}
                  </div>
                  <p className="text-[8px] text-academic-muted uppercase tracking-[0.25em] mt-1">
                    Unique Sessions
                  </p>
                </Card>
              ) : null}
            </div>
          </div>
        </div>

        {/* Legal & Standards */}
        <div className="pt-8 border-t border-academic-border flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-academic-muted text-center md:text-left">
            © {new Date().getFullYear()} Ashif E.K <span className="mx-2 text-academic-border hidden sm:inline-block">|</span><br className="sm:hidden" /> All Formal Rights Reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[10px] uppercase tracking-widest font-bold text-academic-muted">
            <span className="flex items-center gap-2 group cursor-default">
              <span className="w-2 h-2 bg-academic-secondary rounded-full animate-pulse shadow-[0_0_5px_var(--academic-secondary)]" />
              <span className="group-hover:text-academic-secondary transition-colors duration-300">Verified Architecture</span>
            </span>
            <span className="flex items-center gap-2 group cursor-default">
              <span className="w-2 h-2 bg-academic-accent rounded-full shadow-[0_0_5px_var(--academic-accent)] transition-transform duration-300 group-hover:scale-125" />
              <span className="group-hover:text-academic-accent transition-colors duration-300">Informative Index</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
