'use client';
import React, { useState } from 'react';
import { useSettings } from '../../../hooks/useSettings';
import { updateSettings } from '../../../lib/actions/settingsActions';

export default function SettingsAdminPage() {
    const { data: settings, isLoading } = useSettings();
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(null);
        const formData = new FormData(e.currentTarget);
        const res = await updateSettings(formData);
        if (res.success) {
            setStatus({ type: 'success', msg: 'Core system variables reconfigured successfully.' });
        } else {
            setStatus({ type: 'error', msg: 'System Fault: ' + res.error });
        }
    };

    if (isLoading) return <div className="p-8 text-academic-muted">Polling System Configuration...</div>;

    const sections = [
        { label: 'Hero Display', name: 'showHero', value: settings?.showHero },
        { label: 'About Section', name: 'showAbout', value: settings?.showAbout },
        { label: 'Services Catalog', name: 'showServices', value: settings?.showServices },
        { label: 'Knowledge Base (Skills)', name: 'showSkills', value: settings?.showSkills },
        { label: 'Case Studies (Projects)', name: 'showProjects', value: settings?.showProjects },
        { label: 'Certifications', name: 'showCertificates', value: settings?.showCertificates },
        { label: 'Academic Blog', name: 'showBlog', value: settings?.showBlog },
    ];

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-academic-primary italic mb-10 border-b border-academic-border pb-4">
                Global System Parameters
            </h1>

            {status && (
                <div className={`mb-8 p-4 border text-sm italic ${
                    status.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
                <section className="space-y-6">
                    <h2 className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-4 border-b border-academic-border pb-2">Public Identity Metadata</h2>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Platform Title Identifier</label>
                            <input name="siteTitle" defaultValue={settings?.siteTitle} className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Initial Welcome String</label>
                            <textarea name="welcomeMessage" defaultValue={settings?.welcomeMessage} rows={2} className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-6 border-b border-academic-border pb-2">Module Visibility Matrices</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {sections.map((section) => (
                            <label key={section.name} className="flex items-center justify-between group cursor-pointer">
                                <span className="text-sm text-academic-primary group-hover:text-academic-accent transition-colors">{section.label}</span>
                                <div className="relative">
                                    <input 
                                        type="checkbox" 
                                        name={section.name} 
                                        defaultChecked={section.value}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-academic-paper border border-academic-border rounded-full peer peer-checked:bg-academic-accent peer-checked:border-academic-accent after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-academic-muted after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:bg-white" />
                                </div>
                            </label>
                        ))}
                    </div>
                </section>

                <section className="bg-red-50/30 border border-red-100 p-6 rounded-sm">
                    <h2 className="text-[10px] uppercase tracking-widest font-bold text-red-700 mb-4">Critical Override</h2>
                    <label className="flex items-center justify-between cursor-pointer group">
                        <div>
                            <span className="text-sm font-bold text-red-800 block">Maintenance Protocol</span>
                            <span className="text-[10px] text-red-600 italic">Disables public access to the platform.</span>
                        </div>
                        <div className="relative">
                            <input 
                                type="checkbox" 
                                name="maintenanceMode" 
                                defaultChecked={settings?.maintenanceMode}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-5 bg-academic-paper border border-red-200 rounded-full peer peer-checked:bg-red-600 peer-checked:border-red-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-red-200 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:bg-white" />
                        </div>
                    </label>
                </section>

                <div className="flex justify-end border-t border-academic-border pt-8">
                    <button type="submit" className="academic-button bg-academic-primary text-white px-12 py-4">
                        Overwrite Global Parameters
                    </button>
                </div>
            </form>
        </div>
    );
}
