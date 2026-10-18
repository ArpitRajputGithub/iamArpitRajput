'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Reveal from '@/components/Reveal';
import { books } from '@/lib/site';

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
        items: books.map((book) => ({ title: book.title, subtitle: book.author })), // same list as the home-page bookshelf
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

export default function FunTabs() {
    const [activeTab, setActiveTab] = useState('Music');
    const current = content[activeTab];

    return (
        <div>
            <Reveal onLoad index={2} className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        aria-pressed={activeTab === tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative rounded-full border px-4 py-1.5 text-sm transition-colors duration-150 ${
                            activeTab === tab ? 'border-fg text-bg' : 'border-line text-muted hover:border-line-strong hover:text-fg'
                        }`}
                    >
                        {/* One shared pill glides to the selected tab */}
                        {activeTab === tab && (
                            <motion.span layoutId="fun-tab" className="absolute inset-0 rounded-full bg-fg" transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }} />
                        )}
                        <span className="relative">{tab}</span>
                    </button>
                ))}
            </Reveal>

            <p className="mt-8 text-muted">{current.description}</p>
            {/* Cards swap with a quick fade when the tab changes */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial="hidden"
                    animate="shown"
                    exit="hidden"
                    variants={{ shown: { transition: { staggerChildren: 0.05 } } }}
                    className="mt-4 grid gap-3 sm:grid-cols-2"
                >
                    {current.items.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.3 }}
                            className="rounded-xl border border-line bg-card p-5"
                        >
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
