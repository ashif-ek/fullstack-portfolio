'use client';

import React, { useState, useEffect, useMemo } from "react";
import { about as mockAbout } from "../../data/mockData";
import { AboutData } from "../../types";
import Api, { resolveAssetUrl } from "../../lib/api";
import LazyImage from "../ui/LazyImage";
import profileImg from "../../assets/profile.jpg";

const profile = profileImg.src;

/* ===========================
   Academic Stat Component
   =========================== */

const AcademicStat = React.memo(
  ({ value, label }: { value: number; label: string }) => {
    return (
      <div className="text-center p-5 border-b sm:border-b-0 sm:border-l border-academic-border sm:first:border-l-0">
        <p className="text-3xl font-serif font-bold text-academic-primary mb-1">
          {value}+
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-academic-muted font-bold">
          {label}
        </p>
      </div>
    );
  }
);

/* ===========================
   About Component
   =========================== */
import { useProfile } from "../../hooks/useProfile";

const About = () => {
  const [activeTab, setActiveTab] = useState<string>("biography");
  const { about: aboutData, isLoading } = useProfile();

  /* Tabs Content */
  const tabs = useMemo(
    () => ({
      biography: {
        title: "Biography",
        content: (
          <div className="space-y-6">
            <p className="text-academic-primary font-serif italic text-lg leading-relaxed">
              "Engineering is not merely the act of construction, but the pursuit
              of architectural excellence and technical clarity."
            </p>

            <p className="text-academic-muted font-light leading-relaxed">
              {aboutData.introduction}
            </p>
          </div>
        ),
      },

      experience: {
        title: "Professional Tenure",
        content: (
          <div className="space-y-6">
            <p className="text-academic-muted font-light leading-relaxed">
              {aboutData.experience}
            </p>

            <div className="pt-6 border-t border-academic-border">
              <h4 className="text-xs uppercase tracking-widest font-bold text-academic-primary mb-4">
                Core Focus Areas
              </h4>

              <ul className="grid grid-cols-2 gap-4 text-sm text-academic-muted">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-academic-accent rounded-full" />
                  Fullstack Architecture
                </li>

                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-academic-accent rounded-full" />
                  Scalable API Design
                </li>

                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-academic-accent rounded-full" />
                  Distributed Systems
                </li>

                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-academic-accent rounded-full" />
                  UI/UX Research
                </li>
              </ul>
            </div>
          </div>
        ),
      },

      philosophy: {
        title: "Philosophical Framework",
        content: (
          <div className="space-y-6">
            <p className="text-academic-muted font-light leading-relaxed">
              {aboutData.philosophy}
            </p>
          </div>
        ),
      },
    }),
    [aboutData]
  );

  return (
    <section
      id="about"
      className="py-16 md:py-28 bg-academic-paper text-academic-text border-t border-academic-border"
    >
      <div className="mx-auto px-5 sm:px-6 lg:px-8 max-w-5xl">

        {/* GRID LAYOUT */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* =========================
             Portrait Section
          ========================= */}

          <div className="md:col-span-5 w-full flex justify-center md:block">

            <div className="md:sticky md:top-32">

              <div className="relative">

                <div className="academic-card !p-3 group w-full max-w-[260px] md:max-w-sm mx-auto">
                  <div className="relative overflow-hidden aspect-[4/5]">

                    <LazyImage
                      src={resolveAssetUrl(aboutData.avatar) || profile}
                      alt="Formal Portrait"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />

                    <div className="absolute inset-0 border-[10px] border-academic-paper/20 pointer-events-none" />

                  </div>
                </div>

                <div className="hidden md:block absolute -bottom-6 -right-6 w-28 h-28 border-r border-b border-academic-accent opacity-30" />

              </div>

              {/* Profile Info */}

              <div className="mt-8 md:mt-12 space-y-2 text-center md:text-left">

                <h3 className="text-2xl font-serif font-bold text-academic-primary">
                  Ashif E.K
                </h3>

                <p className="text-xs uppercase tracking-[0.35em] text-academic-muted font-bold">
                  Full-Stack Engineer
                </p>

                <div className="pt-4 flex justify-center md:justify-start">

                  <p className="text-[11px] text-academic-muted leading-relaxed max-w-xs font-light">
                    Dedicated to the synthesis of functional efficiency and
                    aesthetic precision in digital environments.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
             Narrative Section
          ========================= */}

          <div className="md:col-span-7 pt-8 md:pt-12">

            {/* Heading */}

            <div className="mb-8 md:mb-10 text-center md:text-left">

              <h2 className="section-title">Curriculum Vitae</h2>

              <p className="text-academic-muted font-serif italic mt-2">
                A narrative of academic growth and technical specialization.
              </p>

            </div>

            {/* Tabs */}

            <div className="flex flex-wrap md:flex-nowrap border-b border-academic-border mb-8 md:mb-12 gap-2 md:gap-0">

              {Object.keys(tabs).map((tabKey) => (

                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`px-6 md:px-8 py-3 md:py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative ${activeTab === tabKey
                    ? "text-academic-primary"
                    : "text-academic-muted hover:text-academic-primary"
                    }`}
                >
                  {tabs[tabKey as keyof typeof tabs].title}

                  {activeTab === tabKey && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-academic-accent" />
                  )}

                </button>

              ))}

            </div>

            {/* Tab Content */}

            <div key={activeTab} className="min-h-[220px]">
              {tabs[activeTab as keyof typeof tabs].content}
            </div>

            {/* Stats */}

            <div className="mt-12 md:mt-20 pt-10 md:pt-12 border-t border-academic-border">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0">

                <AcademicStat
                  value={aboutData.stats.projects || 10}
                  label="Case Studies"
                />

                <AcademicStat
                  value={aboutData.stats.certificates || 4}
                  label="Accreditations"
                />

                <AcademicStat
                  value={aboutData.stats.technologies || 8}
                  label="Technical Indices"
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
