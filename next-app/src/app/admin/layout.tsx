import React from 'react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import AdminMobileHeader from '../../components/layout/AdminMobileHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-academic-bg font-sans flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <AdminMobileHeader />
                
                <div className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
