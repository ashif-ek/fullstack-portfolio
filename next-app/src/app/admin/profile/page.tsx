'use client';
import React, { useState, useEffect } from 'react';
import { useProfile } from '../../../hooks/useProfile';
import { updateProfile } from '../../../lib/actions/profileActions';
import { Share2, Plus, Trash2, User, BookOpen, Mail } from 'lucide-react';

export default function ProfileAdminPage() {
    const { data: profile, isLoading, refetch } = useProfile();
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const [localSocialLinks, setLocalSocialLinks] = useState<{name: string, url: string}[]>([]);

    useEffect(() => {
        if (profile?.socialLinks) {
            setLocalSocialLinks(profile.socialLinks);
        }
    }, [profile]);

    const addSocialLink = () => {
        setLocalSocialLinks([...localSocialLinks, { name: '', url: '' }]);
    };

    const removeSocialLink = (index: number) => {
        setLocalSocialLinks(localSocialLinks.filter((_, i) => i !== index));
    };

    const updateSocialLink = (index: number, field: 'name' | 'url', value: string) => {
        const newLinks = [...localSocialLinks];
        newLinks[index][field] = value;
        setLocalSocialLinks(newLinks);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(null);
        const formData = new FormData(e.currentTarget);
        
        // Social links are handled by local state inputs named social_name[] and social_url[]
        const res = await updateProfile(formData);
        if (res.success) {
            setStatus({ type: 'success', msg: 'Profile system updated successfully.' });
            refetch();
        } else {
            setStatus({ type: 'error', msg: 'Critical Error: ' + res.error });
        }
    };

    if (isLoading) return <div className="animate-pulse p-8 text-academic-muted italic">Decrypting Profile Data...</div>;

    return (
        <div className="max-w-5xl mx-auto text-academic-text space-y-12 pb-20">
            <header className="border-b border-academic-border pb-6">
                <h1 className="text-4xl font-serif font-bold text-academic-primary italic">
                    Identity & Biography
                </h1>
                <p className="text-academic-muted text-sm mt-2 tracking-wide uppercase font-bold">Personal Narrative & Global Access Points</p>
            </header>

            {status && (
                <div className={`p-4 border text-sm italic animate-in fade-in slide-in-from-top-2 ${
                    status.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
                {/* Core Identity */}
                <section className="bg-academic-paper border border-academic-border p-10 shadow-sm">
                    <div className="flex items-center gap-3 mb-8 border-b border-academic-border pb-4">
                        <User className="text-academic-accent" size={20} />
                        <h2 className="text-xs uppercase tracking-widest font-bold text-academic-muted">Primary Metadata</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Legal / Professional Name</label>
                            <input name="name" defaultValue={profile?.name} required className="w-full bg-academic-bg border border-academic-border p-4 focus:border-academic-accent outline-none text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Academic / Professional Title</label>
                            <input name="title" defaultValue={profile?.title} required className="w-full bg-academic-bg border border-academic-border p-4 focus:border-academic-accent outline-none text-sm" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Public Contact Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-academic-muted" size={16} />
                                <input name="email" type="email" defaultValue={profile?.email} required className="w-full bg-academic-bg border border-academic-border p-4 pl-12 focus:border-academic-accent outline-none text-sm" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Narrative Sections */}
                <section className="bg-academic-paper border border-academic-border p-10 shadow-sm">
                    <div className="flex items-center gap-3 mb-8 border-b border-academic-border pb-4">
                        <BookOpen className="text-academic-accent" size={20} />
                        <h2 className="text-xs uppercase tracking-widest font-bold text-academic-muted">Academic Narrative</h2>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Abstract (Short Intro)</label>
                            <textarea name="description" defaultValue={profile?.description} rows={3} className="w-full bg-academic-bg border border-academic-border p-4 focus:border-academic-accent outline-none text-sm leading-relaxed" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Comprehensive Background (Experience)</label>
                            <textarea name="experience" defaultValue={profile?.experience} rows={6} className="w-full bg-academic-bg border border-academic-border p-4 focus:border-academic-accent outline-none text-sm leading-relaxed" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Work Ethos & Philosophy</label>
                            <textarea name="philosophy" defaultValue={profile?.philosophy} rows={4} className="w-full bg-academic-bg border border-academic-border p-4 focus:border-academic-accent outline-none text-sm leading-relaxed" />
                        </div>
                    </div>
                </section>

                {/* Social Links */}
                <section className="bg-academic-paper border border-academic-border p-10 shadow-sm">
                    <div className="flex justify-between items-center mb-8 border-b border-academic-border pb-4">
                        <div className="flex items-center gap-3">
                            <Share2 className="text-academic-accent" size={20} />
                            <h2 className="text-xs uppercase tracking-widest font-bold text-academic-muted">Digital Connectors</h2>
                        </div>
                        <button type="button" onClick={addSocialLink} className="text-[10px] uppercase font-bold tracking-widest text-academic-accent hover:text-academic-primary transition-colors flex items-center gap-1">
                            <Plus size={14} /> Add Platform
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        {localSocialLinks.length === 0 && (
                            <p className="text-sm text-academic-muted italic py-4">No social links configured.</p>
                        )}
                        {localSocialLinks.map((link, index) => (
                            <div key={index} className="flex gap-4 items-end animate-in fade-in slide-in-from-left-2">
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Platform Name</label>
                                        <input 
                                            name="social_name[]" 
                                            value={link.name} 
                                            onChange={(e) => updateSocialLink(index, 'name', e.target.value)}
                                            placeholder="e.g. GitHub, LinkedIn" 
                                            className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" 
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Target URL</label>
                                        <input 
                                            name="social_url[]" 
                                            value={link.url} 
                                            onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                            placeholder="https://..." 
                                            className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" 
                                        />
                                    </div>
                                </div>
                                <button type="button" onClick={() => removeSocialLink(index)} className="p-3 text-academic-muted hover:text-red-600 transition-colors mb-0.5">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="academic-button bg-academic-primary text-white px-16 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-academic-accent shadow-lg transition-all active:scale-95">
                        Commit Global Identity Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
