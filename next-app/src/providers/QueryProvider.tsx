'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // With placeholderData pattern, we want to try fetching immediately
                        // to replace the mock data with fresh data if possible.
                        staleTime: 0,
                        // Retry once to be robust, but fail fast to show offline state if needed
                        retry: 1,
                        refetchOnWindowFocus: true, // Good for a portfolio to keep data fresh
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
