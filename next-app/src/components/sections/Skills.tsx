'use client';
import React, { useMemo, useState } from 'react';
import { useSkills, useTools } from '../../hooks/useSkills';
import { Skill, Tool } from '../../types';

interface SkillCardProps {
  skill: Skill;
}

// --- Memoized SVG Icons (No changes here) ---
// --- Memoized SVG Icons ---
interface IconProps extends React.SVGProps<SVGSVGElement> { }

const PythonIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.24 14.76c-.49.49-1.28.49-1.77 0l-2.01-2.01-2.01 2.01c-.49.49-1.28.49-1.77 0s-.49-1.28 0-1.77l2.01-2.01-2.01-2.01c-.49-.49-.49-1.28 0-1.77s1.28-.49 1.77 0l2.01 2.01 2.01-2.01c.49-.49 1.28-.49 1.77 0s.49 1.28 0 1.77l-2.01 2.01 2.01 2.01c.48.49.48 1.28-.01 1.77z" /></svg>);
const JSIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em" {...props}><path d="M0 0h24v24H0z" fill="none" /><path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z" /></svg>);
const ReactIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="1.5em" height="1.5em" {...props}><path d="M416 32H96C51.63 32 16 67.63 16 112v288c0 44.37 35.63 80 80 80h320c44.37 0 80-35.63 80-80V112C496 67.63 460.4 32 416 32zM256 256c-44.13 0-80-35.88-80-80s35.87-80 80-80 80 35.88 80 80-35.87 80-80 80z" /></svg>);
const ShieldIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em" {...props}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>);
const MobileIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em" {...props}><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" /></svg>);
const CodeIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="2em" height="2em" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>);
const PencilRulerIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1.5em" height="1.5em" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>);
const GitIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2em" height="2em" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.6 13.6c-.4.4-.99.55-1.5.4l-1.7-1.7v3.2c0 .55-.45 1-1 1s-1-.45-1-1v-3.2l-1.7 1.7c-.5.15-1.1-.01-1.5-.4-.4-.4-.55-.99-.4-1.5l3.6-10.8c.15-.45.55-.75 1-.75s.85.3 1 .75l3.6 10.8c.15.51-.01 1.1-.4 1.5z" /></svg>);
const DockerIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22.122 13.129c-.139-.212-.547-.852-.547-.852l-2.481-3.922c-.001 0-.306-1.12-1.353-1.12H1.936c-1.047 0-1.282 1.12-1.282 1.12L0 12.277v.852s.408.64.547.851l2.481 3.922s.306 1.12 1.353 1.12h14.328c1.047 0 1.282-1.12 1.282-1.12l.608-.962.035-.054.437-.692.001-.001.546-.865.547-.865zM7.52 12.338a.56.56 0 0 1-.56-.56c0-.308.251-.56.56-.56s.559.252.559.56c0 .309-.25.56-.559.56zm2.8 0a.56.56 0 0 1-.56-.56c0-.308.252-.56.56-.56s.56.252.56.56a.56.56 0 0 1-.56.56zm2.799 0a.56.56 0 0 1-.56-.56c0-.308.252-.56.56-.56s.56.252.56.56a.56.56 0 0 1-.56.56zm2.8 0a.56.56 0 0 1-.56-.56c0-.308.252-.56.56-.56s.56.252.56.56a.56.56 0 0 1-.56.56zm2.799 0a.56.56 0 0 1-.56-.56c0-.308.251-.56.56-.56s.559.252.559.56c0 .309-.25.56-.559.56zm-3.36-2.8h-2.24a.56.56 0 0 1-.56-.56c0-.309.252-.56.56-.56h2.24c.309 0 .56.251.56.56a.56.56 0 0 1-.56.56zm3.36 0h-2.24a.56.56 0 0 1-.56-.56c0-.309.252-.56.56-.56h2.24c.309 0 .56.251.56.56a.56.56 0 0 1-.56.56z" /></svg>);
const JiraIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M21.6 4.81a2.88 2.88 0 0 0-4.07 0l-9.6 9.6a2.88 2.88 0 0 0 0 4.07l4.08 4.07a2.88 2.88 0 0 0 4.07 0l9.6-9.6a2.88 2.88 0 0 0 0-4.07zM12 18.33a.5.5 0 0 1-.35-.15l-4.08-4.07a.5.5 0 0 1 0-.7l9.6-9.6a.5.5 0 0 1 .7 0l4.08 4.07a.5.5 0 0 1 0 .7l-9.6 9.6a.5.5 0 0 1-.35.15z" /><path d="m11.19 12.81-4.07-4.08a2.88 2.88 0 0 0-4.07 0L.47 11.3a2.88 2.88 0 0 0 0 4.07l4.08 4.08a2.88 2.88 0 0 0 4.07 0l2.57-2.57zM5.67 15.17a.5.5 0 0 1-.35-.15l-4.08-4.07a.5.5 0 0 1 0-.7l2.58-2.58a.5.5 0 0 1 .7 0l4.08 4.08a.5.5 0 0 1 0 .7l-2.58 2.57a.5.5 0 0 1-.35.15z" /></svg>);
const AgileIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1.5em" height="1.5em" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L7.985 5.944m12.038 4.992l-3.182-3.182a8.25 8.25 0 00-11.667 0L2.985 15.944m11.666 0l3.182 3.182a8.25 8.25 0 001.167-1.167l3.181-3.182" /></svg>);
const BriefcaseIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1.5em" height="1.5em" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.972 2.4-2.215 2.541-1.42.164-2.6-.948-2.6-2.37v-4.075m0-3.35V6.3a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0121 6.3v4.5m-3.75 0h-10.5a2.25 2.25 0 00-2.25 2.25v4.075c0 1.313.972 2.4 2.215 2.541-1.42.164 2.6-.948-2.6-2.37v-4.075m10.5 0v-4.5a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v4.5" /></svg>);
const DatabaseIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1.5em" height="1.5em" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75c4.97 0 9-1.34 9-3s-4.03-3-9-3-9 1.34-9 3 4.03 3 9 3zM3 3.75v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6M3 9.75v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" /></svg>);
const CloudIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1.5em" height="1.5em" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 16.5a3 3 0 000-6h-.3a6 6 0 00-11.7 1.5A3.75 3.75 0 007.5 19.5h12z" /></svg>);
const TSIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="1.5em" height="1.5em" {...props}><path d="M2 2h28v28H2z" /><path fill="#fff" d="M9.5 12.5h11v2h-4v11h-3v-11h-4zM20 12.5h9v2h-6v3h5a3 3 0 013 3v2a3 3 0 01-3 3h-8v-2h7a1 1 0 001-1v-1a1 1 0 00-1-1h-5a3 3 0 01-3-3v-2a3 3 0 013-3z" /></svg>);
const FigmaIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em" {...props}><path d="M9 2a4 4 0 000 8h3V2H9zm6 0h-3v8h3a4 4 0 000-8zm-6 8a4 4 0 000 8h3v-8H9zm0 8a4 4 0 100 8 4 4 0 003-6.708V18H9zm6-8a4 4 0 100 8 4 4 0 000-8z" /></svg>);
const PostmanIcon = React.memo<IconProps>((props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em" {...props}><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.4 7.8l-5.2 5.2a1 1 0 01-1.4-1.4l5.2-5.2a1 1 0 011.4 1.4zM7.5 15.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" /></svg>);


// --- Dynamic Icon Mapping ---
const iconMap: Record<string, React.ReactNode> = {
  PythonIcon: <PythonIcon className="w-6 h-6" />,
  JSIcon: <JSIcon className="w-6 h-6" />,
  ReactIcon: <ReactIcon className="w-6 h-6" />,
  TSIcon: <TSIcon className="w-6 h-6" />,
  TailwindIcon: <PencilRulerIcon className="w-6 h-6" />,
  GitIcon: <GitIcon className="w-6 h-6" />,
  BootstrapIcon: <CodeIcon className="w-6 h-6" />,
  DockerIcon: <DockerIcon className="w-6 h-6" />,
  JiraIcon: <JiraIcon className="w-6 h-6" />,
  DatabaseIcon: <DatabaseIcon className="w-6 h-6" />,
  CloudIcon: <CloudIcon className="w-6 h-6" />,
  FigmaIcon: <FigmaIcon className="w-6 h-6" />,
  PostmanIcon: <PostmanIcon className="w-6 h-6" />,
  CodeIcon: <CodeIcon className="w-6 h-6" />,
  PencilRulerIcon: <PencilRulerIcon className="w-6 h-6" />,
  MobileIcon: <MobileIcon className="w-6 h-6" />,
  AgileIcon: <AgileIcon className="w-6 h-6" />,
  ShieldIcon: <ShieldIcon className="w-6 h-6" />,
  BriefcaseIcon: <BriefcaseIcon className="w-6 h-6" />,
};

const SkillCard = React.memo(({ skill }: SkillCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="group cursor-pointer border-b border-academic-border py-6 transition-all duration-300 hover:bg-academic-paper/50 px-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span style={{ color: skill.color }} className="text-xl filter grayscale group-hover:grayscale-0 transition-all duration-500">
            {iconMap[skill.icon]}
          </span>
          <div>
            <h3 className="text-lg font-serif font-bold text-academic-primary group-hover:text-academic-accent transition-colors">
              {skill.name}
            </h3>
            <span className="text-xs uppercase tracking-widest text-academic-muted">{skill.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:block w-48 h-1 bg-academic-border relative overflow-hidden">
            <div
              style={{ width: `${skill.level}%` }}
              className="absolute inset-0 bg-academic-primary group-hover:bg-academic-accent transition-colors"
            />
          </div>
          <span className="font-serif italic text-academic-muted min-w-[3rem] text-right">{skill.level}%</span>
        </div>
      </div>

      {isExpanded && (
        <div className="overflow-hidden">
          <p className="mt-4 text-sm text-academic-muted leading-relaxed max-w-2xl font-light">
            {skill.description}
          </p>
        </div>
      )}
    </div>
  );
});

const ToolCard = React.memo(({ tool }: { tool: Tool }) => (
  <div className="flex items-center gap-3 px-4 py-2 border border-academic-border bg-academic-paper shadow-academic grayscale hover:grayscale-0 transition-all duration-500">
    <span className="text-academic-primary text-lg">{iconMap[tool.icon]}</span>
    <span className="text-xs font-bold uppercase tracking-widest text-academic-primary">{tool.name}</span>
  </div>
));

const Skills = ({ condensed = false }: { condensed?: boolean }) => {
  const { data: skills = [] } = useSkills();
  const { data: tools = [] } = useTools();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const skillCategories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(skills.map(s => s.category))).filter(Boolean);
    return ['All', ...uniqueCategories];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    let base = activeCategory === 'All' ? skills : skills.filter(skill => skill.category === activeCategory);

    // For Recruiter Mode (condensed), we show a specific subset
    if (condensed) {
      return base.filter(s => s.level >= 80).slice(0, 6);
    }

    // For regular view, we respect the showAll toggle
    return showAll ? base : base.slice(0, 3);
  }, [activeCategory, skills, condensed, showAll]);

  return (
    <section id="skills" className="py-16 md:py-32 bg-academic-bg text-academic-text relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
          <div>
            <h2 className="section-title">Technical Indices</h2>
            <p className="text-academic-muted font-serif italic mt-2">A comprehensive classification of core competencies and specialized methodologies.</p>
          </div>

          {!condensed && (
            <div className="flex flex-wrap gap-2">
              {skillCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1 text-xs uppercase tracking-widest transition-all duration-300 border ${activeCategory === category ? 'bg-academic-primary text-white border-academic-primary' : 'bg-transparent border-academic-border text-academic-muted hover:border-academic-primary hover:text-academic-primary'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-px bg-academic-border border-t border-academic-border">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id || skill.name} skill={skill} />
          ))}
        </div>

        {!showAll && !condensed && skills.length > 3 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="academic-button px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-4 group"
            >
              View Full Index
              <span className="w-8 h-px bg-academic-paper group-hover:bg-academic-paper transition-all" />
            </button>
          </div>
        )}

        {!condensed && (
          <div className="mt-32">
            <div className="flex items-center gap-4 mb-12">
              <h3 className="text-2xl font-serif font-bold text-academic-primary italic">Modern Toolkit</h3>
              <div className="flex-grow h-px bg-academic-border" />
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {tools.map(tool => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
