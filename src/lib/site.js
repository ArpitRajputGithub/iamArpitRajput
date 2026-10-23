// Site-wide content used in more than one place (hero, nav, footer, explore section).

export const email = 'work.arpitrajput@gmail.com';

export const socials = [
    { label: 'GitHub', href: 'https://github.com/ArpitRajputGithub', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arpit-rajput-831393213/', icon: 'linkedin' },
    { label: 'X / Twitter', href: 'https://x.com/arpitstwt', icon: 'x' },
];

export const pages = [
    {
        title: 'How I Work',
        description: 'My engineering philosophy and principles for building great software',
        badge: 'Philosophy',
        href: '/philosophy',
    },
    {
        title: "Research I'm Exploring",
        description: "Papers I've read with summaries and my insights",
        badge: 'Learning',
        href: '/research',
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
        title: 'Resources & Downloads',
        description: 'Resume, starter templates, API boilerplates, and resources',
        badge: 'Resources',
        href: '/downloads',
    },
    {
        title: 'Activity Feed',
        description: "What I've been up to lately - projects, learnings, and thoughts",
        badge: 'Updates',
        href: '/activity',
    },
];

// Shown on the home-page bookshelf and the Fun page. `current` marks the book that's pulled out first.
// Covers are drawn with CSS from these colours (no cover images needed). `spine` = shorter label for the spine.
export const books = [
    { title: 'Clean Code', author: 'Robert C. Martin', color: '#a8584c', current: false },
    { title: 'System Design Interview', spine: 'System Design', author: 'Alex Xu', color: '#4f7f74', current: false },
    { title: 'Designing Data-Intensive Applications', spine: 'Data-Intensive Apps', author: 'Martin Kleppmann', color: '#2f4a6d', current: true },
    { title: 'Atomic Habits', author: 'James Clear', color: '#8a6a3f', current: false },
];
