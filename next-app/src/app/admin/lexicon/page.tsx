'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Plus, Edit2, Trash2, X, Save, Search, ExternalLink, CheckCircle2, 
  XCircle, Filter, BookOpen, Sparkles, Layers, ArrowUpDown
} from 'lucide-react';
import { 
  getAdminLexiconWords, 
  createLexiconWord, 
  updateLexiconWord, 
  deleteLexiconWord, 
  togglePublishLexiconWord,
  LexiconWordItem 
} from '../../../lib/actions/lexiconActions';

const CATEGORY_OPTIONS = [
  'Engineering & Technical',
  'Intelligence & Curiosity',
  'Growth & Mastery',
  'Character & Values',
  'Ambition & Execution',
  'Creativity & Paradox',
  'Philosophy & Existence',
  'Systems & Strategy'
];

export default function LexiconAdminPage() {
  const [words, setWords] = useState<LexiconWordItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  const loadWords = async () => {
    setIsLoading(true);
    try {
      const data = await getAdminLexiconWords();
      setWords(data);
    } catch (err) {
      console.error('Failed to load words:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWords();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const res = await createLexiconWord(formData);
    setIsSubmitting(false);

    if (res.success) {
      setIsAdding(false);
      await loadWords();
    } else {
      alert('Error creating word: ' + res.error);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const res = await updateLexiconWord(id, formData);
    setIsSubmitting(false);

    if (res.success) {
      setEditingId(null);
      await loadWords();
    } else {
      alert('Error updating word: ' + res.error);
    }
  };

  const handleDelete = async (id: number, wordTitle: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete the concept "${wordTitle}"?`);
    if (!confirmed) return;

    const res = await deleteLexiconWord(id);
    if (res.success) {
      await loadWords();
    } else {
      alert('Error deleting word: ' + res.error);
    }
  };

  const handleTogglePublish = async (id: number, currentStatus: boolean) => {
    const res = await togglePublishLexiconWord(id, currentStatus);
    if (res.success) {
      setWords(prev => prev.map(w => w.id === id ? { ...w, isPublished: !currentStatus } : w));
    } else {
      alert('Error updating status: ' + res.error);
    }
  };

  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (w.shortMeaning && w.shortMeaning.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (w.personalNote && w.personalNote.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        filterCategory === 'ALL' ||
        w.category === filterCategory ||
        w.categories.includes(filterCategory);

      const matchesStatus =
        filterStatus === 'ALL' ||
        (filterStatus === 'PUBLISHED' && w.isPublished) ||
        (filterStatus === 'DRAFT' && !w.isPublished);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [words, searchQuery, filterCategory, filterStatus]);

  const editingWord = useMemo(() => {
    return words.find(w => w.id === editingId);
  }, [words, editingId]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-academic-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="text-academic-accent w-6 h-6" />
            <h1 className="text-3xl font-serif font-bold text-academic-primary italic">
              Lexicon Universe
            </h1>
          </div>
          <p className="text-xs text-academic-muted mt-1 font-sans">
            Manage your personal collection of concepts, philosophies, and engineering principles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/lexicon"
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2 border border-academic-border text-academic-muted hover:text-academic-primary bg-academic-paper text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <ExternalLink size={13} /> View Live Universe
          </Link>

          <button
            onClick={() => { setIsAdding(true); setEditingId(null); }}
            className="flex items-center gap-2 px-5 py-2 bg-academic-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-academic-accent transition-colors shadow-sm"
          >
            <Plus size={14} /> New Concept
          </button>
        </div>
      </div>

      {/* Stats Summary Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="academic-card p-4">
          <p className="text-[10px] uppercase tracking-widest text-academic-muted font-bold">Total Concepts</p>
          <p className="text-2xl font-serif font-bold text-academic-primary mt-1">{words.length}</p>
        </div>
        <div className="academic-card p-4">
          <p className="text-[10px] uppercase tracking-widest text-academic-muted font-bold">Published</p>
          <p className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {words.filter(w => w.isPublished).length}
          </p>
        </div>
        <div className="academic-card p-4">
          <p className="text-[10px] uppercase tracking-widest text-academic-muted font-bold">Drafts / Hidden</p>
          <p className="text-2xl font-serif font-bold text-amber-600 dark:text-amber-400 mt-1">
            {words.filter(w => !w.isPublished).length}
          </p>
        </div>
        <div className="academic-card p-4">
          <p className="text-[10px] uppercase tracking-widest text-academic-muted font-bold">Anchor Philosophies</p>
          <p className="text-2xl font-serif font-bold text-academic-accent mt-1">
            {words.filter(w => w.importance === 3).length}
          </p>
        </div>
      </div>

      {/* Add New Word Form Modal/Card */}
      {isAdding && (
        <div className="bg-academic-paper border border-academic-border p-6 md:p-8 shadow-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-academic-border">
            <h2 className="text-xl font-serif italic text-academic-primary font-bold">
              Append New Concept to Lexicon
            </h2>
            <button onClick={() => setIsAdding(false)} className="text-academic-muted hover:text-academic-primary">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Word / Concept *</label>
              <input name="word" required placeholder="e.g. Antifragility" className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Slug (optional)</label>
              <input name="slug" placeholder="leave blank to auto-generate" className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs font-mono" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Primary Category *</label>
              <select name="category" required defaultValue="Engineering & Technical" className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs">
                {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Secondary Categories (comma-separated)</label>
              <input name="categories" placeholder="e.g. Systems & Strategy, Philosophy & Existence" className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Importance / Prominence</label>
              <select name="importance" defaultValue="1" className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs">
                <option value="1">1 - Standard Concept</option>
                <option value="2">2 - Notable Theme</option>
                <option value="3">3 - Anchor Philosophy (Core)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Visual Font Scale</label>
              <select name="fontSize" defaultValue="md" className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs">
                <option value="sm">sm - Subtle / Compact</option>
                <option value="md">md - Standard Body</option>
                <option value="lg">lg - Prominent</option>
                <option value="xl">xl - Monumental / Anchor</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Motion Style</label>
              <select name="animationStyle" defaultValue="drift-slow" className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs">
                <option value="drift-slow">drift-slow (Default)</option>
                <option value="drift-gentle">drift-gentle</option>
                <option value="float-subtle">float-subtle</option>
                <option value="orbit-slow">orbit-slow</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Sort Order</label>
              <input name="sortOrder" type="number" defaultValue="0" className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs" />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Short Meaning / Definition</label>
              <textarea name="shortMeaning" placeholder="The concise definition or conceptual essence..." rows={2} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs" />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Personal Reflection / In Practice</label>
              <textarea name="personalNote" placeholder="How this applies in engineering or worldview..." rows={2} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs italic font-serif" />
            </div>

            <div className="md:col-span-3 flex items-center justify-between pt-4 border-t border-academic-border">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider text-academic-primary">
                <input name="isPublished" type="checkbox" defaultChecked className="w-4 h-4 accent-academic-primary" />
                Publish Immediately
              </label>

              <div className="flex gap-3">
                <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2 border border-academic-border text-xs uppercase font-bold tracking-wider">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-8 py-2.5 bg-academic-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-academic-accent transition-colors disabled:opacity-50">
                  <Save size={14} /> {isSubmitting ? 'Saving...' : 'Commit Record'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Edit Word Form Modal/Card */}
      {editingWord && (
        <div className="bg-academic-paper border-2 border-academic-accent/40 p-6 md:p-8 shadow-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-academic-border">
            <div>
              <h2 className="text-xl font-serif italic text-academic-primary font-bold">
                Edit Concept: {editingWord.word}
              </h2>
              <p className="text-xs font-mono text-academic-muted">ID #{editingWord.id} • Slug: {editingWord.slug}</p>
            </div>
            <button onClick={() => setEditingId(null)} className="text-academic-muted hover:text-academic-primary">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={(e) => handleUpdateSubmit(e, editingWord.id)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Word / Concept *</label>
              <input name="word" required defaultValue={editingWord.word} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Slug</label>
              <input name="slug" defaultValue={editingWord.slug} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs font-mono" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Primary Category *</label>
              <select name="category" required defaultValue={editingWord.category} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs">
                {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Secondary Categories (comma-separated)</label>
              <input name="categories" defaultValue={editingWord.categories?.join(', ')} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Importance / Prominence</label>
              <select name="importance" defaultValue={editingWord.importance} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs">
                <option value="1">1 - Standard Concept</option>
                <option value="2">2 - Notable Theme</option>
                <option value="3">3 - Anchor Philosophy (Core)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Visual Font Scale</label>
              <select name="fontSize" defaultValue={editingWord.fontSize} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs">
                <option value="sm">sm - Subtle / Compact</option>
                <option value="md">md - Standard Body</option>
                <option value="lg">lg - Prominent</option>
                <option value="xl">xl - Monumental / Anchor</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Motion Style</label>
              <select name="animationStyle" defaultValue={editingWord.animationStyle} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs">
                <option value="drift-slow">drift-slow (Default)</option>
                <option value="drift-gentle">drift-gentle</option>
                <option value="float-subtle">float-subtle</option>
                <option value="orbit-slow">orbit-slow</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Sort Order</label>
              <input name="sortOrder" type="number" defaultValue={editingWord.sortOrder} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs" />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Short Meaning / Definition</label>
              <textarea name="shortMeaning" defaultValue={editingWord.shortMeaning || ''} rows={2} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs" />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-academic-muted">Personal Reflection / In Practice</label>
              <textarea name="personalNote" defaultValue={editingWord.personalNote || ''} rows={2} className="w-full bg-academic-bg border border-academic-border p-2.5 text-sm rounded-xs italic font-serif" />
            </div>

            <div className="md:col-span-3 flex items-center justify-between pt-4 border-t border-academic-border">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider text-academic-primary">
                <input name="isPublished" type="checkbox" defaultChecked={editingWord.isPublished} className="w-4 h-4 accent-academic-primary" />
                Published
              </label>

              <div className="flex gap-3">
                <button type="button" onClick={() => setEditingId(null)} className="px-5 py-2 border border-academic-border text-xs uppercase font-bold tracking-wider">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-8 py-2.5 bg-academic-accent text-white text-xs font-bold uppercase tracking-widest hover:bg-academic-primary transition-colors disabled:opacity-50">
                  <Save size={14} /> {isSubmitting ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-academic-paper border border-academic-border p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-academic-muted" />
          <input
            type="text"
            placeholder="Search words, notes, or definitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-academic-bg border border-academic-border text-academic-text placeholder:text-academic-muted focus:outline-none focus:ring-1 focus:ring-academic-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs bg-academic-bg border border-academic-border px-3 py-2 text-academic-text focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="text-xs bg-academic-bg border border-academic-border px-3 py-2 text-academic-text focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Drafts / Hidden</option>
          </select>

          <span className="text-xs font-mono text-academic-muted ml-auto md:ml-2">
            Showing {filteredWords.length} of {words.length}
          </span>
        </div>
      </div>

      {/* Words Table */}
      {isLoading ? (
        <div className="p-12 text-center italic text-academic-muted font-serif">
          Indexing Lexicon Universe from database...
        </div>
      ) : filteredWords.length === 0 ? (
        <div className="academic-card p-12 text-center">
          <p className="text-academic-muted font-serif italic text-base">
            No words found matching the current search and filter criteria.
          </p>
        </div>
      ) : (
        <div className="bg-academic-paper border border-academic-border overflow-x-auto shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-academic-bg/80 border-b border-academic-border text-[10px] uppercase tracking-widest text-academic-muted font-bold">
                <th className="p-4 w-12 text-center">#</th>
                <th className="p-4">Concept / Word</th>
                <th className="p-4">Category</th>
                <th className="p-4 w-32">Importance</th>
                <th className="p-4 w-28 text-center">Status</th>
                <th className="p-4 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-academic-border text-xs">
              {filteredWords.map((item) => (
                <tr key={item.id} className="hover:bg-academic-bg/50 transition-colors">
                  <td className="p-4 text-center font-mono text-academic-muted text-[11px]">
                    {item.sortOrder}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-academic-primary text-base">
                        {item.word}
                      </span>
                      {item.importance === 3 && (
                        <span title="Anchor Philosophy" className="w-1.5 h-1.5 rounded-full bg-academic-accent" />
                      )}
                    </div>
                    {item.shortMeaning && (
                      <p className="text-[11px] text-academic-muted line-clamp-1 max-w-md mt-0.5">
                        {item.shortMeaning}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-academic-bg border border-academic-border text-academic-text">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {item.importance === 3 ? (
                        <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                          <Sparkles size={12} /> Anchor
                        </span>
                      ) : item.importance === 2 ? (
                        <span className="text-academic-primary font-medium">Notable</span>
                      ) : (
                        <span className="text-academic-muted">Standard</span>
                      )}
                      <span className="text-academic-muted/50 font-mono text-[10px]">({item.fontSize})</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleTogglePublish(item.id, item.isPublished)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        item.isPublished
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20 hover:bg-zinc-500/20'
                      }`}
                      title="Click to toggle publish status"
                    >
                      {item.isPublished ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                      {item.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setEditingId(item.id); setIsAdding(false); }}
                        className="p-1.5 text-academic-muted hover:text-academic-primary hover:bg-academic-bg rounded-xs transition-colors"
                        title="Edit concept"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.word)}
                        className="p-1.5 text-academic-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xs transition-colors"
                        title="Delete concept"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
