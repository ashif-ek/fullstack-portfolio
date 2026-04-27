'use client';
import React, { useState } from 'react';
import { useSkills } from '../../../hooks/useSkills';
import { createSkill, updateSkill, deleteSkill } from '../../../lib/actions/contentActions';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export default function SkillsAdminPage() {
    const { data: skills = [], isLoading, mutate } = useSkills();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id?: number) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = id ? await updateSkill(id, formData) : await createSkill(formData);
        
        if (res.success) {
            setEditingId(null);
            setIsAdding(false);
            mutate();
        } else {
            alert('Error: ' + res.error);
        }
    };

    if (isLoading) return <div className="p-8 italic text-academic-muted">Indexing Knowledge Base...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-10 border-b border-academic-border pb-6">
                <h1 className="text-3xl font-serif font-bold text-academic-primary italic">Technical Matrices</h1>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-academic-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-academic-accent transition-colors"
                >
                    <Plus size={14} /> Append Skill
                </button>
            </div>

            {isAdding && (
                <div className="bg-academic-paper border border-academic-border p-8 mb-10 shadow-lg animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-serif italic text-academic-primary">New Skill Specification</h2>
                        <button onClick={() => setIsAdding(false)}><X size={18} /></button>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Name</label>
                            <input name="name" required className="w-full bg-academic-bg border border-academic-border p-2 text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Proficiency (%)</label>
                            <input name="level" type="number" required className="w-full bg-academic-bg border border-academic-border p-2 text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Category</label>
                            <input name="category" required className="w-full bg-academic-bg border border-academic-border p-2 text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Color (HEX)</label>
                            <input name="color" defaultValue="#44B78B" className="w-full bg-academic-bg border border-academic-border p-2 text-sm" />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Description</label>
                            <textarea name="description" className="w-full bg-academic-bg border border-academic-border p-2 text-sm" rows={2} />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-academic-primary text-white text-xs font-bold uppercase tracking-widest">
                                <Save size={14} /> Commit Record
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-academic-bg border border-academic-border overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-academic-paper/50 border-b border-academic-border">
                            <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-academic-muted text-left">Skill Identification</th>
                            <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-academic-muted text-left">Classification</th>
                            <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-academic-muted text-center">Level</th>
                            <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-academic-muted text-right">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill: any) => (
                            <tr key={skill.id} className="border-b border-academic-border hover:bg-academic-paper transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }} />
                                        <span className="text-sm font-medium text-academic-primary">{skill.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-xs italic text-academic-muted">{skill.category}</td>
                                <td className="p-4 text-center">
                                    <span className="text-xs font-serif text-academic-accent font-bold">{skill.level}%</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-academic-muted hover:text-academic-primary"><Edit2 size={16} /></button>
                                        <button 
                                            onClick={() => { if(confirm('Purge skill record?')) deleteSkill(skill.id).then(() => mutate()) }}
                                            className="text-red-400 hover:text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
