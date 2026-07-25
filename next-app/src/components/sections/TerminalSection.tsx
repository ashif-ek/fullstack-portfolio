'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { trackResumeDownload } from '../../app/actions/resumeAnalytics';
import { useProfile } from '../../hooks/useProfile';
import { useSkills } from '../../hooks/useSkills';
import { useProjects } from '../../hooks/useProjects';
import { useCertificates } from '../../hooks/useCertificates';
import { useBlogs } from '../../hooks/useBlogs';
import { useServices } from '../../hooks/useServices';

type CommandHistory = {
  command: string;
  output: React.ReactNode;
};

interface TerminalSectionProps {
  isStandalone?: boolean;
}

export default function TerminalSection({ isStandalone = false }: TerminalSectionProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { profile } = useProfile();
  const { data: skills } = useSkills();
  const { data: projects } = useProjects();
  const { data: certificates } = useCertificates();
  const { data: blogs } = useBlogs();
  const { data: services } = useServices();

  useEffect(() => {
    // Initial welcome message
    setHistory([
      {
        command: '',
        output: (
          <div className="text-academic-muted">
            <p>Welcome to AshifOS v1.0.0 (x86_64)</p>
            <p>Type <span className="text-academic-primary font-bold">'help'</span> to see available commands.</p>
          </div>
        )
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode = '';

    switch (trimmedCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-academic-muted">
            <p><span className="text-academic-primary font-bold w-24 inline-block">whoami</span> - Display identity & abstract</p>
            <p><span className="text-academic-primary font-bold w-24 inline-block">skills</span> - List technical proficiencies</p>
            <p><span className="text-academic-primary font-bold w-24 inline-block">projects</span> - View active deployments</p>
            <p><span className="text-academic-primary font-bold w-24 inline-block">education</span> - Display accreditations</p>
            <p><span className="text-academic-primary font-bold w-24 inline-block">services</span> - List expertise areas</p>
            <p><span className="text-academic-primary font-bold w-24 inline-block">resume</span> - View curriculum vitae</p>
            <p><span className="text-academic-primary font-bold w-24 inline-block">blog</span> - List recent articles</p>
            <p><span className="text-academic-primary font-bold w-24 inline-block">contact</span> - Display contact info</p>
            <p><span className="text-academic-primary font-bold w-24 inline-block">clear</span> - Clear terminal output</p>
            <p><span className="text-academic-primary font-bold w-24 inline-block">sudo</span> - ???</p>
          </div>
        );
        break;
      case 'whoami':
        output = (
          <div className="text-academic-muted space-y-2">
            <p className="text-academic-primary font-bold">{profile?.name || 'Ashif E.K'} - {profile?.title || 'Full-Stack Engineer'}</p>
            <p>{profile?.description}</p>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="text-academic-muted grid grid-cols-2 md:grid-cols-3 gap-2">
            {skills?.slice(0, 9).map(skill => (
              <div key={skill.id} className="flex items-center gap-2">
                <span className="text-academic-accent">➜</span> {skill.name}
              </div>
            ))}
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="text-academic-muted space-y-3">
            {projects?.slice(0, 3).map(project => (
              <div key={project.id}>
                <p className="text-academic-primary font-bold">{project.title}</p>
                <p className="text-sm line-clamp-2">{project.description}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'education':
      case 'certs':
        output = (
          <div className="text-academic-muted space-y-3">
            {certificates?.map(cert => (
              <div key={cert.id}>
                <p className="text-academic-primary font-bold">{cert.title}</p>
                <p className="text-sm">{cert.issuer} - {cert.date}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'services':
      case 'expertise':
        output = (
          <div className="text-academic-muted space-y-3">
            {services?.map(service => (
              <div key={service.id}>
                <p className="text-academic-primary font-bold">{service.title}</p>
                <p className="text-sm line-clamp-2">{service.description}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'resume':
      case 'cv':
        output = (
          <div className="text-academic-muted space-y-2">
            <p>Accessing curriculum vitae...</p>
            <p>
              <a href="/resume/Ashif%20E.K%20RESUME%20FULL-STACK.pdf" target="_blank" rel="noopener noreferrer" onClick={() => trackResumeDownload().catch(console.error)} className="text-academic-accent underline hover:text-academic-primary">
                [Click here to view / download resume]
              </a>
            </p>
          </div>
        );
        break;
      case 'blog':
      case 'journal':
        output = (
          <div className="text-academic-muted space-y-3">
            {blogs?.slice(0, 3).map(blog => (
              <div key={blog.id}>
                <p className="text-academic-primary font-bold">{blog.title}</p>
                <p className="text-sm">{new Date(blog.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'contact':
        output = (
          <div className="text-academic-muted space-y-2">
            <p><span className="text-academic-accent">Email:</span> ashifek11@gmail.com</p>
            <p><span className="text-academic-accent">Location:</span> Kochi, Kerala, India</p>
            <p><span className="text-academic-accent">LinkedIn:</span> linkedin.com/in/ashifek</p>
            <p><span className="text-academic-accent">GitHub:</span> github.com/ashif-ek</p>
          </div>
        );
        break;
      case 'sudo':
        output = <p className="text-red-500">ashif is not in the sudoers file. This incident will be reported.</p>;
        break;
      case 'gui':
        output = <p className="text-yellow-500">You are already using a GUI, but I appreciate the sentiment.</p>;
        break;
      case 'matrix':
        output = <p className="text-green-500">Wake up, Neo... The Matrix has you.</p>;
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        output = '';
        break;
      default:
        output = <p className="text-red-500">Command not found: {trimmedCmd}. Type 'help' for available commands.</p>;
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <section className={`${isStandalone ? 'w-full' : 'py-24 bg-academic-bg relative border-y border-academic-border'}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="text-academic-accent" size={24} />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-academic-primary tracking-tight">
              Interactive Terminal
            </h2>
          </div>

          <div 
            className="academic-card bg-[#0D1117] border border-academic-border rounded-xl overflow-hidden shadow-2xl font-mono text-sm md:text-base cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Header */}
            <div className="bg-[#161B22] border-b border-academic-border px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="mx-auto text-xs text-academic-muted opacity-50 flex items-center gap-2">
                <span>bash</span>
                <span>—</span>
                <span>80x24</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className={`p-6 overflow-y-auto custom-scrollbar ${isStandalone ? 'h-[60vh]' : 'h-[400px]'}`}
            >
              {history.map((item, index) => (
                <div key={index} className="mb-4">
                  {item.command !== '' && (
                    <div className="flex gap-2 text-academic-muted mb-1">
                      <span className="text-green-400">ashif@portfolio:~$</span>
                      <span>{item.command}</span>
                    </div>
                  )}
                  {item.output}
                </div>
              ))}

              <div className="flex gap-2 text-academic-muted">
                <span className="text-green-400">ashif@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none flex-1 text-academic-primary"
                  autoComplete="off"
                  spellCheck="false"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
