'use client';
import React, { useState } from 'react';
import { useBlogs } from '../../../hooks/useBlogs';
import { createBlog, updateBlog, deleteBlog } from '../../../lib/actions/contentActions';
import { FileText, Plus, Trash2, Edit3, Calendar, Tag, Clock, Eye } from 'lucide-react';

export default function BlogsAdmin() {
    const { data: blogs, isLoading, refetch } = useBlogs();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = editingId 
            ? await updateBlog(editingId, formData)
            : await createBlog(formData);
        
        if (res.success) {
            setIsAdding(false);
            setEditingId(null);
            refetch();
        } else {
            alert('Operation failed: ' + res.error);
        }
    };

    if (isLoading) return <div className="p-8 text-academic-muted italic">Polling Knowledge Base...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            <header className="flex justify-between items-end border-b border-academic-border pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-academic-primary italic">Academic Blog</h1>
                    <p className="text-academic-muted text-sm mt-2 tracking-wide uppercase font-bold">Research Papers & Articles Management</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-academic-primary text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-academic-accent transition-all"
                >
                    <Plus size={16} /> Draft New Publication
                </button>
            </header>

            {(isAdding || editingId) && (
                <div className="bg-academic-paper border border-academic-border p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-lg font-serif italic text-academic-primary mb-6 border-b border-academic-border pb-2">
                        {editingId ? 'Edit Publication Draft' : 'New Publication Record'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Article Title</label>
                                <input name="title" required defaultValue={blogs?.find(b => b.id === editingId)?.title} className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Unique Slug (URL)</label>
                                <input name="slug" required defaultValue={blogs?.find(b => b.id === editingId)?.slug} placeholder="e.g. future-of-ai" className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Classification (Category)</label>
                                <input name="category" required defaultValue={blogs?.find(b => b.id === editingId)?.category} className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Estimated Reading Time</label>
                                <input name="readTime" required defaultValue={blogs?.find(b => b.id === editingId)?.readTime} placeholder="e.g. 5 min read" className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Excerpt (Brief Summary)</label>
                            <textarea name="excerpt" rows={2} defaultValue={blogs?.find(b => b.id === editingId)?.excerpt} className="w-full bg-academic-bg border border-academic-border p-3 outline-none focus:border-academic-accent text-sm" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Publication Body (Markdown Support)</label>
                            <textarea name="content" rows={12} defaultValue={blogs?.find(b => b.id === editingId)?.content} className="w-full bg-academic-bg border border-academic-border p-4 outline-none focus:border-academic-accent text-sm font-mono" />
                        </div>

                        <div className="flex justify-end gap-4 mt-4">
                            <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-academic-muted hover:text-academic-primary">Discard Changes</button>
                            <button type="submit" className="bg-academic-primary text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-academic-accent">Synchronize Publication</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {blogs?.map((blog) => (
                    <div key={blog.id} className="group flex items-center justify-between bg-academic-bg border border-academic-border p-6 hover:shadow-sm transition-all">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-serif italic text-xl text-academic-primary">{blog.title}</h3>
                                <span className="text-[10px] bg-academic-paper border border-academic-border px-2 py-0.5 uppercase tracking-widest font-bold text-academic-muted">{blog.category}</span>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] text-academic-muted uppercase tracking-widest font-bold">
                                <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(blog.date).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1"><Clock size={10} /> {blog.readTime}</span>
                                <span className="flex items-center gap-1 text-academic-accent lowercase italic"><Tag size={10} /> /{blog.slug}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 ml-6">
                            <button onClick={() => setEditingId(blog.id as number)} className="p-3 bg-academic-paper border border-academic-border text-academic-muted hover:text-academic-primary transition-colors">
                                <Edit3 size={16} />
                            </button>
                            <button onClick={async () => { if(confirm('Permanently delete this publication?')) { await deleteBlog(blog.id as number); refetch(); } }} className="p-3 bg-academic-paper border border-academic-border text-academic-muted hover:text-red-600 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
