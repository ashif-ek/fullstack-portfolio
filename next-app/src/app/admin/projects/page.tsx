'use client';
import React, { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects';
import { createProject, updateProject, deleteProject } from '../../../lib/actions/projectActions';

export default function ProjectsAdminPage() {
    const { data: projects = [], isLoading, refetch: mutate } = useProjects();
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await createProject(formData);
        if (res.success) {
            setIsCreating(false);
            mutate();
        } else {
            alert('Error creating project: ' + res.error);
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await updateProject(id, formData);
        if (res.success) {
            setIsEditing(null);
            mutate();
        } else {
            alert('Error updating project: ' + res.error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        const res = await deleteProject(id);
        if (res.success) {
            mutate();
        } else {
            alert('Error deleting project: ' + res.error);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="text-academic-text">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-academic-primary italic">Manage Projects</h1>
                <button 
                    onClick={() => setIsCreating(true)}
                    className="academic-button bg-academic-primary text-white"
                >
                    Add Project
                </button>
            </div>

            {isCreating && (
                <div className="bg-academic-paper p-6 border border-academic-border mb-8 shadow-sm">
                    <h2 className="text-xl font-serif text-academic-primary mb-4">Create New Project</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <input name="title" placeholder="Title" required className="w-full p-2 border border-academic-border" />
                        <input name="slug" placeholder="Slug (e.g. my-project)" required className="w-full p-2 border border-academic-border" />
                        <textarea name="description" placeholder="Description" required className="w-full p-2 border border-academic-border" />
                        <input name="tags" placeholder="Tags (comma separated)" className="w-full p-2 border border-academic-border" />
                        <input name="link" placeholder="Live URL" className="w-full p-2 border border-academic-border" />
                        <input name="github" placeholder="GitHub URL" className="w-full p-2 border border-academic-border" />
                        <input name="order" type="number" placeholder="Order (0)" className="w-full p-2 border border-academic-border" />
                        <div className="flex gap-4 pt-4">
                            <button type="submit" className="academic-button bg-academic-primary text-white">Save</button>
                            <button type="button" onClick={() => setIsCreating(false)} className="academic-button">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {projects.map((project: any) => (
                    <div key={project.id} className="bg-academic-paper p-6 border border-academic-border shadow-sm flex flex-col md:flex-row justify-between gap-4">
                        {isEditing === project.id ? (
                            <form onSubmit={(e) => handleUpdate(e, project.id)} className="space-y-4 w-full">
                                <input name="title" defaultValue={project.title} required className="w-full p-2 border border-academic-border" />
                                <input name="slug" defaultValue={project.slug} required className="w-full p-2 border border-academic-border" />
                                <textarea name="description" defaultValue={project.description} required className="w-full p-2 border border-academic-border" />
                                <input name="tags" defaultValue={project.tags?.join(', ') || project.tags} className="w-full p-2 border border-academic-border" />
                                <input name="link" defaultValue={project.link} className="w-full p-2 border border-academic-border" />
                                <input name="github" defaultValue={project.github} className="w-full p-2 border border-academic-border" />
                                <input name="order" type="number" defaultValue={project.order} className="w-full p-2 border border-academic-border" />
                                <div className="flex gap-4 pt-2">
                                    <button type="submit" className="academic-button bg-academic-primary text-white">Update</button>
                                    <button type="button" onClick={() => setIsEditing(null)} className="academic-button">Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div>
                                    <h3 className="text-xl font-serif text-academic-primary font-bold">{project.title}</h3>
                                    <p className="text-academic-muted text-sm mt-1 mb-2">{project.description}</p>
                                    <div className="text-xs text-academic-muted space-x-4">
                                        <span>Slug: {project.slug}</span>
                                        <span>Order: {project.order}</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 shrink-0 items-start">
                                    <button onClick={() => setIsEditing(project.id)} className="text-sm font-bold text-academic-primary hover:text-academic-accent uppercase tracking-widest">Edit</button>
                                    <button onClick={() => handleDelete(project.id)} className="text-sm font-bold text-red-600 hover:text-red-800 uppercase tracking-widest">Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
