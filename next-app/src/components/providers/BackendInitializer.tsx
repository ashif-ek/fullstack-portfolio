'use client';

/**
 * BackendInitializer was previously used to "wake up" the Django backend.
 * Django is now disconnected — all data flows through Prisma directly.
 * This component is kept as a no-op for layout compatibility.
 */
export default function BackendInitializer() {
    return null; // No backend to wake up
}
