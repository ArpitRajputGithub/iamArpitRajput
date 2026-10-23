'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const text = "Software engineering is more than writing code. It's about solving problems, building systems that scale, and creating value for users.";
const words = text.split(' ');
const accentFrom = words.indexOf('creating'); // the last phrase is set in the signal colour

// A flat line with two heartbeat spikes, like a healthy service on a monitoring graph
const PULSE = 'M0 30 H200 L214 30 L224 6 L236 54 L246 30 H430 L440 30 L448 16 L456 44 L464 30 H720';

// Each word's opacity follows its own slice of the scroll progress, so the sentence lights up as you read
function Word({ progress, index, children }) {
    const start = index / words.length;
    const opacity = useTransform(progress, [start, start + 1 / words.length], [0.15, 1]);
    return (
        <motion.span style={{ opacity }} className={index >= accentFrom ? 'text-signal' : undefined}>
            {children}{' '}
        </motion.span>
    );
}

export default function Statement() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });

    return (
        <section aria-label="Philosophy" className="border-t border-dashed border-line-strong py-24 sm:py-32">
            <p ref={ref} className="text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-6xl">
                {words.map((word, i) => (
                    <Word key={i} progress={scrollYProgress} index={i}>
                        {word}
                    </Word>
                ))}
            </p>
            <svg viewBox="0 0 720 60" preserveAspectRatio="none" aria-hidden="true" className="mt-12 h-12 w-full text-signal">
                <motion.path d={PULSE} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" style={{ pathLength: scrollYProgress }} />
            </svg>
        </section>
    );
}
