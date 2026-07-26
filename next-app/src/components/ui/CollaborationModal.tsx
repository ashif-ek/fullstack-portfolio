'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { submitCollaborationRequest } from '../../app/actions/collaboration';
import { CollaborationRequestSchema, CollaborationRequestInput } from '../../lib/validations/collaboration';
import { Toast } from './Toast';

interface CollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CollaborationModal({ isOpen, onClose }: CollaborationModalProps) {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CollaborationRequestInput>({
    resolver: zodResolver(CollaborationRequestSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      role: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
    }
  });

  const onSubmit = async (data: CollaborationRequestInput) => {
    setSubmitError('');
    try {
      const result = await submitCollaborationRequest(data);
      if (result.success) {
        setToastMessage('Collaboration request submitted successfully. I will be in touch soon!');
        setShowToast(true);
        reset();
        onClose();
      } else {
        setSubmitError(result.error || 'Something went wrong.');
      }
    } catch (err) {
      setSubmitError('An unexpected error occurred.');
    }
  };

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto pt-20 pb-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-academic-bg border border-academic-border shadow-2xl rounded-xl z-10 my-auto"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-academic-border bg-academic-paper rounded-t-xl">
                <h3 className="text-xl font-serif font-bold text-academic-primary">Request Collaboration</h3>
                <button
                  onClick={onClose}
                  className="text-academic-muted hover:text-academic-primary transition-colors p-1"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Full Name *</label>
                      <input
                        {...register('fullName')}
                        className="w-full bg-academic-paper border border-academic-border rounded-lg px-4 py-3 text-academic-primary placeholder-academic-muted/40 focus:border-academic-accent outline-none transition-colors"
                        placeholder="John Doe"
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Email *</label>
                      <input
                        {...register('email')}
                        className="w-full bg-academic-paper border border-academic-border rounded-lg px-4 py-3 text-academic-primary placeholder-academic-muted/40 focus:border-academic-accent outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Company</label>
                      <input
                        {...register('company')}
                        className="w-full bg-academic-paper border border-academic-border rounded-lg px-4 py-3 text-academic-primary placeholder-academic-muted/40 focus:border-academic-accent outline-none transition-colors"
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Role</label>
                      <input
                        {...register('role')}
                        className="w-full bg-academic-paper border border-academic-border rounded-lg px-4 py-3 text-academic-primary placeholder-academic-muted/40 focus:border-academic-accent outline-none transition-colors"
                        placeholder="CTO / Founder"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Project Type *</label>
                    <select
                      {...register('projectType')}
                      className="w-full bg-academic-paper border border-academic-border rounded-lg px-4 py-3 text-academic-primary focus:border-academic-accent outline-none transition-colors appearance-none"
                    >
                      <option value="">Select a project type...</option>
                      <option value="Full Stack Development">Full Stack Development</option>
                      <option value="Backend / API Design">Backend / API Design</option>
                      <option value="Frontend Architecture">Frontend Architecture</option>
                      <option value="Consulting / Code Audit">Consulting / Code Audit</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Budget</label>
                      <input
                        {...register('budget')}
                        className="w-full bg-academic-paper border border-academic-border rounded-lg px-4 py-3 text-academic-primary placeholder-academic-muted/40 focus:border-academic-accent outline-none transition-colors"
                        placeholder="e.g. $5,000 - $10,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Timeline</label>
                      <input
                        {...register('timeline')}
                        className="w-full bg-academic-paper border border-academic-border rounded-lg px-4 py-3 text-academic-primary placeholder-academic-muted/40 focus:border-academic-accent outline-none transition-colors"
                        placeholder="e.g. 2-3 months"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Message *</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      className="w-full bg-academic-paper border border-academic-border rounded-lg px-4 py-3 text-academic-primary placeholder-academic-muted/40 focus:border-academic-accent outline-none transition-colors resize-none"
                      placeholder="Tell me about your project, goals, and technical requirements..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <div className="pt-4 border-t border-academic-border flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-lg text-sm font-bold text-academic-muted hover:text-academic-primary transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-lg bg-academic-primary text-academic-bg text-sm font-bold hover:bg-academic-accent transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </>
  );
}
