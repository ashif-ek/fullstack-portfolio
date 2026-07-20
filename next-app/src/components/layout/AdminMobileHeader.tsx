'use client';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function AdminMobileHeader() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        window.location.href = '/login';
    };

    return (
        <header className="md:hidden bg-academic-paper border-b border-academic-border p-4 flex justify-between items-center sticky top-0 z-50">
            <h1 className="text-lg font-serif text-academic-primary italic font-bold">Admin Panel</h1>
            <button onClick={handleLogout} className="p-2 text-academic-accent">
                <LogOut size={18} />
            </button>
        </header>
    );
}
