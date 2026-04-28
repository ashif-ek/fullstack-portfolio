'use client';
import React, { useState } from 'react';
import { useCertificates } from '../../../hooks/useCertificates';
import { createCertificate, updateCertificate, deleteCertificate } from '../../../lib/actions/contentActions';
import { Award, Plus, Trash2, Edit3, ExternalLink, Calendar, Briefcase } from 'lucide-react';

export default function CertificatesAdmin() {
    const { data: certificates, isLoading, refetch } = useCertificates();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = editingId 
            ? await updateCertificate(editingId, formData)
            : await createCertificate(formData);
        
        if (res.success) {
            setIsAdding(false);
            setEditingId(null);
            refetch();
        } else {
            alert('Operation failed: ' + res.error);
        }
    };

    if (isLoading) return <div className="p-8 animate-pulse text-academic-muted italic">Verifying Credentials...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            <header className="flex justify-between items-end border-b border-academic-border pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-academic-primary italic">Certifications</h1>
                    <p className="text-academic-muted text-sm mt-2 tracking-wide uppercase font-bold">Academic & Professional Credentials</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-academic-primary text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-academic-accent transition-all"
                >
                    <Plus size={16} /> Register New Credential
                </button>
            </header>

            {(isAdding || editingId) && (
                <div className="bg-academic-paper border border-academic-border p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-lg font-serif italic text-academic-primary mb-6 border-b border-academic-border pb-2">
                        {editingId ? 'Edit Credential Record' : 'New Credential Registration'}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Title / Designation</label>
                            <input name="title" required defaultValue={certificates?.find(c => c.id === editingId)?.title} className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Issuing Authority</label>
                            <input name="issuer" required defaultValue={certificates?.find(c => c.id === editingId)?.issuer} className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Date of Achievement</label>
                            <input name="date" required defaultValue={certificates?.find(c => c.id === editingId)?.date} placeholder="e.g. June 2023" className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Category</label>
                            <input name="category" required defaultValue={certificates?.find(c => c.id === editingId)?.category} className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Credential Link (URL)</label>
                            <input name="credential_link" defaultValue={certificates?.find(c => c.id === editingId)?.credential_link} className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Brief Summary</label>
                            <textarea name="description" rows={3} defaultValue={certificates?.find(c => c.id === editingId)?.description} className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                        </div>
                        <div className="flex justify-end gap-4 md:col-span-2 mt-4">
                            <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-academic-muted hover:text-academic-primary">Cancel</button>
                            <button type="submit" className="bg-academic-primary text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-academic-accent">Commit Record</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificates?.map((cert) => (
                    <div key={cert.id} className="group bg-academic-bg border border-academic-border p-6 hover:shadow-md transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button onClick={() => setEditingId(cert.id as number)} className="p-2 bg-academic-paper border border-academic-border text-academic-muted hover:text-academic-primary">
                                <Edit3 size={14} />
                            </button>
                            <button onClick={async () => { if(confirm('Delete record?')) { await deleteCertificate(cert.id as number); refetch(); } }} className="p-2 bg-academic-paper border border-academic-border text-academic-muted hover:text-red-600">
                                <Trash2 size={14} />
                            </button>
                        </div>
                        
                        <div className="mb-4 text-academic-accent">
                            <Award size={32} strokeWidth={1.5} />
                        </div>
                        
                        <h3 className="font-serif italic text-xl text-academic-primary mb-1">{cert.title}</h3>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-4">
                            <Briefcase size={12} /> {cert.issuer}
                        </div>
                        
                        <p className="text-sm text-academic-text line-clamp-3 mb-6 min-h-[4.5rem]">
                            {cert.description}
                        </p>
                        
                        <div className="flex justify-between items-center border-t border-academic-border pt-4">
                            <div className="flex items-center gap-1.5 text-[10px] text-academic-muted italic">
                                <Calendar size={12} /> {cert.date}
                            </div>
                            {cert.credential_link && (
                                <a href={cert.credential_link} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase font-bold tracking-widest text-academic-accent hover:underline flex items-center gap-1">
                                    Verify <ExternalLink size={10} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
