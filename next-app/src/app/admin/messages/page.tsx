'use client';
import React from 'react';
import { useMessages } from '../../../hooks/useMessages';
import { deleteMessage, deleteAllMessages } from '../../../lib/actions/messageActions';
import { Mail, Trash2, Calendar, User, AtSign, Clock } from 'lucide-react';

export default function MessagesAdmin() {
    const { data: messages, isLoading, refetch } = useMessages();

    const handleDelete = async (id: number) => {
        if (confirm('Permanently delete this correspondence?')) {
            await deleteMessage(id);
            refetch();
        }
    };

    if (isLoading) return <div className="p-8 text-academic-muted italic">Scanning Correspondence...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-10">
            <header className="flex justify-between items-end border-b border-academic-border pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-academic-primary italic">Correspondence</h1>
                    <p className="text-academic-muted text-sm mt-2 tracking-wide uppercase font-bold">Inbound Inquiries & Messages</p>
                </div>
                {messages && messages.length > 0 && (
                    <button 
                        onClick={async () => { if(confirm('Purge all correspondence?')) { await deleteAllMessages(); refetch(); } }}
                        className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-100 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-all"
                    >
                        <Trash2 size={16} /> Purge Inbox
                    </button>
                )}
            </header>

            <div className="space-y-6">
                {(!messages || messages.length === 0) ? (
                    <div className="text-center py-20 border-2 border-dashed border-academic-border bg-academic-paper/30">
                        <Mail className="mx-auto text-academic-muted mb-4 opacity-30" size={48} strokeWidth={1} />
                        <p className="text-academic-muted font-serif italic text-lg">The inbox is currently vacant.</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="group bg-academic-bg border border-academic-border p-8 shadow-sm hover:border-academic-accent transition-all relative">
                            <div className="absolute top-6 right-8">
                                <button onClick={() => handleDelete(msg.id as number)} className="text-academic-muted hover:text-red-600 p-2 border border-academic-border bg-academic-paper">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-academic-border pb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-academic-paper text-academic-primary">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Sender</p>
                                        <p className="text-sm font-bold text-academic-primary">{msg.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-academic-paper text-academic-primary">
                                        <AtSign size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Email Address</p>
                                        <p className="text-sm font-bold text-academic-primary">{msg.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-academic-paper text-academic-primary">
                                        <Clock size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Timestamp</p>
                                        <p className="text-sm font-bold text-academic-primary italic">
                                            {new Date(msg.date).toLocaleDateString()} at {new Date(msg.date).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-sm max-w-none text-academic-text leading-relaxed font-serif text-lg italic opacity-90">
                                "{msg.message}"
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
