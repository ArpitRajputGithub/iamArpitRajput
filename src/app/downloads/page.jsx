'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

import { ShinyText } from '@/components/lightswind/shiny-text';

const downloadItems = [
    {
        title: 'Resume Template',
        description: 'My latest resume with work experience and skills',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        fileType: 'PDF',
        href: '/downloads/resume.pdf',
    },
    {
        title: 'Starter Templates',
        description: 'Next.js, React, and Node.js project starters',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
        ),
        fileType: 'ZIP',
        href: '/downloads/starter-templates.zip',
    },
    {
        title: 'API Boilerplates',
        description: 'REST and GraphQL API templates with authentication',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        fileType: 'ZIP',
        href: '/downloads/api-boilerplates.zip',
    },
    {
        title: 'Coding Notes',
        description: 'Personal notes on algorithms, system design, and best practices',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
        fileType: 'PDF',
        href: '/downloads/coding-notes.pdf',
    },
    {
        title: 'Design Kit',
        description: 'UI components, color palettes, and design system',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
        fileType: 'ZIP',
        href: '/downloads/design-kit.zip',
    },
];

const DownloadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const GitHubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const TwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function DownloadsPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = pageRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <ThemeToggle />

            <main className="container" ref={pageRef}>
                <section className="section downloads-section">
                    <Link href="/" className="back-link animate-on-scroll" style={{ opacity: 0 }}>
                        ← Back to Home
                    </Link>

                    <h1 className="page-heading animate-on-scroll" style={{ opacity: 0, animationDelay: '0.1s' }}>
                        <ShinyText
                            speed={3}
                            shineColor="var(--accent)"
                            baseColor="var(--foreground)"
                            intensity={1}
                            className="gradient-text"
                        >
                            Downloads
                        </ShinyText>
                    </h1>



                    <div className="downloads-grid">
                        {downloadItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                download
                                className="download-card card animate-on-scroll"
                                style={{ opacity: 0, animationDelay: `${0.1 * (index + 2)}s` }}
                            >
                                <div className="download-icon">{item.icon}</div>
                                <div className="download-content">
                                    <div className="download-header">
                                        <h3 className="download-title">{item.title}</h3>
                                        <span className="download-badge">{item.fileType}</span>
                                    </div>
                                    <p className="download-description">{item.description}</p>
                                </div>
                                <div className="download-action">
                                    <DownloadIcon />
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="downloads-note animate-on-scroll" style={{ opacity: 0, animationDelay: '0.7s' }}>
                        <p>More resources coming soon! Follow me for updates.</p>
                        <div className="social-links">
                            <a href="https://github.com/ArpitRajputGithub" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                                <GitHubIcon />
                            </a>
                            <a href="https://www.linkedin.com/in/arpit-rajput-831393213/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                <LinkedInIcon />
                            </a>
                            <a href="https://x.com/arpitstwt" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                                <TwitterIcon />
                            </a>
                        </div>
                    </div>
                </section>

                <style jsx>{`
                    .downloads-section {
                        padding: 2rem 0 4rem;
                    }
                    .back-link {
                        display: block;
                        color: var(--foreground-secondary);
                        text-decoration: none;
                        font-size: 0.9rem;
                        margin-bottom: 2rem;
                        transition: color 0.2s ease;
                    }
                    .back-link:hover {
                        color: var(--accent);
                    }
                    .page-heading {
                        font-size: clamp(2.5rem, 8vw, 4rem);
                        font-weight: 800;
                        text-align: center;
                        margin-bottom: 1rem;
                    }
                    .downloads-intro {
                        font-size: 1.1rem;
                        color: var(--foreground-secondary);
                        margin-bottom: 3rem;
                        max-width: 500px;
                        text-align: center;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .downloads-grid {
                        display: grid;
                        gap: 1rem;
                    }
                    .download-card {
                        display: flex;
                        align-items: center;
                        gap: 1.5rem;
                        padding: 1.5rem;
                        text-decoration: none;
                        color: inherit;
                        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
                    }
                    .download-card:hover {
                        transform: translateX(5px);
                        border-color: var(--accent);
                    }
                    .download-icon {
                        flex-shrink: 0;
                        color: var(--accent);
                        padding: 1rem;
                        background: var(--background-secondary);
                        border-radius: 12px;
                    }
                    .download-content {
                        flex: 1;
                    }
                    .download-header {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        margin-bottom: 0.5rem;
                    }
                    .download-title {
                        font-size: 1.1rem;
                        font-weight: 700;
                        color: var(--foreground);
                    }
                    .download-badge {
                        font-size: 0.7rem;
                        font-weight: 600;
                        padding: 0.25rem 0.5rem;
                        background: var(--accent);
                        color: var(--background);
                        border-radius: 4px;
                    }
                    .download-description {
                        font-size: 0.9rem;
                        color: var(--foreground-secondary);
                        line-height: 1.5;
                    }
                    .download-action {
                        flex-shrink: 0;
                        color: var(--foreground-secondary);
                        transition: color 0.2s ease, transform 0.2s ease;
                    }
                    .download-card:hover .download-action {
                        color: var(--accent);
                        transform: translateY(3px);
                    }
                    .downloads-note {
                        text-align: center;
                        margin-top: 3rem;
                        padding: 1.5rem;
                        background: var(--background-secondary);
                        border-radius: 12px;
                    }
                    .downloads-note p {
                        color: var(--foreground-secondary);
                        font-size: 0.95rem;
                        margin-bottom: 1rem;
                    }
                    .social-links {
                        display: flex;
                        justify-content: center;
                        gap: 1rem;
                    }
                    .social-link {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background: var(--card-bg);
                        border: 1px solid var(--border);
                        color: var(--foreground-secondary);
                        transition: all 0.2s ease;
                    }
                    .social-link:hover {
                        color: var(--accent);
                        border-color: var(--accent);
                    }
                    @media (max-width: 768px) {
                        .download-card {
                            flex-direction: column;
                            text-align: center;
                            gap: 1rem;
                        }
                        .download-header {
                            justify-content: center;
                        }
                    }
                `}</style>
            </main>
        </>
    );
}
