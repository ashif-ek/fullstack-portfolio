'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, Github, Instagram, Linkedin, Phone, Globe } from 'lucide-react';
import { TbBrandFiverr, TbBrandWhatsapp } from 'react-icons/tb';
import profileFallbackImage from '../../assets/profile.jpg';
import { resolveAssetUrl } from '../../lib/api';
import { SocialLink } from '../../types';
import { useProfile } from '../../hooks/useProfile';
import { Skeleton } from '../ui/Skeleton';
import { buttonClasses, cn } from '../ui/Button';
import { trackResumeDownload } from '../../app/actions/resumeAnalytics';

const iconMap: Record<string, React.ElementType> = {
  Github: Github,
  github: Github,
  GitHub: Github,
  LinkedIn: Linkedin,
  linkedin: Linkedin,
  Linkedin: Linkedin,
  Instagram: Instagram,
  instagram: Instagram,
  Fiverr: TbBrandFiverr,
  fiverr: TbBrandFiverr,
  "Docs Material": BookOpen,
  "Docs Stack": BookOpen,
  "docs material": BookOpen,
  "docs stack": BookOpen,
  WhatsApp: TbBrandWhatsapp,
  whatsapp: TbBrandWhatsapp,
  whtsapp: TbBrandWhatsapp,
  Phone: Phone,
  phone: Phone,
  Portfolio: Globe,
  portfolio: Globe,
};

const SocialLinks = ({ links = [] }: { links?: SocialLink[] }) => {
  return (
    <div className="fixed left-6 bottom-0 z-30 hidden lg:block">
      <div className="flex flex-col items-center">
        {links.map(({ name, url }) => {
          const Icon = iconMap[name];
          return (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}
              className="p-2 text-academic-muted hover:text-academic-primary transition-colors duration-300">
              {Icon && <Icon size={18} strokeWidth={1.8} />}
            </a>
          );
        })}
        <div className="h-10 w-px bg-academic-border mt-2"></div>
      </div>
    </div>
  );
};

const EmailLink = ({ email }: { email?: string }) => (
  <div className="fixed right-6 bottom-0 z-30 hidden lg:block">
    <div className="flex flex-col items-center">
      {email && (
        <a href={`mailto:${email}`}
          className="p-2 text-academic-muted hover:text-academic-primary transition-colors duration-300 [writing-mode:vertical-rl] tracking-widest text-xs">
          {email}
        </a>
      )}
      <div className="h-10 w-px bg-academic-border mt-2"></div>
    </div>
  </div>
);

const Hero = ({ condensed = false }: { condensed?: boolean }) => {
  const { profile, isLoading } = useProfile();

  const avatarSrc = useMemo(
    () => resolveAssetUrl(profile?.avatar) || profileFallbackImage.src,
    [profile?.avatar]
  );

  return (
    <section id="hero" className={`relative flex flex-col justify-center items-center bg-academic-bg text-academic-text font-sans transition-all duration-500 ${condensed ? 'min-h-[55svh] pt-28 md:pt-32 pb-12' : 'min-h-[100svh] pt-28 md:pt-32 pb-16 md:pb-20'}`}>

      <SocialLinks links={profile?.socialLinks || []} />
      <EmailLink email={profile?.email} />

      <div className="relative z-20 container mx-auto max-w-4xl px-4 sm:px-6 md:px-12 text-center flex flex-col items-center">

        <div className="space-y-4">
          {isLoading ? (
            <Skeleton className="h-16 w-96 mx-auto mb-4" />
          ) : (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-academic-primary tracking-tight px-2">
              {profile?.name || "Ashif E.K"}
            </h1>
          )}
          <div className="h-px w-16 bg-academic-border mx-auto my-4" />
        </div>

        <div>
          {isLoading ? (
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
          ) : (
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-academic-muted max-w-2xl mx-auto px-2">
              {profile?.title || "Full-Stack Engineer"}
            </h2>
          )}
        </div>

        <div>
           {isLoading ? (
            <div className="space-y-2 mt-6">
              <Skeleton className="h-4 w-96 mx-auto" />
              <Skeleton className="h-4 w-80 mx-auto" />
            </div>
          ) : (
            <p className={`max-w-3xl mt-6 text-sm sm:text-base text-academic-muted leading-relaxed transition-all duration-500 mx-auto px-2 ${condensed ? 'line-clamp-2 text-sm' : ''}`}>
              {profile?.description}
            </p>
          )}
        </div>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 w-full sm:w-auto">
 
          <Link
            href="/expertise"
            className={cn(buttonClasses, "text-xs sm:text-sm tracking-widest py-3 px-6 sm:px-8 w-full sm:w-auto uppercase")}
          >
            Expertise Profile
          </Link>
          <a
            href="/resume/Ashif_E.K_Software_Developer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              try {
                trackResumeDownload().catch(() => {});
              } catch {}
            }}
            className={cn(buttonClasses, "text-xs sm:text-sm tracking-widest py-3 px-6 sm:px-8 w-full sm:w-auto uppercase")}
          >
            View Resume
          </a>

          <Link
            href="/creative-lab"
            className={cn(buttonClasses, "text-xs sm:text-sm tracking-widest py-3 px-6 sm:px-8 w-full sm:w-auto uppercase")}
          >
            Creative Lab
          </Link>
        </div>

        {/* Subtle Secondary Editorial CTA: Favorite Words / Lexicon */}
        <div className="mt-6 md:mt-8 max-w-md w-full mx-auto px-2">
          <Link
            href="/lexicon"
            className="group block academic-card !p-4 border border-academic-border/70 hover:border-academic-primary/40 bg-academic-paper/50 hover:bg-academic-paper transition-all duration-300 text-left rounded-md shadow-xs hover:shadow-academic"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest font-serif font-bold text-academic-primary">
                    Favorite Words
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-academic-accent/60" />
                </div>
                <p className="text-xs text-academic-muted mt-1 leading-relaxed font-sans">
                  A small universe of words, ideas, and principles that shape how I think.
                </p>
              </div>
              <span className="shrink-0 text-xs font-serif font-medium text-academic-primary group-hover:text-academic-accent transition-colors flex items-center pt-1 sm:pt-0 whitespace-nowrap">
                Explore Lexicon →
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile Social Links */}
        <div className="mt-8 flex lg:hidden items-center justify-center gap-5 flex-wrap">
          {profile?.socialLinks?.map(({ name, url }) => {
            const Icon = iconMap[name];
            return (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}
                className="text-academic-muted hover:text-academic-primary transition-colors duration-300">
                {Icon && <Icon size={20} strokeWidth={1.5} />}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
