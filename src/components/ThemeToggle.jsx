'use client';

import { MoonIcon, SunIcon } from './icons';

const apply = (dark) => {
    const root = document.documentElement;
    root.dataset.theme = dark ? 'dark' : 'light';
    root.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
};

// Switches light/dark. The new theme spreads out as a circle from (x, y) using the View Transitions API;
// browsers without it, and visitors who ask for reduced motion, get an instant switch.
// Also used by the command palette.
export async function toggleTheme(x = innerWidth / 2, y = innerHeight / 2) {
    const dark = document.documentElement.dataset.theme !== 'dark';
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
        apply(dark);
        return;
    }
    await document.startViewTransition(() => apply(dark)).ready;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
    );
}

export default function ThemeToggle() {
    return (
        <button
            type="button"
            onClick={(e) => {
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                toggleTheme(left + width / 2, top + height / 2);
            }}
            aria-label="Toggle dark mode"
            className="grid size-9 place-items-center rounded-full border border-line text-fg transition duration-150 ease-smooth hover:rotate-12 hover:border-line-strong"
        >
            {/* Icons switch with CSS, so the right one shows on first paint (no flash) */}
            <MoonIcon size={16} className="dark:hidden" />
            <SunIcon size={16} className="hidden dark:block" />
        </button>
    );
}
