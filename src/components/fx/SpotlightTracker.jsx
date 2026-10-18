'use client';

import { useEffect } from 'react';

// One page-wide listener instead of a wrapper per card: any element with `data-spotlight` gets
// --x / --y set to the pointer position inside it. The glow itself is CSS (.spotlight in globals.css).
export default function SpotlightTracker() {
    useEffect(() => {
        const onMove = (e) => {
            const el = e.target.closest?.('[data-spotlight]');
            if (!el) return;
            const r = el.getBoundingClientRect();
            el.style.setProperty('--x', `${e.clientX - r.left}px`);
            el.style.setProperty('--y', `${e.clientY - r.top}px`);
        };
        document.addEventListener('pointermove', onMove, { passive: true });
        return () => document.removeEventListener('pointermove', onMove);
    }, []);
    return null;
}
