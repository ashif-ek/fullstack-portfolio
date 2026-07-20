'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-academic-bg p-4">
      <div className="bg-academic-paper p-8 rounded-lg shadow-sm border border-red-200 max-w-md w-full text-center">
        <div className="flex justify-center mb-4 text-red-500">
          <AlertTriangle size={48} />
        </div>
        <h2 className="text-2xl font-serif text-academic-primary italic font-bold mb-2">Something went wrong!</h2>
        <p className="text-academic-muted mb-6">
          An unexpected error occurred. We apologize for the inconvenience.
        </p>
        <button
          onClick={() => reset()}
          className="bg-academic-accent text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors font-bold tracking-wide"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
