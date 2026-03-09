'use client';
import React, { useEffect } from 'react';
import { useVisitors } from '../../hooks/useVisitors';
import { useProjects } from '../../hooks/useProjects';
import AdminLayout from '../../components/layout/AdminLayout';

export default function AnalyticsDashboard() {
    const { data: visitorData, isLoading: isLoadingVisitors } = useVisitors();
    const { data: projects = [], isLoading: isLoadingProjects } = useProjects();

    useEffect(() => {
        // Add title explicitly since it's an admin dashboard
        document.title = "Admin Dashboard | Ashif E.K";
    }, []);

    return (
        <AdminLayout>
            <div className="min-h-screen bg-academic-paper text-academic-text p-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-serif font-bold text-academic-primary mb-12 italic border-b border-academic-border pb-4">
                        System Analytics<span className="text-academic-accent">.</span>Dashboard
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <div className="bg-academic-bg border border-academic-border p-6 shadow-sm">
                            <h2 className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-4">Total Validated Sessions</h2>
                            <div className="text-4xl font-serif text-academic-primary tabular-nums">
                                {isLoadingVisitors ? '...' : (visitorData?.total_visitors || 0)}
                            </div>
                        </div>

                        <div className="bg-academic-bg border border-academic-border p-6 shadow-sm">
                            <h2 className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-4">Total Formulated Projects</h2>
                            <div className="text-4xl font-serif text-academic-primary tabular-nums">
                                {isLoadingProjects ? '...' : projects.length}
                            </div>
                        </div>

                        <div className="bg-academic-bg border border-academic-border p-6 shadow-sm">
                            <h2 className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-4">Cumulative Project Interaction</h2>
                            <div className="text-4xl font-serif text-academic-primary tabular-nums">
                                {isLoadingProjects ? '...' : projects.reduce((acc: number, p: any) => acc + (p.clicks || 0), 0)}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-serif text-academic-primary mb-6">Interaction Matrices per Project</h2>
                    <div className="bg-academic-bg border border-academic-border overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-academic-border bg-academic-paper/50">
                                    <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-academic-muted">Project ID</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-academic-muted">Title Identifier</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-academic-muted text-right">Click Registration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project: any) => (
                                    <tr key={project.id} className="border-b border-academic-border hover:bg-academic-paper transition-colors">
                                        <td className="p-4 text-xs font-mono text-academic-muted">{project.id}</td>
                                        <td className="p-4 text-sm font-medium text-academic-primary">{project.title}</td>
                                        <td className="p-4 text-sm font-serif text-academic-accent font-bold tabular-nums text-right">
                                            {(project.clicks || 0).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {projects.length === 0 && !isLoadingProjects && (
                            <div className="p-8 text-center text-academic-muted text-sm italic">
                                No active case studies registered in system databank.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
