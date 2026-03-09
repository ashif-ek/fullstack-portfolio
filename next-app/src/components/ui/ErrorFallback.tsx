'use client';

function ErrorFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-r from-pink-50 via-white to-blue-50 p-10 rounded-2xl shadow-lg text-center">
      <div className="bg-red-100 text-red-600 w-20 h-20 flex items-center justify-center rounded-full mb-6">
        <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01m8.7-2.7L13.7 4.1a2 2 0 00-3.4 0L3.3 14.3A2 2 0 005 17h14a2 2 0 001.7-2.7z" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-4">
        Oops! Something went wrong
      </h2>

      {/* Description */}
      <p className="text-gray-700 mb-6 max-w-md">
        This section failed to load. Click the button below to try again.
      </p>

      <button
        onClick={resetErrorBoundary}
        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow hover:bg-red-700 transition-all"
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorFallback;
