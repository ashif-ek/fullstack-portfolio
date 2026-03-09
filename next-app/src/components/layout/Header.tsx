'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../lib/api';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAdmin } = useAuth();

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
    { name: 'Services', href: '/#services' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
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
            <a
              href="#contact"
              className="academic-button text-sm uppercase tracking-widest"
              aria-label="Contact Ashif"
            >
              Collaborate
            </a>
            <a
              href={`${API_BASE_URL}/admin`}
              className="text-academic-muted hover:text-academic-primary transition-colors cursor-pointer p-2"
              aria-label="Admin Login"
            >
              <UserIcon />
            </a>
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
            <a
              href="#contact"
              onClick={closeMenu}
              className="inline-block academic-button uppercase tracking-widest mb-4"
            >
              Collaborate
            </a>
            <div className="flex justify-center">
              <a
                href={`${API_BASE_URL}/admin`}
                onClick={closeMenu}
                className="text-academic-muted hover:text-academic-primary transition-colors cursor-pointer p-2 flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                aria-label="Admin Login"
              >
                <UserIcon /> {isAdmin ? 'Dashboard' : 'Admin Login'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;



