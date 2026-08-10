'use client';
import React, { useState, useEffect } from 'react';
import { 
  createCreativeLabItem, 
  updateCreativeLabItem, 
  deleteCreativeLabItem, 
  getCloudinarySignature,
  getAdminCreativeLabItems
} from '../../../lib/actions/creativeLabActions';
import { CreativeLabItem, CreativeLabMediaType, CreativeLabCategory } from '@prisma/client';
import Image from 'next/image';

export default function CreativeLabAdminPage() {
    const [items, setItems] = useState<CreativeLabItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedMedia, setUploadedMedia] = useState<{
        url: string;
        publicId: string;
        resourceType: string;
        thumbnailUrl: string | null;
        mediaType: CreativeLabMediaType;
    } | null>(null);

    const loadItems = async () => {
        setIsLoading(true);
        const data = await getAdminCreativeLabItems();
        setItems(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadItems();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        const isVideo = file.type.startsWith('video/');
        const isImage = file.type.startsWith('image/');
        if (!isVideo && !isImage) {
            alert('Unsupported file format. Please upload an image or video.');
            return;
        }
        if (file.size > 100 * 1024 * 1024) {
            alert('File is too large. Maximum size is 100MB.');
            return;
        }

        setUploading(true);
        setUploadProgress(10);

        try {
            // Get signature
            const { signature, timestamp, cloudName, apiKey, folder } = await getCloudinarySignature('creative_lab');
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', apiKey || '');
            formData.append('timestamp', timestamp.toString());
            formData.append('signature', signature);
            formData.append('folder', folder);

            setUploadProgress(50);

            // Upload directly to Cloudinary
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload to Cloudinary');
            }

            const data = await response.json();
            setUploadProgress(100);
            
            let thumbnailUrl = null;
            if (data.resource_type === 'video') {
                // Cloudinary generates a thumbnail automatically by changing the extension to .jpg
                thumbnailUrl = data.secure_url.replace(/\.[^/.]+$/, ".jpg");
            }

            setUploadedMedia({
                url: data.secure_url,
                publicId: data.public_id,
                resourceType: data.resource_type,
                thumbnailUrl,
                mediaType: isVideo ? 'VIDEO' : (file.type === 'image/gif' ? 'GIF' : 'IMAGE')
            });

        } catch (error: any) {
            alert('Upload error: ' + error.message);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>, id?: number) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        if (uploadedMedia) {
            formData.set('mediaUrl', uploadedMedia.url);
            formData.set('mediaType', uploadedMedia.mediaType);
            formData.set('cloudinaryPublicId', uploadedMedia.publicId);
            formData.set('cloudinaryResourceType', uploadedMedia.resourceType);
            if (uploadedMedia.thumbnailUrl) {
                formData.set('thumbnailUrl', uploadedMedia.thumbnailUrl);
            }
        }

        const isPublished = (form.elements.namedItem('published') as HTMLInputElement).checked;
        const isFeatured = (form.elements.namedItem('featured') as HTMLInputElement).checked;
        formData.set('published', isPublished.toString());
        formData.set('featured', isFeatured.toString());

        let res;
        if (id) {
            res = await updateCreativeLabItem(id, formData);
        } else {
            if (!uploadedMedia && !formData.get('mediaUrl')) {
                alert('Please upload media first.');
                return;
            }
            res = await createCreativeLabItem(formData);
        }

        if (res.success) {
            setIsCreating(false);
            setIsEditing(null);
            setUploadedMedia(null);
            loadItems();
        } else {
            alert('Error saving: ' + res.error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        const res = await deleteCreativeLabItem(id);
        if (res.success) {
            loadItems();
        } else {
            alert('Error deleting: ' + res.error);
        }
    };

    if (isLoading) return <div className="p-8 text-academic-text">Loading...</div>;

    const renderForm = (item?: CreativeLabItem) => (
        <form onSubmit={(e) => handleSave(e, item?.id)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" placeholder="Title" defaultValue={item?.title} required className="w-full p-2 border border-academic-border" />
                <input name="slug" placeholder="Slug (e.g. ai-visual-1)" defaultValue={item?.slug} required className="w-full p-2 border border-academic-border" />
            </div>
            
            <textarea name="description" placeholder="Description" defaultValue={item?.description} required className="w-full p-2 border border-academic-border min-h-[100px]" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select name="category" defaultValue={item?.category || 'EXPERIMENT'} className="w-full p-2 border border-academic-border">
                    <option value="AI_VIDEO">AI Video</option>
                    <option value="AI_VISUAL">AI Visual</option>
                    <option value="CREATIVE_CODE">Creative Code</option>
                    <option value="ANIMATION">Animation</option>
                    <option value="EXPERIMENT">Experiment</option>
                    <option value="OTHER">Other</option>
                </select>
                <input name="tools" placeholder="Tools (comma separated, e.g. Runway, Midjourney)" defaultValue={item?.tools?.join(', ')} className="w-full p-2 border border-academic-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="duration" placeholder="Duration (e.g. 0:15) Optional" defaultValue={item?.duration || ''} className="w-full p-2 border border-academic-border" />
                <input name="sortOrder" type="number" placeholder="Sort Order (0)" defaultValue={item?.sortOrder} className="w-full p-2 border border-academic-border" />
            </div>

            <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="published" defaultChecked={item?.published} />
                    <span>Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="featured" defaultChecked={item?.featured} />
                    <span>Featured</span>
                </label>
            </div>

            <div className="border border-academic-border p-4 bg-academic-bg/50">
                <h3 className="font-bold mb-2">Media</h3>
                
                {/* Fallback hidden inputs if they don't upload new media */}
                {item && !uploadedMedia && (
                    <>
                        <input type="hidden" name="mediaUrl" value={item.mediaUrl} />
                        <input type="hidden" name="mediaType" value={item.mediaType} />
                        <input type="hidden" name="cloudinaryPublicId" value={item.cloudinaryPublicId || ''} />
                        <input type="hidden" name="cloudinaryResourceType" value={item.cloudinaryResourceType || ''} />
                        <input type="hidden" name="thumbnailUrl" value={item.thumbnailUrl || ''} />
                        <div className="mb-4 text-sm break-all">Current media: {item.mediaUrl}</div>
                    </>
                )}

                <div className="flex flex-col gap-2">
                    <label className="academic-button cursor-pointer inline-block text-center w-auto bg-academic-border/30">
                        {uploading ? `Uploading... ${uploadProgress}%` : 'Upload New Media (Direct to Cloudinary)'}
                        <input type="file" className="hidden" accept="video/*,image/*" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                </div>

                {uploadedMedia && (
                    <div className="mt-4 p-2 bg-green-100/10 border border-green-500/30 rounded">
                        <p className="text-sm font-bold text-green-600 mb-1">Upload Successful!</p>
                        <p className="text-xs break-all text-academic-text/70">{uploadedMedia.url}</p>
                    </div>
                )}
            </div>

            <div className="flex gap-4 pt-4">
                <button type="submit" className="academic-button bg-academic-primary text-white disabled:opacity-50" disabled={uploading}>
                    {item ? 'Update Item' : 'Create Item'}
                </button>
                <button type="button" onClick={() => { setIsCreating(false); setIsEditing(null); setUploadedMedia(null); }} className="academic-button">
                    Cancel
                </button>
            </div>
        </form>
    );

    return (
        <div className="text-academic-text pb-20">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-academic-primary italic">Creative Lab</h1>
                <button 
                    onClick={() => { setIsCreating(true); setIsEditing(null); setUploadedMedia(null); }}
                    className="academic-button bg-academic-primary text-white"
                >
                    Add Experiment
                </button>
            </div>

            {isCreating && (
                <div className="bg-academic-paper p-6 border border-academic-border mb-8 shadow-sm">
                    <h2 className="text-xl font-serif text-academic-primary mb-4">Create New Experiment</h2>
                    {renderForm()}
                </div>
            )}

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="bg-academic-paper p-6 border border-academic-border shadow-sm flex flex-col md:flex-row justify-between gap-6">
                        {isEditing === item.id ? (
                            <div className="w-full">
                                {renderForm(item)}
                            </div>
                        ) : (
                            <>
                                <div className="flex gap-4 flex-1">
                                    <div className="w-32 h-20 bg-academic-border/30 relative flex-shrink-0 overflow-hidden rounded">
                                        {item.thumbnailUrl || item.mediaType !== 'VIDEO' ? (
                                            <Image src={item.thumbnailUrl || item.mediaUrl} alt={item.title} fill className="object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-xs text-academic-muted">VIDEO</div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-serif text-academic-primary font-bold">{item.title}</h3>
                                            {!item.published && <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded uppercase font-bold">Draft</span>}
                                            {item.featured && <span className="text-[10px] bg-academic-primary/10 text-academic-primary px-2 py-0.5 rounded uppercase font-bold">Featured</span>}
                                        </div>
                                        <p className="text-academic-muted text-sm line-clamp-2 mb-2">{item.description}</p>
                                        <div className="text-xs font-bold text-academic-muted/70 uppercase tracking-wider flex gap-3">
                                            <span>{item.category.replace('_', ' ')}</span>
                                            <span>•</span>
                                            <span>{item.mediaType}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 shrink-0 justify-start">
                                    <button onClick={() => { setIsEditing(item.id); setIsCreating(false); setUploadedMedia(null); }} className="text-sm font-bold text-academic-primary hover:text-academic-accent uppercase tracking-widest text-right">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-sm font-bold text-red-600 hover:text-red-800 uppercase tracking-widest text-right">Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
                
                {items.length === 0 && !isCreating && (
                    <div className="p-8 text-center text-academic-muted border border-dashed border-academic-border">
                        No items found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
