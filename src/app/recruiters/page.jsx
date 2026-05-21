'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { ShinyText } from '@/components/lightswind/shiny-text';
import { InteractiveGradient } from '@/components/lightswind/interactive-gradient-card';

const skills = [
    'JavaScript', 'TypeScript', 'Python', 'React', 'Next.js',
    'Node.js', 'NestJS', 'FastAPI', 'PostgreSQL', 'MongoDB',
    'AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Better Auth'
];

const highlights = [
    {
        label: 'Experience',
        value: '2+ Years',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        ),
    },
    {
        label: 'Work Preference',
        value: 'Remote / Hybrid',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
    {
        label: 'Availability',
        value: 'Open to Opportunities',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
    {
        label: 'Location',
        value: 'India',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
    },
];

const EmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const DownloadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

export default function RecruitersPage() {
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
                <section className="section recruiters-section">
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
                            For Recruiters
                        </ShinyText>
                    </h1>

                    {/* Highlights Grid */}
                    <div className="highlights-grid">
                        {highlights.map((item, index) => (
                            <div
                                key={index}
                                className="highlight-card card animate-on-scroll"
                                style={{ opacity: 0, animationDelay: `${0.1 * (index + 2)}s` }}
                            >
                                <div className="highlight-icon">{item.icon}</div>
                                <div className="highlight-content">
                                    <span className="highlight-label">{item.label}</span>
                                    <span className="highlight-value">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    <div className="skills-section animate-on-scroll" style={{ opacity: 0, animationDelay: '0.6s' }}>
                        <h2 className="skills-title">Tech Stack</h2>
                        <div className="skills-grid">
                            {skills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* CTA with Interactive Gradient */}
                    <div className="animate-on-scroll" style={{ opacity: 0, animationDelay: '0.7s' }}>
                        <InteractiveGradient
                            color="var(--accent)"
                            glowColor="rgba(182, 176, 159, 0.4)"
                            borderRadius="16px"
                            intensity={60}
                            hoverOnly={true}
                            className="cta-section"
                        >
                            <h2 className="cta-title">Let's Connect</h2>
                            <p className="cta-description">
                                Looking for a passionate developer to join your team? I'd love to hear about the opportunity.
                            </p>
                            <div className="cta-buttons">
                                <a href="mailto:work.arpitrajput@gmail.com" className="btn btn-primary">
                                    <EmailIcon />
                                    Send Email
                                </a>
                                <a href="/downloads/resume.pdf" download className="btn btn-secondary">
                                    <DownloadIcon />
                                    Download Resume
                                </a>
                            </div>
                        </InteractiveGradient>
                    </div>
                </section>

                <style jsx>{`
                    .recruiters-section {
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
                        margin-bottom: 3rem;
                    }
                    .highlights-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                        gap: 1rem;
                        margin-bottom: 3rem;
                    }
                    .highlight-card {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        padding: 1.25rem;
                    }
                    .highlight-icon {
                        color: var(--accent);
                        flex-shrink: 0;
                    }
                    .highlight-content {
                        display: flex;
                        flex-direction: column;
                        gap: 0.25rem;
                    }
                    .highlight-label {
                        font-size: 0.8rem;
                        color: var(--foreground-secondary);
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .highlight-value {
                        font-size: 1rem;
                        font-weight: 600;
                        color: var(--foreground);
                    }
                    .skills-section {
                        text-align: center;
                        margin-bottom: 3rem;
                    }
                    .skills-title {
                        font-size: 1.5rem;
                        font-weight: 700;
                        margin-bottom: 1.5rem;
                        color: var(--foreground);
                    }
                    .skills-grid {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 0.75rem;
                    }
                    .skill-tag {
                        padding: 0.5rem 1rem;
                        background: var(--background-secondary);
                        border: 1px solid var(--border);
                        border-radius: 999px;
                        font-size: 0.9rem;
                        color: var(--foreground);
                        transition: all 0.2s ease;
                    }
                    .skill-tag:hover {
                        border-color: var(--accent);
                        color: var(--accent);
                    }
                    :global(.cta-section) {
                        width: 100%;
                        padding: 2.5rem;
                    }
                    .cta-title {
                        font-size: 1.75rem;
                        font-weight: 700;
                        margin-bottom: 0.75rem;
                        color: var(--foreground);
                    }
                    .cta-description {
                        font-size: 1rem;
                        color: var(--foreground-secondary);
                        margin-bottom: 1.5rem;
                        max-width: 500px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .cta-buttons {
                        display: flex;
                        justify-content: center;
                        gap: 1rem;
                        flex-wrap: wrap;
                    }
                    .btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 0.95rem;
                        text-decoration: none;
                        transition: all 0.2s ease;
                    }
                    .btn-primary {
                        background: var(--accent);
                        color: var(--background);
                    }
                    .btn-primary:hover {
                        background: var(--accent-hover);
                    }
                    .btn-secondary {
                        background: var(--card-bg);
                        color: var(--foreground);
                        border: 1px solid var(--border);
                    }
                    .btn-secondary:hover {
                        border-color: var(--accent);
                    }
                    @media (max-width: 768px) {
                        .highlights-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>
            </main>
        </>
    );
}
