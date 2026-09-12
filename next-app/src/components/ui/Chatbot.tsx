'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What does Ashif E.K build?",
  "Tell me about his projects",
  "What's his tech stack?",
  "Why hire Ashif E.K?"
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMsg].slice(-10) // Send only last 10 messages for context/limits
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble responding right now. Please try again or explore the portfolio directly." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="bg-academic-primary text-white p-4 rounded-full shadow-academic hover:shadow-lg transition-shadow flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-academic-primary focus:ring-offset-2"
              aria-label="Ask AI"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50 w-[calc(100vw-24px)] md:w-[380px] md:max-w-[calc(100vw-32px)] h-[550px] max-h-[calc(100dvh-80px)] md:max-h-[min(650px,calc(100vh-32px))] bg-academic-paper border border-academic-border shadow-md rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-academic-border bg-academic-bg">
              <div className="flex items-center gap-2">
                <div className="bg-academic-primary/10 p-2 rounded-lg">
                  <Bot className="w-5 h-5 text-academic-primary" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-academic-primary text-sm">Ashif E.K AI</h3>
                  <p className="text-xs text-academic-muted">Portfolio Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-academic-muted hover:text-academic-primary p-1 rounded-md transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-academic-bg/50">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-academic-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-academic-paper border border-academic-border p-3 rounded-2xl rounded-tl-sm text-sm text-academic-text shadow-sm">
                      Hi! I'm Ashif E.K's AI assistant. Ask me about his skills, projects, experience, or background.
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-4">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="text-left bg-academic-paper border border-academic-border px-3 py-2 rounded-lg text-sm text-academic-muted hover:text-academic-primary hover:border-academic-primary transition-colors flex items-center gap-2 w-fit shadow-sm"
                      >
                        <Sparkles className="w-3 h-3" />
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-academic-muted' : 'bg-academic-primary'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`p-3 text-sm shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-academic-primary text-white rounded-2xl rounded-tr-sm' 
                        : 'bg-academic-paper border border-academic-border text-academic-text rounded-2xl rounded-tl-sm'
                    } max-w-[85%]`}>
                      {msg.role === 'assistant' ? (
                        <div className="prose-chatbot overflow-hidden break-words">
                          <ReactMarkdown
                            components={{
                              a: ({ node, ...props }) => <a className="text-academic-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                              p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                              ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                              ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                              strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                              h1: ({ node, ...props }) => <h1 className="font-bold text-base mb-2" {...props} />,
                              h2: ({ node, ...props }) => <h2 className="font-bold text-sm mb-2" {...props} />,
                              h3: ({ node, ...props }) => <h3 className="font-semibold text-sm mb-1" {...props} />,
                              code: ({ node, ...props }) => <code className="bg-academic-bg px-1 py-0.5 rounded text-[11px] font-mono text-academic-primary" {...props} />
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-academic-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-academic-paper border border-academic-border p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center">
                    <Loader2 className="w-4 h-4 text-academic-primary animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-academic-border bg-academic-paper">
              <div className="relative flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(input);
                    }
                  }}
                  placeholder="Ask a question..."
                  className="w-full max-h-32 min-h-[44px] bg-academic-bg border border-academic-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-academic-primary resize-none placeholder-academic-muted"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  className="bg-academic-primary text-white p-2.5 rounded-xl flex-shrink-0 hover:bg-academic-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
