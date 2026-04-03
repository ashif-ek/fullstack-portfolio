'use client';

import { useEffect } from 'react';
import Api, { API_BASE_URL } from '../../lib/api';

/**
 * BackendInitializer is a lightweight component designed to "wake up" 
 * the backend as soon as the application is opened in the browser.
 * It performs a simple ping request to the backend health endpoint.
 */
export default function BackendInitializer() {
    useEffect(() => {
        const wakeup = async () => {
            try {
                console.log(`[BackendInitializer] Waking up backend at ${API_BASE_URL}...`);
                // Use a raw fetch to be as lightweight as possible and avoid axios interceptors if they add delay
                // But since we have Api configured, we use it for consistency if needed.
                // We'll use a simple fetch here for maximum speed.
                fetch(`${API_BASE_URL}/ping/`, { mode: 'no-cors', cache: 'no-store' })
                    .catch(() => {
                        /* Ignore errors, this is just a wake-up call */
                    });
                
                // Also trigger a profile fetch to pre-warm the main data
                Api.get('/profile/').catch(() => {});
            } catch (e) {
                // Background task, ignore errors
            }
        };

        wakeup();
    }, []);

    return null; // This component doesn't render anything
}
