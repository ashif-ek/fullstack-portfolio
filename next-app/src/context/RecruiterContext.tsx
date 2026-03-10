'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface RecruiterContextType {
    isRecruiterMode: boolean;
    toggleRecruiterMode: () => void;
}

const RecruiterContext = createContext<RecruiterContextType | undefined>(undefined);

export function RecruiterProvider({ children }: { children: React.ReactNode }) {
    const [isRecruiterMode, setIsRecruiterMode] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('recruiterMode');
        if (savedMode === 'true') {
            setIsRecruiterMode(true);
        }
        setMounted(true);
    }, []);

    const toggleRecruiterMode = () => {
        const newMode = !isRecruiterMode;
        setIsRecruiterMode(newMode);
        localStorage.setItem('recruiterMode', String(newMode));
    };

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <RecruiterContext.Provider value={{ isRecruiterMode, toggleRecruiterMode }}>
            {children}
        </RecruiterContext.Provider>
    );
}

export function useRecruiterMode() {
    const context = useContext(RecruiterContext);
    if (context === undefined) {
        throw new Error('useRecruiterMode must be used within a RecruiterProvider');
    }
    return context;
}
