import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for the portfolio of Ashif E.K – Full-Stack Engineer. Details on data collection, analytics, and third-party services.',
    alternates: {
        canonical: '/privacy',
    },
    robots: {
        index: true,
        follow: false,
    },
};

const lastUpdated = 'September 2026';
const contactEmail = 'ashifek11@gmail.com';
const baseUrl = 'https://www.ashifek.in';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-20 px-6">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <header className="mb-16 pb-10 border-b border-academic-border">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-academic-muted mb-4">
                        Legal Document
                    </p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-academic-primary mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-academic-muted font-light">
                        Last updated: <span className="font-medium text-academic-text">{lastUpdated}</span>
                    </p>
                    <div className="h-px w-12 bg-academic-accent mt-6" />
                </header>

                <div className="prose-legal space-y-12 font-sans text-academic-text/90 leading-relaxed">

                    {/* Introduction */}
                    <section>
                        <p>
                            This portfolio website at <a href={baseUrl} className="text-academic-accent hover:underline font-medium">{baseUrl}</a> is
                            operated by <strong className="text-academic-primary">Ashif E.K</strong>, a Full-Stack Engineer based in Kerala, India.
                            This Privacy Policy describes what information is collected when you visit this portfolio, how it is used,
                            and your rights with respect to that information.
                        </p>
                        <p className="mt-4">
                            This is a personal portfolio website, not a commercial product. There are no user accounts,
                            no purchases, no subscriptions, and no advertising.
                        </p>
                    </section>

                    {/* Analytics */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            1. Analytics — Google Analytics
                        </h2>
                        <p>
                            This website uses <strong>Google Analytics (GA4)</strong> to understand how visitors interact with the
                            portfolio. Google Analytics collects anonymised data including:
                        </p>
                        <ul className="mt-4 space-y-2 ml-4 list-disc list-outside text-academic-text/80">
                            <li>Pages visited and time spent on each page</li>
                            <li>Referring website or search engine</li>
                            <li>Country and city (derived from IP address, not stored precisely)</li>
                            <li>Device type, browser, and operating system</li>
                        </ul>
                        <p className="mt-4">
                            This data is processed by Google LLC and governed by{' '}
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-academic-accent hover:underline"
                            >
                                Google's Privacy Policy
                            </a>. No personally identifiable information is transmitted to Google Analytics.
                        </p>
                    </section>

                    {/* Visitor Counter */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            2. Visitor Counter
                        </h2>
                        <p>
                            The portfolio tracks an aggregate visitor session count stored in a Neon PostgreSQL database hosted
                            on secure cloud infrastructure. This counter records only a <strong>total count of unique sessions</strong>;
                            it does not store IP addresses, usernames, or any personally identifiable information.
                        </p>
                    </section>

                    {/* Contact Form */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            3. Contact Form
                        </h2>
                        <p>
                            The correspondence form on this portfolio collects your <strong>name</strong>, <strong>email address</strong>,
                            and <strong>message</strong>. This information is:
                        </p>
                        <ul className="mt-4 space-y-2 ml-4 list-disc list-outside text-academic-text/80">
                            <li>Stored in a private, server-side database to allow me to respond to inquiries</li>
                            <li>Never shared with third parties</li>
                            <li>Accessible only to me via a password-protected admin interface</li>
                            <li>Retained only as long as reasonably necessary to manage correspondence</li>
                        </ul>
                        <p className="mt-4">
                            You may request deletion of your submitted message at any time by emailing{' '}
                            <a href={`mailto:${contactEmail}`} className="text-academic-accent hover:underline">{contactEmail}</a>.
                        </p>
                    </section>

                    {/* Chatbot */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            4. Portfolio Assistant (Chatbot)
                        </h2>
                        <p>
                            The portfolio includes an AI-powered assistant that answers questions about my work and experience.
                            Messages you send to this assistant are:
                        </p>
                        <ul className="mt-4 space-y-2 ml-4 list-disc list-outside text-academic-text/80">
                            <li>Sent securely to <strong>Google Gemini API</strong> for processing (server-side only — your messages never expose your identity to the API)</li>
                            <li>Not permanently stored on this server</li>
                            <li>Subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-academic-accent hover:underline">Google's Privacy Policy</a> with regard to API processing</li>
                        </ul>
                        <p className="mt-4">
                            Conversations are limited to a maximum of 10 messages and 500 characters per message to protect
                            against abuse.
                        </p>
                    </section>

                    {/* Cloudinary */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            5. Images — Cloudinary
                        </h2>
                        <p>
                            Portfolio images are served via <strong>Cloudinary</strong>, a media management platform. When you
                            view images on this site, your browser makes requests to Cloudinary's CDN servers. Cloudinary may
                            log standard access information (IP address, timestamp, browser). See{' '}
                            <a
                                href="https://cloudinary.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-academic-accent hover:underline"
                            >
                                Cloudinary's Privacy Policy
                            </a>{' '}for details.
                        </p>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            6. Cookies &amp; Local Storage
                        </h2>
                        <p>
                            This portfolio uses a minimal number of cookies and browser storage mechanisms:
                        </p>
                        <ul className="mt-4 space-y-2 ml-4 list-disc list-outside text-academic-text/80">
                            <li><strong>Theme preference</strong> — your light/dark mode choice is saved in local storage to persist across visits</li>
                            <li><strong>Admin session cookie</strong> — an HTTP-only, secure session cookie is used only when the admin interface is accessed (not relevant to regular visitors)</li>
                            <li><strong>Google Analytics cookies</strong> — GA4 sets cookies to distinguish sessions and measure engagement (e.g., <code className="font-mono text-xs bg-academic-paper px-1 border border-academic-border">_ga</code>, <code className="font-mono text-xs bg-academic-paper px-1 border border-academic-border">_ga_*</code>)</li>
                        </ul>
                        <p className="mt-4">
                            No tracking cookies for advertising or profiling are used.
                        </p>
                    </section>

                    {/* Third Parties */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            7. Third-Party Services
                        </h2>
                        <p>The following third-party services are used by this portfolio:</p>
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full text-sm border border-academic-border">
                                <thead className="bg-academic-paper">
                                    <tr>
                                        <th className="text-left p-3 border-b border-academic-border font-bold text-academic-primary text-xs uppercase tracking-wider">Service</th>
                                        <th className="text-left p-3 border-b border-academic-border font-bold text-academic-primary text-xs uppercase tracking-wider">Purpose</th>
                                        <th className="text-left p-3 border-b border-academic-border font-bold text-academic-primary text-xs uppercase tracking-wider">Privacy Policy</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-academic-border">
                                    <tr className="hover:bg-academic-paper/50 transition-colors">
                                        <td className="p-3 font-medium">Google Analytics</td>
                                        <td className="p-3 text-academic-muted">Usage analytics</td>
                                        <td className="p-3"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-academic-accent hover:underline text-xs">policies.google.com</a></td>
                                    </tr>
                                    <tr className="hover:bg-academic-paper/50 transition-colors">
                                        <td className="p-3 font-medium">Google Gemini API</td>
                                        <td className="p-3 text-academic-muted">Portfolio assistant (chatbot)</td>
                                        <td className="p-3"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-academic-accent hover:underline text-xs">policies.google.com</a></td>
                                    </tr>
                                    <tr className="hover:bg-academic-paper/50 transition-colors">
                                        <td className="p-3 font-medium">Cloudinary</td>
                                        <td className="p-3 text-academic-muted">Image hosting &amp; delivery</td>
                                        <td className="p-3"><a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer" className="text-academic-accent hover:underline text-xs">cloudinary.com/privacy</a></td>
                                    </tr>
                                    <tr className="hover:bg-academic-paper/50 transition-colors">
                                        <td className="p-3 font-medium">Neon (PostgreSQL)</td>
                                        <td className="p-3 text-academic-muted">Database (messages, content)</td>
                                        <td className="p-3"><a href="https://neon.tech/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-academic-accent hover:underline text-xs">neon.tech/privacy</a></td>
                                    </tr>
                                    <tr className="hover:bg-academic-paper/50 transition-colors">
                                        <td className="p-3 font-medium">Vercel</td>
                                        <td className="p-3 text-academic-muted">Hosting &amp; deployment</td>
                                        <td className="p-3"><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-academic-accent hover:underline text-xs">vercel.com/legal</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            8. Your Rights
                        </h2>
                        <p>
                            You may contact me at{' '}
                            <a href={`mailto:${contactEmail}`} className="text-academic-accent hover:underline font-medium">{contactEmail}</a>{' '}
                            to:
                        </p>
                        <ul className="mt-4 space-y-2 ml-4 list-disc list-outside text-academic-text/80">
                            <li>Request deletion of any contact form submission you made</li>
                            <li>Ask questions about data handling on this portfolio</li>
                        </ul>
                    </section>

                    {/* Changes */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            9. Changes to This Policy
                        </h2>
                        <p>
                            This Privacy Policy may be updated occasionally to reflect changes in the portfolio's functionality
                            or applicable regulations. The &quot;Last updated&quot; date at the top of this page will always reflect
                            the most recent revision.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            10. Contact
                        </h2>
                        <p>
                            For any privacy-related questions, contact Ashif E.K at{' '}
                            <a href={`mailto:${contactEmail}`} className="text-academic-accent hover:underline font-medium">{contactEmail}</a>.
                        </p>
                    </section>

                </div>

                {/* Footer Nav */}
                <div className="mt-16 pt-8 border-t border-academic-border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <Link
                        href="/"
                        className="text-xs uppercase tracking-[0.25em] font-bold text-academic-muted hover:text-academic-accent transition-colors"
                    >
                        ← Return to Portfolio
                    </Link>
                    <Link
                        href="/terms"
                        className="text-xs uppercase tracking-[0.25em] font-bold text-academic-muted hover:text-academic-accent transition-colors"
                    >
                        Terms of Use →
                    </Link>
                </div>

            </div>
        </main>
    );
}
