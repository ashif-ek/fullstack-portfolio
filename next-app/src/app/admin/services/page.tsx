'use client';
import React, { useState } from 'react';
import { useServices } from '../../../hooks/useServices';
import { createService, updateService, deleteService } from '../../../lib/actions/contentActions';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export default function ServicesAdminPage() {
    const { data: services = [], isLoading, refetch: mutate } = useServices();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id?: number) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = id ? await updateService(id, formData) : await createService(formData);
        
        if (res.success) {
            setEditingId(null);
            setIsAdding(false);
            mutate();
        } else {
            alert('Error: ' + res.error);
        }
    };

    if (isLoading) return <div className="p-8 italic text-academic-muted">Synchronizing Service Protocols...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-10 border-b border-academic-border pb-6">
                <h1 className="text-3xl font-serif font-bold text-academic-primary italic">Service Offerings</h1>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-academic-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-academic-accent transition-colors"
                >
                    <Plus size={14} /> Register New Service
                </button>
            </div>

            {isAdding && (
                <div className="bg-academic-paper border border-academic-border p-8 mb-10 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-serif italic text-academic-primary">Service Definition</h2>
                        <button onClick={() => setIsAdding(false)}><X size={18} /></button>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Title</label>
                                <input name="title" required className="w-full bg-academic-bg border border-academic-border p-2 text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Icon Reference (Lucide)</label>
                                <input name="icon" defaultValue="CodeIcon" className="w-full bg-academic-bg border border-academic-border p-2 text-sm" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Description</label>
                            <textarea name="description" required className="w-full bg-academic-bg border border-academic-border p-2 text-sm" rows={3} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-academic-primary text-white text-xs font-bold uppercase tracking-widest">
                                <Save size={14} /> Commit Service
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service: any) => (
                    <div key={service.id} className="bg-academic-bg border border-academic-border p-6 shadow-sm hover:shadow-md transition-all group relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-academic-accent">
                                {/* Icon placeholder */}
                                <div className="w-10 h-10 border border-academic-border flex items-center justify-center font-mono text-[10px] uppercase">
                                    {service.icon}
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { if(confirm('Purge service record?')) deleteService(service.id).then(() => mutate()) }} className="text-red-400 hover:text-red-600 p-1">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-academic-primary mb-2">{service.title}</h3>
                        <p className="text-xs text-academic-muted leading-relaxed line-clamp-3 italic">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
