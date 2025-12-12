'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

import { ScrollReveal } from '@/components/lightswind/scroll-reveal';
import { ShinyText } from '@/components/lightswind/shiny-text';

const philosophyPrinciples = [
    {
        title: 'Ship Fast, Iterate Often',
        description: 'I believe in getting things out quickly and improving based on real feedback. Perfection is the enemy of progress.',
    },
    {
        title: 'Code for Humans',
        description: 'Clean, readable code is more important than clever code. Future me (and my teammates) will thank present me.',
    },
    {
        title: 'Embrace Complexity, Simplify Solutions',
        description: 'Complex problems deserve elegant solutions. I break down challenges into manageable pieces.',
    },
    {
        title: 'Collaborate & Communicate',
        description: 'Great software is built by great teams. I prioritize clear communication and knowledge sharing.',
    },
    {
        title: 'Never Stop Learning',
        description: 'Technology evolves fast. I dedicate time to learning new tools, patterns, and best practices.',
    },
    {
        title: 'Automate Everything',
        description: 'If I do something twice, I automate it. Efficiency compounds over time.',
    },
];

export default function PhilosophyPage() {
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
                <section className="section philosophy-section">
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
                            How I Work
                        </ShinyText>
                    </h1>

                    <div className="philosophy-intro">
                        <ScrollReveal size="md" align="center" staggerDelay={0.03} enableBlur={true}>
                            Engineering is more than writing code. It's about solving problems, building systems that scale, and creating value for users. Here's my philosophy.
                        </ScrollReveal>
                    </div>

                    <div className="philosophy-grid">
                        {philosophyPrinciples.map((principle, index) => (
                            <div
                                key={index}
                                className="philosophy-card card animate-on-scroll"
                                style={{ opacity: 0, animationDelay: `${0.1 * (index + 2)}s` }}
                            >
                                <div className="philosophy-number">{String(index + 1).padStart(2, '0')}</div>
                                <h3 className="philosophy-title">{principle.title}</h3>
                                <p className="philosophy-description">{principle.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="philosophy-quote animate-on-scroll" style={{ opacity: 0, animationDelay: '0.8s' }}>
                        <blockquote>
                            "The best code is no code at all. Every new line of code you willingly bring into the world is code that has to be debugged, code that has to be read and understood."
                        </blockquote>
                        <cite>— Jeff Atwood</cite>
                    </div>
                </section>

                <style jsx>{`
                    .philosophy-section {
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
                    .philosophy-intro {
                        max-width: 700px;
                        margin: 0 auto 3rem;
                        text-align: center;
                    }
                    .philosophy-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 1.5rem;
                        margin-bottom: 3rem;
                    }
                    .philosophy-card {
                        padding: 2rem;
                        text-align: left;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        position: relative;
                    }
                    .philosophy-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.3);
                    }
                    .philosophy-number {
                        font-size: 3rem;
                        font-weight: 800;
                        color: var(--accent);
                        opacity: 0.2;
                        position: absolute;
                        top: 1rem;
                        right: 1.5rem;
                        line-height: 1;
                        z-index: 0;
                    }
                    .philosophy-title {
                        font-size: 1.25rem;
                        font-weight: 700;
                        margin-bottom: 0.75rem;
                        color: var(--foreground);
                        position: relative;
                        z-index: 1;
                        padding-right: 4rem;
                    }
                    .philosophy-description {
                        font-size: 0.95rem;
                        color: var(--foreground-secondary);
                        line-height: 1.7;
                        position: relative;
                        z-index: 1;
                    }
                    .philosophy-quote {
                        max-width: 600px;
                        margin: 0 auto;
                        text-align: center;
                        padding: 2rem;
                        border-left: 3px solid var(--accent);
                        background: var(--card-background);
                        border-radius: 0 12px 12px 0;
                    }
                    .philosophy-quote blockquote {
                        font-size: 1.1rem;
                        font-style: italic;
                        color: var(--foreground);
                        line-height: 1.8;
                        margin-bottom: 1rem;
                    }
                    .philosophy-quote cite {
                        font-size: 0.9rem;
                        color: var(--foreground-secondary);
                    }
                    @media (max-width: 768px) {
                        .philosophy-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>
            </main>
        </>
    );
}
