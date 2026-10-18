'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import ThemeToggle from './ThemeToggle';
import { SearchIcon } from './icons';

const links = [
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
];

export default function Nav() {
    const isHome = usePathname() === '/';
    const [active, setActive] = useState(null);
    const [isMac, setIsMac] = useState(true);

    // Thin line under the nav that fills as you scroll (springy so it feels physical)
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001, skipInitialAnimation: true });

    // Scroll spy: the section crossing the middle of the screen is "active" (home page only)
    useEffect(() => {
        setActive(null);
        if (!isHome) return;
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: '-45% 0px -50% 0px' }
        );
        document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [isHome]);

    useEffect(() => setIsMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
            <nav
                aria-label="Main"
                className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-6 py-3"
            >
                <Link href="/" className="text-lg font-extrabold tracking-tight">
                    Arpit Rajput
                </Link>

                <ul className="order-last -ml-3 flex w-full text-sm sm:order-none sm:ml-auto sm:w-auto">
                    {links.map((link) => (
                        <li key={link.id} className="relative">
                            {/* The highlight pill is one shared element that glides between links (layoutId) */}
                            {active === link.id && (
                                <motion.span
                                    layoutId="nav-pill"
                                    className="absolute inset-0 rounded-full bg-surface"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                            <a
                                href={isHome ? `#${link.id}` : `/#${link.id}`}
                                aria-current={active === link.id ? 'true' : undefined}
                                className={`relative block rounded-full px-3 py-1.5 transition-colors duration-150 hover:text-fg ${
                                    active === link.id ? 'text-fg' : 'text-muted'
                                }`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
                        aria-label="Open command menu"
                        className="flex h-9 items-center gap-2 rounded-full border border-line px-2.5 text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg"
                    >
                        <SearchIcon size={15} />
                        <span className="hidden items-center gap-1 sm:flex">
                            <kbd className="kbd">{isMac ? '⌘' : 'Ctrl'}</kbd>
                            <kbd className="kbd">K</kbd>
                        </span>
                    </button>
                    <ThemeToggle />
                </div>
            </nav>
            <motion.div aria-hidden="true" style={{ scaleX: progress }} className="absolute inset-x-0 -bottom-px h-px origin-left bg-signal" />
        </header>
    );
}
