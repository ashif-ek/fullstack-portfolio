import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Use',
    description: 'Terms of Use for the portfolio of Ashif E.K – Full-Stack Engineer.',
    alternates: {
        canonical: '/terms',
    },
    robots: {
        index: true,
        follow: false,
    },
};

const lastUpdated = 'September 2026';
const contactEmail = 'ashifek11@gmail.com';
const baseUrl = 'https://www.ashifek.in';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-academic-bg text-academic-text pt-24 pb-20 px-6">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <header className="mb-16 pb-10 border-b border-academic-border">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-academic-muted mb-4">
                        Legal Document
                    </p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-academic-primary mb-4">
                        Terms of Use
                    </h1>
                    <p className="text-academic-muted font-light">
                        Last updated: <span className="font-medium text-academic-text">{lastUpdated}</span>
                    </p>
                    <div className="h-px w-12 bg-academic-accent mt-6" />
                </header>

                <div className="space-y-12 font-sans text-academic-text/90 leading-relaxed">

                    {/* Purpose */}
                    <section>
                        <p>
                            This website at <a href={baseUrl} className="text-academic-accent hover:underline font-medium">{baseUrl}</a> is
                            a personal portfolio operated by <strong className="text-academic-primary">Ashif E.K</strong>,
                            Full-Stack Engineer, Kerala, India. By accessing this website you agree to these Terms of Use.
                        </p>
                    </section>

                    {/* Use of the Site */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            1. Purpose of This Website
                        </h2>
                        <p>
                            This website is provided for informational purposes to showcase professional work, technical
                            expertise, and published writing. It is not a commercial service, and no transactions,
                            purchases, or registrations occur on this site.
                        </p>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            2. Intellectual Property
                        </h2>
                        <p>
                            All written content, design, code, and media on this website is the intellectual property of
                            Ashif E.K unless otherwise attributed. You may not reproduce, copy, or republish any content
                            from this portfolio without prior written permission.
                        </p>
                        <p className="mt-4">
                            Viewing the portfolio and sharing a link to it is explicitly permitted and encouraged.
                        </p>
                    </section>

                    {/* Contact Form */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            3. Contact Form
                        </h2>
                        <p>
                            The correspondence form is provided for genuine professional inquiries only. By submitting the form:
                        </p>
                        <ul className="mt-4 space-y-2 ml-4 list-disc list-outside text-academic-text/80">
                            <li>You confirm that the information you provide is accurate</li>
                            <li>You consent to your name, email, and message being stored for the purpose of responding to your inquiry</li>
                            <li>You agree not to submit spam, automated messages, or unlawful content</li>
                        </ul>
                    </section>

                    {/* Portfolio Assistant */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            4. Portfolio Assistant (AI Chatbot)
                        </h2>
                        <p>
                            The portfolio assistant is powered by Google Gemini and is designed to answer questions about
                            Ashif E.K&apos;s work and experience. By using the assistant:
                        </p>
                        <ul className="mt-4 space-y-2 ml-4 list-disc list-outside text-academic-text/80">
                            <li>You agree not to use it for any unlawful, harmful, or abusive purpose</li>
                            <li>You acknowledge that responses are AI-generated and may not always be accurate</li>
                            <li>You agree not to attempt to circumvent the rate limiting or access controls</li>
                        </ul>
                    </section>

                    {/* External Links */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            5. External Links
                        </h2>
                        <p>
                            This portfolio contains links to external websites including GitHub, LinkedIn, and other platforms.
                            These links are provided for convenience and do not constitute an endorsement of those sites.
                            Ashif E.K has no control over the content or privacy practices of external websites.
                        </p>
                    </section>

                    {/* No Warranties */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            6. No Warranties
                        </h2>
                        <p>
                            This portfolio is provided &quot;as is&quot; without any warranties, expressed or implied. While every
                            effort is made to keep content accurate and the site operational, no guarantee is made regarding
                            uptime, accuracy of information, or fitness for any particular purpose.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            7. Limitation of Liability
                        </h2>
                        <p>
                            Ashif E.K shall not be liable for any direct, indirect, incidental, or consequential damages
                            arising from the use of or inability to use this website or its content.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            8. Governing Law
                        </h2>
                        <p>
                            These Terms are governed by the laws of India. Any disputes arising from the use of this
                            website shall be subject to the jurisdiction of courts in Kerala, India.
                        </p>
                    </section>

                    {/* Changes */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            9. Changes to These Terms
                        </h2>
                        <p>
                            These Terms of Use may be updated occasionally. The &quot;Last updated&quot; date at the top of this
                            page will reflect the most recent revision. Continued use of the website after changes
                            constitutes acceptance of the updated terms.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-xl font-serif font-bold text-academic-primary mb-4 pb-2 border-b border-academic-border">
                            10. Contact
                        </h2>
                        <p>
                            For any questions regarding these terms, contact Ashif E.K at{' '}
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
                        href="/privacy"
                        className="text-xs uppercase tracking-[0.25em] font-bold text-academic-muted hover:text-academic-accent transition-colors"
                    >
                        Privacy Policy →
                    </Link>
                </div>

            </div>
        </main>
    );
}
