'use client';

import { useEffect, useRef } from 'react';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01';

// "Decrypts" monospace text the first time it scrolls into view. Mono font = fixed width, so nothing shifts.
// Screen readers get the real text from the hidden copy; the animated copy is aria-hidden.
export default function Scramble({ text }) {
    const ref = useRef(null);

    useEffect(() => {
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const el = ref.current;
        let frame = 0;
        let raf;
        const run = () => {
            const revealed = frame / 2; // two frames per letter
            el.textContent = [...text]
                .map((c, i) => (c === ' ' || i < revealed ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
                .join('');
            frame++;
            if (revealed < text.length) raf = requestAnimationFrame(run);
            else el.textContent = text;
        };
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            run();
        });
        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [text]);

    return (
        <>
            <span className="sr-only">{text}</span>
            <span ref={ref} aria-hidden="true">
                {text}
            </span>
        </>
    );
}
