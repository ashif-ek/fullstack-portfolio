'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../lib/api';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRecruiterMode } from '../../context/RecruiterContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Briefcase } from 'lucide-react';

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAdmin } = useAuth();
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Journal', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isOpen ? 'bg-academic-paper/95 backdrop-blur-md border-b border-academic-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link
            href="/#hero"
            className="text-2xl font-serif font-bold text-academic-primary cursor-pointer tracking-tight"
            aria-label="Ashif E.K Home"
          >
            Ashif E.K
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative cursor-pointer py-1 text-sm font-medium text-academic-muted hover:text-academic-primary transition-colors uppercase tracking-widest"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              className="academic-button text-sm uppercase tracking-widest"
              aria-label="Contact Ashif"
            >
              Collaborate
            </Link>
            <div className="relative group">
              <button
                className="text-academic-muted hover:text-academic-primary transition-colors cursor-pointer p-2 focus:outline-none"
                aria-label="Admin Login Options"
              >
                <UserIcon />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-academic-paper border border-academic-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col z-50">
                <Link
                  href="/login"
                  className="px-4 py-3 text-sm text-academic-text hover:bg-academic-bg hover:text-academic-primary transition-colors border-b border-academic-border"
                >
                  Next.js App Login
                </Link>
                <a
                  href={`${API_BASE_URL}/admin`}
                  className="px-4 py-3 text-sm text-academic-text hover:bg-academic-bg hover:text-academic-primary transition-colors"
                >
                  Django Admin Login
                </a>
              </div>
            </div>
            <button
              onClick={toggleRecruiterMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${isRecruiterMode
                  ? 'bg-academic-accent/10 border-academic-accent text-academic-accent shadow-sm'
                  : 'bg-academic-paper border-academic-border text-academic-muted hover:border-academic-primary hover:text-academic-primary'
                }`}
              aria-label="Toggle Recruiter Mode"
            >
              <Briefcase size={14} className={isRecruiterMode ? 'animate-pulse' : ''} />
              <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">
                {isRecruiterMode ? 'Recruiter Mode' : 'Standard View'}
              </span>
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`block h-0.5 w-6 bg-academic-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-4 bg-academic-primary transition-all duration-300 ml-auto ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-academic-primary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-academic-paper/95 backdrop-blur-md absolute w-full left-0 px-6
              ${isOpen ? 'max-h-screen opacity-100 border-b border-academic-border' : 'max-h-0 opacity-0'}
            `}
        >
          <div className="py-8 space-y-6 text-center">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-lg font-serif text-academic-primary transition-colors cursor-pointer"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="inline-block academic-button uppercase tracking-widest mb-4"
            >
              Collaborate
            </Link>
            
            <div className="px-6 pb-4">
              <button
                onClick={() => {
                  toggleRecruiterMode();
                  closeMenu();
                }}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full border transition-all duration-300 ${isRecruiterMode
                    ? 'bg-academic-accent/10 border-academic-accent text-academic-accent shadow-sm'
                    : 'bg-academic-paper border-academic-border text-academic-muted hover:border-academic-primary hover:text-academic-primary'
                  }`}
                aria-label="Toggle Recruiter Mode"
              >
                <Briefcase size={16} className={isRecruiterMode ? 'animate-pulse' : ''} />
                <span className="text-xs font-black uppercase tracking-widest">
                  {isRecruiterMode ? 'Recruiter Mode Active' : 'Standard View'}
                </span>
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-2 w-full border-t border-academic-border pt-4">
                <div className="text-academic-muted flex items-center justify-center gap-2 text-sm uppercase tracking-widest pb-2">
                  <UserIcon /> {isAdmin ? 'Dashboard Options' : 'Login Options'}
                </div>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="text-academic-muted hover:text-academic-primary transition-colors cursor-pointer text-sm"
                >
                  Next.js App Login
                </Link>
                <a
                  href={`${API_BASE_URL}/admin`}
                  onClick={closeMenu}
                  className="text-academic-muted hover:text-academic-primary transition-colors cursor-pointer text-sm"
                >
                  Django Admin Login
                </a>
              </div>
              <div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;



