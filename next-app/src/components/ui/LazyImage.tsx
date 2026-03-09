'use client';
import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "./Skeleton";

// This component is designed to fill its parent container.
// Size and shape (like rounded corners) should be defined by the parent.
interface LazyImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage = ({ src, alt, className = "", ...props }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const fallback =
    "https://placehold.co/800x400/1a1a1a/777?text=No+Image+Available";

  return (
    <div className="relative h-full w-full bg-gray-800/40" {...props}>
      {/* --- Loading Skeleton --- */}
      {!loaded && <Skeleton className="absolute inset-0 z-10" />}

      {/* --- The Image --- */}
      <Image
        src={(!error && src) ? src : fallback}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"
          } ${className}`} // Preserve caller-defined visual styles.
      />
    </div>
  );
};

export default LazyImage;
