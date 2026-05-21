'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { ShinyText } from '@/components/lightswind/shiny-text';

const tabs = ['Music', 'Books', 'Hobbies', 'Tools', 'Fun Facts'];

const content = {
    Music: {
        description: 'What I listen to while coding',
        items: [
            { title: 'Lo-Fi Beats', subtitle: 'For deep focus sessions' },
            { title: 'Instrumental Mixes', subtitle: 'For system design and architecture work' },
            { title: 'Hindi Indie', subtitle: 'For lighter build sessions' },
            { title: 'Focus Playlists', subtitle: 'For late night debugging' },
        ],
    },
    Books: {
        description: 'Books that shaped my thinking',
        items: [
            { title: 'Clean Code', subtitle: 'Robert C. Martin' },
            { title: 'System Design Interview', subtitle: 'Alex Xu' },
            { title: 'Designing Data-Intensive Applications', subtitle: 'Martin Kleppmann' },
            { title: 'Atomic Habits', subtitle: 'James Clear' },
        ],
    },
    Hobbies: {
        description: 'When I\'m not coding',
        items: [
            { title: 'Community Building', subtitle: 'Helping developers learn together' },
            { title: 'Technical Writing', subtitle: 'Turning lessons into notes' },
            { title: 'Open Source', subtitle: 'Exploring tools and ideas in public' },
            { title: 'AI/ML Research', subtitle: 'Reading and experimenting with LLMs' },
        ],
    },
    Tools: {
        description: 'My daily drivers',
        items: [
            { title: 'VS Code', subtitle: 'Primary editor' },
            { title: 'Postman', subtitle: 'API testing and debugging' },
            { title: 'Docker', subtitle: 'Local services and deployment parity' },
            { title: 'GitHub Actions', subtitle: 'Build, test, and deployment automation' },
        ],
    },
    'Fun Facts': {
        description: 'Random things about me',
        items: [
            { title: 'Delhi Based', subtitle: 'Building from India' },
            { title: 'Community First', subtitle: 'Co-founder of Codegeeks' },
            { title: 'Product Mindset', subtitle: 'I like owning the full flow' },
            { title: 'Systems Curious', subtitle: 'Always learning how reliable products scale' },
        ],
    },
};

export default function FunPage() {
    const pageRef = useRef(null);
    const [activeTab, setActiveTab] = useState('Music');

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

    const currentContent = content[activeTab];

    return (
        <>
            <ThemeToggle />
            <main className="container" ref={pageRef}>
                <section className="section fun-section">
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
                            Fun Side of Me
                        </ShinyText>
                    </h1>

                    {/* Tabs */}
                    <div className="tabs-container animate-on-scroll" style={{ opacity: 0, animationDelay: '0.2s' }}>
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="content-section">
                        <p className="content-description">{currentContent.description}</p>
                        <div className="content-grid">
                            {currentContent.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="content-card card"
                                    style={{ animationDelay: `${0.1 * index}s` }}
                                >
                                    <h3 className="content-title">{item.title}</h3>
                                    <p className="content-subtitle">{item.subtitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="fun-quote animate-on-scroll" style={{ opacity: 0, animationDelay: '0.5s' }}>
                        <p>"Work hard, play harder. Balance is the key to sustainable creativity."</p>
                    </div>
                </section>

                <style jsx>{`
                    .fun-section {
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
                        margin-bottom: 2rem;
                    }
                    .tabs-container {
                        display: flex;
                        justify-content: center;
                        gap: 0.5rem;
                        flex-wrap: wrap;
                        margin-bottom: 2rem;
                    }
                    .tab-button {
                        padding: 0.6rem 1.25rem;
                        border: 1px solid var(--border);
                        background: var(--card-bg);
                        color: var(--foreground-secondary);
                        border-radius: 999px;
                        font-size: 0.9rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    .tab-button:hover {
                        border-color: var(--accent);
                        color: var(--foreground);
                    }
                    .tab-button.active {
                        background: var(--accent);
                        color: var(--background);
                        border-color: var(--accent);
                    }
                    .content-section {
                        margin-bottom: 3rem;
                    }
                    .content-description {
                        text-align: center;
                        color: var(--foreground-secondary);
                        font-size: 1rem;
                        margin-bottom: 1.5rem;
                    }
                    .content-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 1rem;
                    }
                    .content-card {
                        padding: 1.5rem;
                        text-align: center;
                        transition: transform 0.2s ease;
                    }
                    .content-card:hover {
                        transform: translateY(-3px);
                    }
                    .content-title {
                        font-size: 1.1rem;
                        font-weight: 700;
                        color: var(--foreground);
                        margin-bottom: 0.5rem;
                    }
                    .content-subtitle {
                        font-size: 0.85rem;
                        color: var(--foreground-secondary);
                    }
                    .fun-quote {
                        text-align: center;
                        padding: 2rem;
                        background: var(--background-secondary);
                        border-radius: 12px;
                    }
                    .fun-quote p {
                        font-size: 1.1rem;
                        font-style: italic;
                        color: var(--foreground-secondary);
                        max-width: 500px;
                        margin: 0 auto;
                    }
                    @media (max-width: 768px) {
                        .content-grid {
                            grid-template-columns: 1fr 1fr;
                        }
                    }
                    @media (max-width: 480px) {
                        .content-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>
            </main>
        </>
    );
}
