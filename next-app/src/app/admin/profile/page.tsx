'use client';
import React, { useState, useEffect } from 'react';
import { useProfile } from '../../../hooks/useProfile';
import { updateProfile } from '../../../lib/actions/profileActions';

export default function ProfileAdminPage() {
    const { data: profile, isLoading } = useProfile();
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(null);
        const formData = new FormData(e.currentTarget);
        const res = await updateProfile(formData);
        if (res.success) {
            setStatus({ type: 'success', msg: 'Profile system updated successfully.' });
        } else {
            setStatus({ type: 'error', msg: 'Critical Error: ' + res.error });
        }
    };

    if (isLoading) return <div className="animate-pulse p-8 text-academic-muted italic">Decrypting Profile Data...</div>;

    return (
        <div className="max-w-4xl mx-auto text-academic-text">
            <h1 className="text-3xl font-serif font-bold text-academic-primary italic mb-8 border-b border-academic-border pb-4">
                Identity & Biography Management
            </h1>

            {status && (
                <div className={`mb-8 p-4 border text-sm italic ${
                    status.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
                <section className="space-y-6 bg-academic-bg border border-academic-border p-8 shadow-sm">
                    <h2 className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-4 border-b border-academic-border pb-2">Core Identity</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-academic-muted">Full Name</label>
                            <input name="name" defaultValue={profile?.name} required className="w-full bg-academic-paper border border-academic-border p-3 focus:border-academic-accent outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-academic-muted">Professional Title</label>
                            <input name="title" defaultValue={profile?.title} required className="w-full bg-academic-paper border border-academic-border p-3 focus:border-academic-accent outline-none" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-academic-muted">Contact Email</label>
                            <input name="email" type="email" defaultValue={profile?.email} required className="w-full bg-academic-paper border border-academic-border p-3 focus:border-academic-accent outline-none" />
                        </div>
                    </div>
                </section>

                <section className="space-y-6 bg-academic-bg border border-academic-border p-8 shadow-sm">
                    <h2 className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-4 border-b border-academic-border pb-2">Narrative Sections (About Me)</h2>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-academic-muted">Brief Introduction</label>
                            <textarea name="description" defaultValue={profile?.description} rows={3} className="w-full bg-academic-paper border border-academic-border p-3 focus:border-academic-accent outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-academic-muted">Professional Experience Detail</label>
                            <textarea name="experience" defaultValue={profile?.experience} rows={5} className="w-full bg-academic-paper border border-academic-border p-3 focus:border-academic-accent outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-academic-muted">Work Philosophy</label>
                            <textarea name="philosophy" defaultValue={profile?.philosophy} rows={4} className="w-full bg-academic-paper border border-academic-border p-3 focus:border-academic-accent outline-none" />
                        </div>
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="academic-button bg-academic-primary text-white px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-academic-primary/90 transition-all">
                        Synchronize Global Records
                    </button>
                </div>
            </form>
        </div>
    );
}
