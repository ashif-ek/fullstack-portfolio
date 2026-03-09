import React from 'react';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-academic-border rounded-md overflow-hidden relative ${className}`}
        >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-academic-paper/50 to-transparent" />
        </div>
    );
}

// Ensure you have tailwind configured properly, or use this CSS:
// @keyframes shimmer {
//   100% {
//     transform: translateX(100%);
//   }
// }
