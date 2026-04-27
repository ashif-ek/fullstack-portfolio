'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, FolderKanban, Settings, LogOut, ArrowLeft, PenTool, User, Briefcase, Award, FileText } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
        { name: 'Projects', href: '/admin/projects', icon: <FolderKanban size={18} /> },
        { name: 'Skills', href: '/admin/skills', icon: <PenTool size={18} /> },
        { name: 'Services', href: '/admin/services', icon: <Briefcase size={18} /> },
        { name: 'Identity', href: '/admin/profile', icon: <User size={18} /> },
        { name: 'Settings', href: '/admin/settings', icon: <Settings size={18} /> },
    ];

    const handleLogout = async () => {
        await logout();
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-academic-bg font-sans flex">
            {/* Sidebar */}
            <aside className="w-64 bg-academic-paper border-r border-academic-border hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-academic-border">
                    <h1 className="text-xl font-serif text-academic-primary italic font-bold">Admin Panel</h1>
                    <Link href="/" className="flex items-center gap-2 mt-4 text-xs uppercase tracking-widest text-academic-muted hover:text-academic-accent transition-colors font-bold">
                        <ArrowLeft size={14} /> Back to Site
                    </Link>
                </div>
                
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                                    isActive 
                                    ? 'bg-academic-bg text-academic-primary font-bold border border-academic-border shadow-sm' 
                                    : 'text-academic-muted hover:bg-academic-bg hover:text-academic-primary'
                                }`}
                            >
                                {item.icon}
                                <span className="text-sm tracking-wide">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-academic-border">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-academic-accent hover:bg-red-50 rounded-md transition-colors text-sm font-bold"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="md:hidden bg-academic-paper border-b border-academic-border p-4 flex justify-between items-center sticky top-0 z-50">
                    <h1 className="text-lg font-serif text-academic-primary italic font-bold">Admin Panel</h1>
                    <button onClick={handleLogout} className="p-2 text-academic-accent">
                        <LogOut size={18} />
                    </button>
                </header>
                
                <div className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
