'use client';
import { useEffect, useRef } from 'react';
import Api from '../../lib/api';

export default function VisitorTracker() {
    const hasTracked = useRef(false);

    useEffect(() => {
        if (hasTracked.current) return;

        // Track only once per session
        const tracked = sessionStorage.getItem('visitor_tracked');
        if (!tracked) {
            Api.post('/analytics/visitors/increment/')
                .then(() => {
                    sessionStorage.setItem('visitor_tracked', 'true');
                    hasTracked.current = true;
                })
                .catch((err) => console.error("Failed to track visitor:", err));
        } else {
            hasTracked.current = true;
        }
    }, []);

    return null; // Silent component
}
