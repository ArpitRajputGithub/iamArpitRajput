'use client';

import { useEffect, useRef } from 'react';

const projects = [
    {
        title: 'Full-Stack Web App',
        description: 'A full-stack web application built with React and Node.js. Features include user authentication, real-time updates, and a modern UI.',
        tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
    {
        title: 'AI-Powered Automation',
        description: 'An AI-powered application that helps users automate their daily tasks. Built using Python and modern ML frameworks.',
        tech: ['Python', 'FastAPI', 'OpenAI', 'Redis'],
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
    {
        title: 'E-commerce Platform',
        description: 'A mobile-first e-commerce platform with seamless checkout experience and inventory management.',
        tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
];

const ExternalLinkIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const GitHubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

export default function Projects() {
    const projectsRef = useRef(null);

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

        const elements = projectsRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="section" ref={projectsRef} id="projects">
            <div className="section-title animate-on-scroll" style={{ opacity: 0 }}>
                <h2>Proof of Work</h2>
            </div>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card card animate-on-scroll"
                        style={{ opacity: 0, animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                        <div className="project-header">
                            <h3 className="project-title">{project.title}</h3>
                            <div className="project-links">
                                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                    <GitHubIcon />
                                </a>
                                <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                                    <ExternalLinkIcon />
                                </a>
                            </div>
                        </div>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tech">
                            {project.tech.map((tech, techIndex) => (
                                <span key={techIndex} className="tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .project-card {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .project-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }
                .project-title {
                    margin-bottom: 0;
                    font-size: 1.25rem;
                }
                .project-links {
                    display: flex;
                    gap: 0.75rem;
                }
                .project-links a {
                    color: var(--foreground-secondary);
                    transition: color 0.2s ease, transform 0.2s ease;
                }
                .project-links a:hover {
                    color: var(--accent);
                    transform: translateY(-2px);
                }
                .project-description {
                    color: var(--foreground-secondary);
                    font-size: 0.95rem;
                    line-height: 1.7;
                    margin: 0;
                }
                .project-tech {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: auto;
                }

                @media (max-width: 480px) {
                    .project-card {
                        padding: 1rem;
                    }
                    .project-title {
                        font-size: 1.125rem;
                    }
                    .project-description {
                        font-size: 0.875rem;
                    }
                    .project-tech {
                        gap: 0.375rem;
                    }
                }
            `}</style>
        </section>
    );
}
