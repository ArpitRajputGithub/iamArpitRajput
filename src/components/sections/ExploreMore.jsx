'use client';

import Link from 'next/link';
import ScrollList from '@/components/lightswind/scroll-list';

const exploreItems = [
    {
        title: 'How I Work',
        description: 'My engineering philosophy and principles for building great software',
        badge: 'Philosophy',
        href: '/philosophy',
    },
    {
        title: 'Downloads',
        description: 'Resume, starter templates, API boilerplates, and resources',
        badge: 'Resources',
        href: '/downloads',
    },
    {
        title: 'For Recruiters',
        description: 'Quick overview: availability, skills, and hiring info',
        badge: 'Hiring',
        href: '/recruiters',
    },
    {
        title: 'Fun Side of Me',
        description: 'Music, books, hobbies, favorite tools, and fun facts',
        badge: 'Personal',
        href: '/fun',
    },
    {
        title: 'Research Papers',
        description: 'Papers I\'ve read with summaries and my insights',
        badge: 'Learning',
        href: '/research',
    },
];

const ArrowIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

export default function ExploreMore() {
    return (
        <section className="section explore-section" id="explore">
            <div className="section-title" style={{ marginBottom: '2rem' }}>
                <h2>Explore More</h2>
            </div>

            <ScrollList
                data={exploreItems}
                itemHeight={140}
                renderItem={(item, index) => (
                    <Link
                        href={item.href}
                        className="explore-card"
                    >
                        <div className="explore-card-content">
                            <span className="explore-badge">{item.badge}</span>
                            <h3 className="explore-title">{item.title}</h3>
                            <p className="explore-description">{item.description}</p>
                        </div>
                        <div className="explore-arrow">
                            <ArrowIcon />
                        </div>
                    </Link>
                )}
            />

            <style jsx>{`
                .explore-section {
                    padding-bottom: 2rem;
                }
                .section-title h2 {
                    text-align: center;
                }
                :global(.explore-card) {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 100%;
                    padding: 1.5rem 2rem;
                    background: var(--card-bg);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    text-decoration: none;
                    color: inherit;
                    transition: all 0.3s ease;
                }
                :global(.explore-card:hover) {
                    border-color: var(--accent);
                    transform: translateX(5px);
                }
                :global(.explore-card-content) {
                    flex: 1;
                }
                :global(.explore-badge) {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    background: var(--accent);
                    color: var(--background);
                    font-size: 0.75rem;
                    font-weight: 600;
                    border-radius: 999px;
                    margin-bottom: 0.75rem;
                }
                :global(.explore-title) {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--foreground);
                    margin-bottom: 0.5rem;
                }
                :global(.explore-description) {
                    font-size: 0.9rem;
                    color: var(--foreground-secondary);
                    line-height: 1.5;
                }
                :global(.explore-arrow) {
                    color: var(--accent);
                    transition: transform 0.2s ease;
                }
                :global(.explore-card:hover .explore-arrow) {
                    transform: translateX(5px);
                }
                :global(.scroll-list__wrp) {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                :global(.scroll-list__wrp::-webkit-scrollbar) {
                    display: none;
                }
            `}</style>
        </section>
    );
}
