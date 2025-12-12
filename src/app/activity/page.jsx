'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { ShinyText } from '@/components/lightswind/shiny-text';

const activities = [
    {
        type: 'project',
        date: 'Dec 2024',
        title: 'Launched Portfolio v2.0',
        description: 'Complete redesign with new sections, animations, and dark mode.',
        icon: '🚀',
    },
    {
        type: 'learning',
        date: 'Nov 2024',
        title: 'Completed AWS Solutions Architect',
        description: 'Deep dive into cloud architecture and best practices.',
        icon: '📚',
    },
    {
        type: 'tweet',
        date: 'Nov 2024',
        title: 'Hot Take: AI in Development',
        description: 'AI is a tool, not a replacement. The best developers will be those who learn to leverage AI effectively.',
        icon: '💭',
    },
    {
        type: 'project',
        date: 'Oct 2024',
        title: 'Open Sourced Email Automation Tool',
        description: 'Released a tool for automating job applications and follow-ups.',
        icon: '📦',
    },
    {
        type: 'achievement',
        date: 'Sep 2024',
        title: '500+ GitHub Contributions',
        description: 'Milestone reached! Consistency is key.',
        icon: '🏆',
    },
    {
        type: 'tweet',
        date: 'Sep 2024',
        title: 'On Clean Code',
        description: 'Write code as if the next person to maintain it is a violent psychopath who knows where you live.',
        icon: '💭',
    },
    {
        type: 'learning',
        date: 'Aug 2024',
        title: 'Explored System Design Patterns',
        description: 'Deep dive into microservices, event sourcing, and CQRS.',
        icon: '📚',
    },
];

const GitHubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const TwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function ActivityPage() {
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
                <section className="section activity-section">
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
                            Activity Feed
                        </ShinyText>
                    </h1>

                    <p className="activity-intro animate-on-scroll" style={{ opacity: 0, animationDelay: '0.15s' }}>
                        What I've been up to lately.
                    </p>

                    {/* Timeline */}
                    <div className="timeline">
                        {activities.map((activity, index) => (
                            <div
                                key={index}
                                className="timeline-item animate-on-scroll"
                                style={{ opacity: 0, animationDelay: `${0.1 * (index + 2)}s` }}
                            >
                                <div className="timeline-marker">
                                    <span className="timeline-icon">{activity.icon}</span>
                                </div>
                                <div className="timeline-content card">
                                    <span className="timeline-date">{activity.date}</span>
                                    <h3 className="timeline-title">{activity.title}</h3>
                                    <p className="timeline-description">{activity.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="social-section animate-on-scroll" style={{ opacity: 0, animationDelay: '0.9s' }}>
                        <p>Follow me for more updates</p>
                        <div className="social-links">
                            <a href="https://github.com/ArpitRajputGithub" target="_blank" rel="noopener noreferrer" className="social-link">
                                <GitHubIcon />
                                GitHub
                            </a>
                            <a href="https://x.com/arpitstwt" target="_blank" rel="noopener noreferrer" className="social-link">
                                <TwitterIcon />
                                Twitter/X
                            </a>
                        </div>
                    </div>
                </section>

                <style jsx>{`
                    .activity-section {
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
                    .activity-intro {
                        text-align: center;
                        color: var(--foreground-secondary);
                        font-size: 1.1rem;
                        margin-bottom: 3rem;
                    }
                    .timeline {
                        position: relative;
                        max-width: 700px;
                        margin: 0 auto 3rem;
                        padding-left: 2rem;
                    }
                    .timeline::before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        width: 2px;
                        background: var(--border);
                    }
                    .timeline-item {
                        position: relative;
                        margin-bottom: 1.5rem;
                    }
                    .timeline-marker {
                        position: absolute;
                        left: -2rem;
                        top: 1rem;
                        width: 2rem;
                        height: 2rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transform: translateX(-50%);
                    }
                    .timeline-icon {
                        font-size: 1.25rem;
                        background: var(--background);
                        padding: 0.25rem;
                    }
                    .timeline-content {
                        padding: 1.25rem 1.5rem;
                        margin-left: 1rem;
                    }
                    .timeline-date {
                        font-size: 0.8rem;
                        color: var(--accent);
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .timeline-title {
                        font-size: 1.15rem;
                        font-weight: 700;
                        color: var(--foreground);
                        margin: 0.5rem 0;
                    }
                    .timeline-description {
                        font-size: 0.9rem;
                        color: var(--foreground-secondary);
                        line-height: 1.6;
                    }
                    .social-section {
                        text-align: center;
                        padding: 2rem;
                        background: var(--background-secondary);
                        border-radius: 12px;
                    }
                    .social-section p {
                        color: var(--foreground-secondary);
                        margin-bottom: 1rem;
                    }
                    .social-links {
                        display: flex;
                        justify-content: center;
                        gap: 1rem;
                        flex-wrap: wrap;
                    }
                    .social-link {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.75rem 1.25rem;
                        background: var(--card-bg);
                        border: 1px solid var(--border);
                        border-radius: 8px;
                        color: var(--foreground);
                        text-decoration: none;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    }
                    .social-link:hover {
                        border-color: var(--accent);
                        color: var(--accent);
                    }
                `}</style>
            </main>
        </>
    );
}
