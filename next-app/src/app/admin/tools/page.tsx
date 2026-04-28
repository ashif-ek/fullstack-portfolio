'use client';
import React, { useState } from 'react';
import { useTools } from '../../../hooks/useTools';
import { createTool, deleteTool } from '../../../lib/actions/contentActions';
import { Box, Plus, Trash2, Code } from 'lucide-react';

export default function ToolsAdmin() {
    const { data: tools, isLoading, refetch } = useTools();
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await createTool(formData);
        if (res.success) {
            setIsAdding(false);
            refetch();
        } else {
            alert('Failed: ' + res.error);
        }
    };

    if (isLoading) return <div className="p-8 text-academic-muted italic">Polling Technical Inventory...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <header className="flex justify-between items-end border-b border-academic-border pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-academic-primary italic">Technical Matrices</h1>
                    <p className="text-academic-muted text-sm mt-2 tracking-wide uppercase font-bold">Tools & Technologies Library</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-academic-primary text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-academic-accent transition-all"
                >
                    <Plus size={16} /> Append Tool
                </button>
            </header>

            {isAdding && (
                <div className="bg-academic-paper border border-academic-border p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <form onSubmit={handleSubmit} className="flex gap-6 items-end">
                        <div className="flex-1 space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Technology Name</label>
                            <input name="name" required placeholder="e.g. Docker, Kubernetes" className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                        </div>
                        <div className="space-y-1 w-40">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Icon Reference</label>
                            <input name="icon" defaultValue="CodeIcon" className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-academic-muted">Cancel</button>
                            <button type="submit" className="bg-academic-primary text-white px-8 py-3 text-xs font-bold uppercase tracking-widest">Commit</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {tools?.map((tool) => (
                    <div key={tool.id} className="group flex items-center justify-between bg-academic-bg border border-academic-border p-4 hover:border-academic-accent transition-all">
                        <div className="flex items-center gap-3">
                            <div className="text-academic-muted group-hover:text-academic-accent transition-colors">
                                <Box size={18} strokeWidth={1.5} />
                            </div>
                            <span className="text-sm font-bold text-academic-primary tracking-tight">{tool.name}</span>
                        </div>
                        <button 
                            onClick={async () => { if(confirm('Remove tool?')) { await deleteTool(tool.id as number); refetch(); } }}
                            className="text-academic-muted hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
