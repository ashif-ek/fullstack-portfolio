'use client';
import { useState, useEffect, useRef, useMemo } from "react";
import { certificates as mockCertificates } from '../../data/mockData';
import Api, { resolveAssetUrl } from '../../lib/api';
import LazyImage from '../ui/LazyImage';
import { Certificate } from '../../types';

// Image imports replaced with online placeholders
const certificateImages: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=800",
  "2": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
  "3": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  "4": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
  "5": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
};

import { useCertificates } from "../../hooks/useCertificates";

const Certificates = () => {
  const { data: certificates, isLoading } = useCertificates();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const certificateOrder = ["bca", "bridgeon", "regional", "ccsa"];

  const sortedCertificates = useMemo(() => {
    return [...certificates].sort((a, b) => {
      const getIndex = (item: Certificate) => {
        const textToSearch = (item.title + " " + item.issuer).toLowerCase();
        for (let i = 0; i < certificateOrder.length; i++) {
          if (textToSearch.includes(certificateOrder[i])) return i;
        }
        return certificateOrder.length;
      };
      return getIndex(a) - getIndex(b);
    });
  }, [certificates]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(sortedCertificates.map(c => c.category))).filter(Boolean);
    return [
      { id: "all", name: "All" },
      ...uniqueCategories.map(c => ({ id: c, name: c }))
    ];
  }, [sortedCertificates]);

  const filteredCertificates =
    selectedCategory === "all"
      ? sortedCertificates
      : sortedCertificates.filter((cert) => cert.category === selectedCategory);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-academic-bg text-academic-text relative border-t border-academic-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="section-title">Certifications & Accreditations</h2>
          <p className="text-academic-muted font-serif italic mt-2">Formal recognition of technical proficiency and academic excellence.</p>

          <div className="flex flex-wrap justify-center gap-2 mt-12">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-1 text-xs uppercase tracking-widest transition-all duration-300 border ${selectedCategory === category.id
                  ? "bg-academic-primary text-white border-academic-primary"
                  : "bg-transparent border-academic-border text-academic-muted hover:border-academic-primary hover:text-academic-primary"
                  }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {filteredCertificates.length === 0 ? (
          <div className="text-center text-academic-muted font-serif italic py-20">
            No archives found in this classification.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((cert) => {
              const imgSrc = resolveAssetUrl(cert.image) || certificateImages[String(cert.id)];
              return (
                <div
                  key={cert.id}
                  className="academic-card flex flex-col group"
                >
                  {/* Image Section */}
                  <div
                    className="relative h-48 overflow-hidden cursor-pointer bg-academic-bg border-b border-academic-border -mx-6 -mt-6 mb-6"
                    onClick={() => setSelectedImage(imgSrc)}
                  >
                    <LazyImage
                      src={imgSrc}
                      alt={cert.title}
                      className="w-full h-full object-contain p-4 filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-academic-paper/80 backdrop-blur-sm border border-academic-border px-2 py-1 text-[8px] uppercase tracking-widest text-academic-primary font-bold">
                      {cert.category}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-[10px] font-bold text-academic-accent uppercase tracking-widest">
                        {cert.issuer}
                      </span>
                      <span className="text-[10px] text-academic-muted font-serif italic">
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-academic-primary mb-4 group-hover:text-academic-accent transition-colors">
                      {cert.title}
                    </h3>

                    <p className="text-academic-muted text-sm leading-relaxed font-light mb-8 line-clamp-3">
                      {cert.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-academic-border">
                      {cert.credentialLink && cert.credentialLink !== "#" && (
                        <a
                          href={cert.credentialLink}
                          aria-label={`Authenticate record for ${cert.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] uppercase tracking-[0.2em] font-bold text-academic-primary hover:text-academic-accent transition-colors flex items-center justify-center gap-2"
                        >
                          Authenticate Record
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002 2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-academic-bg/95 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <LazyImage
              src={selectedImage}
              alt="Certificate Preview"
              className="w-full h-auto object-contain rounded shadow-paper border border-academic-border"
            />
            <button
              className="absolute -top-12 right-0 text-academic-primary text-sm uppercase tracking-widest font-bold"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
