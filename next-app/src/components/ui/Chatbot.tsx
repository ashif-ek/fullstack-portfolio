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
  "Tech stack",
  "Projects",
  "Experience"
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
      {/* Floating Action Button / Launcher */}
      <div className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 flex flex-col items-center justify-center bg-academic-paper border border-academic-border shadow-sm hover:-translate-y-px transition-transform focus:outline-none"
              aria-label="Open portfolio assistant"
            >
              <Bot className="w-5 h-5 text-academic-text mb-1" strokeWidth={1.5} />
              <span className="text-[10px] font-medium tracking-[0.15em] text-academic-text">CHAT</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50 w-[calc(100vw-24px)] md:w-[380px] h-[540px] max-h-[calc(100dvh-24px)] md:max-h-[min(540px,calc(100vh-32px))] bg-academic-paper border border-academic-border shadow-sm flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-academic-border bg-academic-bg">
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-academic-text" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-semibold text-academic-text leading-none mb-1">Ashif E.K AI</span>
                  <span className="text-[10px] text-academic-muted uppercase tracking-wider leading-none">Portfolio Assistant</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-academic-muted hover:text-academic-text p-1 transition-colors focus:outline-none"
                aria-label="Close portfolio assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto flex flex-col p-4 bg-white/30">
              {messages.length === 0 ? (
                <div className="mt-auto mb-2 space-y-4">
                  <p className="text-sm font-medium text-academic-text">How can I help?</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="text-xs border border-academic-border bg-academic-paper px-3 py-1.5 hover:border-academic-text transition-colors text-academic-muted hover:text-academic-text rounded-none"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`p-3 text-sm max-w-[85%] ${
                        msg.role === 'user' 
                          ? 'bg-academic-text text-white' 
                          : 'bg-academic-paper border border-academic-border text-academic-text'
                      }`}>
                        {msg.role === 'assistant' ? (
                          <div className="prose-chatbot break-words leading-relaxed">
                            <ReactMarkdown
                              components={{
                                a: ({ node, ...props }) => <a className="underline hover:text-academic-primary transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                                li: ({ node, ...props }) => <li className="" {...props} />,
                                strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                                code: ({ node, ...props }) => <code className="bg-academic-bg px-1 py-0.5 text-[11px] font-mono border border-academic-border" {...props} />
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
                  ))}
                  {isLoading && (
                    <div className="flex w-full justify-start">
                       <div className="bg-academic-paper border border-academic-border p-3 flex items-center justify-center h-[40px] w-[50px]">
                         <span className="w-1.5 h-1.5 bg-academic-muted rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                         <span className="w-1.5 h-1.5 bg-academic-muted rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></span>
                         <span className="w-1.5 h-1.5 bg-academic-muted rounded-full animate-bounce"></span>
                       </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-academic-border bg-academic-paper shrink-0">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend(input);
                    }
                  }}
                  placeholder="Ask a question..."
                  className="flex-1 h-[44px] bg-academic-bg border border-transparent px-4 text-sm focus:outline-none focus:border-academic-border placeholder-academic-muted transition-colors"
                  disabled={isLoading}
                  aria-label="Ask a question"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-[44px] flex items-center justify-center bg-academic-text text-white hover:bg-academic-primary disabled:opacity-50 transition-colors focus:outline-none shrink-0"
                  aria-label="Send message"
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
