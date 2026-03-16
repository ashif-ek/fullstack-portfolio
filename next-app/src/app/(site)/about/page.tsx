import { Metadata } from 'next';
import { profile, about, skills, tools, certificates } from '../../../data/mockData';
import { Skill, Tool, Certificate } from '../../../types';
import { Award, Code, GraduationCap, Laptop, Sparkles, User } from 'lucide-react';
import Api from '../../../lib/api';

export const metadata: Metadata = {
    title: 'About Ashif EK | Full-Stack Engineer',
    description: 'Learn more about Ashif EK, a Full-Stack Engineer specializing in React, Django, and modern web architecture. Discover his journey, expertise, and technical philosophy.',
    openGraph: {
        title: 'About Ashif EK | Professional Journey & Expertise',
        description: 'The professional profile of Ashif EK. Full-Stack development expert with a focus on scalable systems and premium user experiences.',
        images: [{ url: '/profile.jpg' }],
    },
};

export default async function AboutPage() {
    // Fetch data with revalidation (e.g., every 1 hour)
    let liveAbout = about;
    let liveSkills = skills;
    let liveTools = tools;
    let liveCertificates = certificates;

    try {
        const [aboutRes, skillsRes, toolsRes, certsRes] = await Promise.all([
            Api.get('/about/'),
            Api.get('/skills/'),
            Api.get('/tools/'),
            Api.get('/certificates/'),
        ]);

        if (aboutRes.data?.length > 0) liveAbout = aboutRes.data;
        if (skillsRes.data?.length > 0) liveSkills = skillsRes.data;
        if (toolsRes.data?.length > 0) liveTools = toolsRes.data;
        if (certsRes.data?.length > 0) liveCertificates = certsRes.data;
    } catch (error) {
        console.error("Failed to fetch live about data, using mock fallback:", error);
    }

    const mainAbout = liveAbout[0] || about[0];

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.ashifek.in"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://www.ashifek.in/about"
            }
        ]
    };

    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-16 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <div className="max-w-4xl mx-auto">
                <header className="mb-16 text-center">
                    <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-2 border-academic-primary/20 p-1 shadow-2xl">
                        <img
                            src="https://res.cloudinary.com/dvq8j8q9j/image/upload/v1758031879/ashif/profile_2_c4j18n.jpg"
                            alt="Ashif EK"
                            className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-academic-primary">
                        Ashif EK
                    </h1>
                    <p className="text-xl text-academic-text/60 font-serif italic">
                        Full-Stack Engineer
                    </p>
                </header>

                <section className="mb-20 space-y-8">
                    <div className="flex items-center gap-3 text-academic-primary mb-2">
                        <User className="w-6 h-6" />
                        <h2 className="text-2xl font-bold uppercase tracking-widest">The Narrative</h2>
                    </div>
                    <div className="prose prose-invert prose-academic max-w-none text-lg text-academic-text/80 leading-relaxed space-y-6">
                        <p>{mainAbout.introduction}</p>
                        <p>{mainAbout.experience}</p>
                        <p>{mainAbout.philosophy}</p>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <section>
                        <div className="flex items-center gap-3 text-academic-primary mb-8">
                            <Code className="w-6 h-6" />
                            <h2 className="text-xl font-bold uppercase tracking-widest text-academic-text/80">Core Expertise</h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {liveSkills.map((skill: Skill) => (
                                <span
                                    key={skill.id}
                                    className="px-4 py-2 rounded-lg bg-academic-primary/5 border border-academic-primary/10 text-academic-text/70 text-sm hover:border-academic-primary/30 transition-colors"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 text-academic-primary mb-8">
                            <Laptop className="w-6 h-6" />
                            <h2 className="text-xl font-bold uppercase tracking-widest text-academic-text/80">Modern Stack</h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {liveTools.map((tool: Tool) => (
                                <span
                                    key={tool.id}
                                    className="px-4 py-2 rounded-lg bg-academic-primary/5 border border-academic-primary/10 text-academic-text/70 text-sm hover:border-academic-primary/30 transition-colors"
                                >
                                    {tool.name}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                <section className="mb-20">
                    <div className="flex items-center gap-3 text-academic-primary mb-12">
                        <Award className="w-6 h-6" />
                        <h2 className="text-2xl font-bold uppercase tracking-widest">Recognitions</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {liveCertificates.map((cert: Certificate) => (
                            <div
                                key={cert.id}
                                className="p-6 rounded-2xl bg-academic-paper border border-academic-border shadow-academic hover:shadow-paper transition-all flex gap-4"
                            >
                                <div className="w-12 h-12 flex-shrink-0 bg-academic-primary/10 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-academic-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-academic-primary mb-1">{cert.title}</h3>
                                    <p className="text-sm text-academic-muted">{cert.issuer} • {cert.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 text-academic-primary mb-12">
                        <GraduationCap className="w-6 h-6" />
                        <h2 className="text-2xl font-bold uppercase tracking-widest">Background</h2>
                    </div>
                    <div className="p-8 rounded-3xl bg-academic-primary/5 border border-academic-primary/10">
                        <h3 className="text-xl font-bold mb-2">Bachelor of Computer Applications (BCA)</h3>
                        <p className="text-academic-text/60 mb-4">SAFA Arts & Science College • University of Calicut</p>
                        <p className="text-academic-text/80 italic">
                            "Focusing on the intersection of theoretical linguistics and computational architecture."
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
