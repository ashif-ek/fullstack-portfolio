'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, BriefcaseBusiness, Github, Instagram, Linkedin } from 'lucide-react';
import { profile as profileData } from '../../data/mockData';
import profileFallbackImage from '../../assets/profile.jpg';
import Api, { resolveAssetUrl } from '../../lib/api';
import { Profile, SocialLink } from '../../types';

import { useProfile } from '../../hooks/useProfile';

const iconMap: Record<string, React.ElementType> = {
  Github,
  LinkedIn: Linkedin,
  Instagram,
  Fiverr: BriefcaseBusiness,
  "Docs Material": BookOpen,
};

const SocialLinks = ({ links = [] }: { links?: SocialLink[] }) => {
  return (
    <div className="fixed left-5 bottom-0 z-30 hidden md:block">
      <div className="flex flex-col items-center">
        {links.map(({ name, url }) => {
          const Icon = iconMap[name];
          return (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}
              className="p-2 text-academic-muted hover:text-academic-primary transition-colors duration-300">
              {Icon && <Icon size={20} strokeWidth={1.8} />}
            </a>
          );
        })}
        <div className="h-24 w-px bg-academic-border mt-2"></div>
      </div>
    </div>
  );
};

const EmailLink = ({ email }: { email: string }) => (
  <div className="fixed right-5 bottom-0 z-30 hidden md:block">
    <div className="flex flex-col items-center">
      <a href={`mailto:${email}`}
        className="p-2 text-academic-muted hover:text-academic-primary transition-colors duration-300 [writing-mode:vertical-rl] tracking-widest text-sm">
        {email}
      </a>
      <div className="h-24 w-px bg-academic-border mt-2"></div>
    </div>
  </div>
);

const Hero = () => {
  const { profile, isLoading } = useProfile();

  const { name, title, description, email, socialLinks, avatar } = profile;
  const avatarSrc = useMemo(
    () => resolveAssetUrl(avatar) || profileFallbackImage.src,
    [avatar]
  );

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center bg-academic-bg text-academic-text font-sans">

      <SocialLinks links={socialLinks} />
      <EmailLink email={email} />

      <div className="relative z-20 container mx-auto max-w-5xl px-6 text-center flex flex-col items-center">

        <div className="hidden">
          {avatarSrc && (
            <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border border-academic-border p-1 bg-academic-paper shadow-sm mx-auto overflow-hidden">
              <Image
                src={avatarSrc}
                alt={name}
                fill
                className="object-cover rounded-full"
                priority
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-academic-primary tracking-tight px-4">
            {name}
          </h1>
          <div className="h-px w-16 bg-academic-border mx-auto my-4" />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-academic-muted max-w-2xl mx-auto px-4">
            {title}
          </h2>
        </div>

        <div>
          <p className="max-w-xl mt-6 text-base text-academic-muted leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-4">
          <a
            href="#projects"
            className="academic-button text-sm uppercase tracking-widest px-8 py-3 cursor-pointer"
          >
            Review Works
          </a>
          <Link
            href="/about"
            className="px-8 py-3 text-sm font-medium uppercase tracking-widest text-academic-primary hover:bg-academic-primary/5 border border-academic-primary/30 transition-all duration-300 cursor-pointer text-center rounded-lg"
          >
            Expertise Profile
          </Link>
          <a
            href="#contact"
            className="px-8 py-3 text-sm font-medium uppercase tracking-widest text-academic-primary hover:text-academic-accent transition-colors duration-300 cursor-pointer text-center"
          >
            Correspondence
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
