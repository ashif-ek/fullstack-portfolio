'use client';
import React, { useState } from 'react';
import Api from '../../lib/api';

const SendIcon = () => (
  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-academic-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, succeeded: false, error: null as string | null });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, succeeded: false, error: null });

    try {
      await Api.post('/messages/', formData);
      setStatus({ submitting: false, succeeded: true, error: null });
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error("Transmission breakdown:", err);
      setStatus({
        submitting: false,
        succeeded: false,
        error: "Direct transmission failed. Please use electronic mail directly."
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-16 md:py-32 bg-academic-paper text-academic-text relative border-t border-academic-border">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="section-title">Correspondence</h2>
          <p className="text-academic-muted font-serif italic mt-2">Formal inquiries and collaboration proposals regarding technical ventures.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-12">
            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-academic-muted mb-4">Direct Contact</h3>
              <p className="text-xl font-serif text-academic-primary">ashifek11@gmail.com</p>
              <p className="text-sm text-academic-muted mt-2 font-light">+91 90374 99763</p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-academic-muted mb-4">Location</h3>
              <p className="text-lg font-serif text-academic-primary italic">Kerala, India</p>
              <p className="text-sm text-academic-muted mt-2 font-light">Available for remote collaboration worldwide.</p>
            </div>

            <div className="pt-8 border-t border-academic-border">
              <p className="text-[10px] uppercase tracking-widest text-academic-muted leading-loose">
                Adhering to principles of <br />
                <span className="text-academic-accent font-bold">Informativo</span> and <br />
                <span className="text-academic-secondary font-bold">Minimalist</span> design.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="academic-card !p-10">
              {status.succeeded ? (
                <div className="text-center py-12">
                  <p className="text-2xl font-serif italic text-academic-accent mb-4">Transmission Successful</p>
                  <p className="text-academic-muted font-light">Your inquiry has been recorded in the register. <br /> A response will be issued shortly.</p>
                  <button
                    onClick={() => setStatus({ submitting: false, succeeded: false, error: null })}
                    className="mt-8 text-xs uppercase tracking-widest font-bold text-academic-primary hover:text-academic-accent transition-colors"
                  >
                    Send Another Record
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Full Legal Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-academic-bg border-b border-academic-border px-0 py-4 text-academic-primary placeholder-academic-muted/30 focus:border-academic-accent outline-none transition-all duration-300 font-serif text-lg"
                      placeholder="e.g. Ashif E.K"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Electronic Mail Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-academic-bg border-b border-academic-border px-0 py-4 text-academic-primary placeholder-academic-muted/30 focus:border-academic-accent outline-none transition-all duration-300 font-serif text-lg"
                      placeholder="e.g. ashif@io.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Statement of Inquiry</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-academic-bg border-b border-academic-border px-0 py-4 text-academic-primary placeholder-academic-muted/30 focus:border-academic-accent outline-none transition-all duration-300 font-light resize-none h-32"
                      placeholder="Compose your message here..."
                    ></textarea>
                  </div>

                  {status.error && (
                    <p className="text-academic-accent text-[10px] italic">{status.error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="academic-button w-full py-5 text-xs uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-4"
                  >
                    {status.submitting ? (
                      <><SpinnerIcon /> Processing...</>
                    ) : (
                      <>Dispatch Correspondence <SendIcon /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
