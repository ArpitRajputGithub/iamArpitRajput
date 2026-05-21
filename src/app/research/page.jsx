'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { ShinyText } from '@/components/lightswind/shiny-text';

const papers = [
    {
        title: 'Attention Is All You Need',
        authors: 'Vaswani et al.',
        year: '2017',
        category: 'AI/ML',
        summary: 'Introduced the Transformer architecture that revolutionized NLP and became the foundation for models like GPT and BERT.',
        insight: 'This paper changed how I think about sequence modeling. The self-attention mechanism is beautifully elegant.',
        link: 'https://arxiv.org/abs/1706.03762',
    },
    {
        title: 'Designing Data-Intensive Applications',
        authors: 'Martin Kleppmann',
        year: '2017',
        category: 'System Design',
        summary: 'Comprehensive guide to building reliable, scalable, and maintainable data systems.',
        insight: 'My go-to resource for understanding trade-offs in distributed systems. Every engineer should read this.',
        link: 'https://dataintensive.net/',
    },
    {
        title: 'The Twelve-Factor App',
        authors: 'Heroku',
        year: '2012',
        category: 'DevOps',
        summary: 'Methodology for building modern, scalable, maintainable software-as-a-service applications.',
        insight: 'These principles have guided how I structure every production application I build.',
        link: 'https://12factor.net/',
    },
    {
        title: 'MapReduce: Simplified Data Processing',
        authors: 'Dean & Ghemawat (Google)',
        year: '2004',
        category: 'Distributed Systems',
        summary: 'Programming model for processing large data sets with parallel, distributed algorithm on clusters.',
        insight: 'Understanding MapReduce helped me think about data parallelism and fault tolerance at scale.',
        link: 'https://research.google/pubs/pub62/',
    },
    {
        title: 'CAP Theorem',
        authors: 'Eric Brewer',
        year: '2000',
        category: 'Distributed Systems',
        summary: 'States that a distributed system can only guarantee two of three: Consistency, Availability, Partition tolerance.',
        insight: 'Essential mental model for making architecture decisions in distributed systems.',
        link: 'https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/',
    },
];

const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
);

export default function ResearchPage() {
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
                <section className="section research-section">
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
                            Research Papers
                        </ShinyText>
                    </h1>

                    <p className="research-intro animate-on-scroll" style={{ opacity: 0, animationDelay: '0.15s' }}>
                        Papers and resources that shaped my thinking as an engineer.
                    </p>

                    {/* Papers List */}
                    <div className="papers-list">
                        {papers.map((paper, index) => (
                            <article
                                key={index}
                                className="paper-card card animate-on-scroll"
                                style={{ opacity: 0, animationDelay: `${0.1 * (index + 2)}s` }}
                            >
                                <div className="paper-header">
                                    <span className="paper-category">{paper.category}</span>
                                    <span className="paper-year">{paper.year}</span>
                                </div>
                                <h2 className="paper-title">{paper.title}</h2>
                                <p className="paper-authors">{paper.authors}</p>
                                <p className="paper-summary">{paper.summary}</p>
                                <div className="paper-insight">
                                    <strong>My Take:</strong> {paper.insight}
                                </div>
                                <a href={paper.link} target="_blank" rel="noopener noreferrer" className="paper-link">
                                    Read Paper <ArrowIcon />
                                </a>
                            </article>
                        ))}
                    </div>

                    {/* Note */}
                    <div className="research-note animate-on-scroll" style={{ opacity: 0, animationDelay: '0.8s' }}>
                        <p>I'm always reading and learning. This list gets updated regularly!</p>
                    </div>
                </section>

                <style jsx>{`
                    .research-section {
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
                    .research-intro {
                        text-align: center;
                        color: var(--foreground-secondary);
                        font-size: 1.1rem;
                        margin-bottom: 3rem;
                    }
                    .papers-list {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                        margin-bottom: 3rem;
                    }
                    .paper-card {
                        padding: 1.5rem 2rem;
                    }
                    .paper-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 0.75rem;
                    }
                    .paper-category {
                        font-size: 0.75rem;
                        font-weight: 600;
                        padding: 0.25rem 0.75rem;
                        background: var(--accent);
                        color: var(--background);
                        border-radius: 4px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .paper-year {
                        font-size: 0.85rem;
                        color: var(--foreground-secondary);
                    }
                    .paper-title {
                        font-size: 1.35rem;
                        font-weight: 700;
                        color: var(--foreground);
                        margin-bottom: 0.25rem;
                    }
                    .paper-authors {
                        font-size: 0.9rem;
                        color: var(--foreground-secondary);
                        margin-bottom: 1rem;
                    }
                    .paper-summary {
                        font-size: 0.95rem;
                        color: var(--foreground);
                        line-height: 1.6;
                        margin-bottom: 1rem;
                    }
                    .paper-insight {
                        font-size: 0.9rem;
                        color: var(--foreground-secondary);
                        padding: 1rem;
                        background: var(--background-secondary);
                        border-radius: 8px;
                        margin-bottom: 1rem;
                        line-height: 1.6;
                    }
                    .paper-insight strong {
                        color: var(--accent);
                    }
                    .paper-link {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.25rem;
                        color: var(--accent);
                        font-size: 0.9rem;
                        font-weight: 500;
                        text-decoration: none;
                        transition: gap 0.2s ease;
                    }
                    .paper-link:hover {
                        gap: 0.5rem;
                    }
                    .research-note {
                        text-align: center;
                        padding: 1.5rem;
                        background: var(--background-secondary);
                        border-radius: 12px;
                    }
                    .research-note p {
                        color: var(--foreground-secondary);
                        font-size: 0.95rem;
                    }
                `}</style>
            </main>
        </>
    );
}
