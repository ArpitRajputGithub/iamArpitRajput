'use client';

import { motion } from 'motion/react';
import Scramble from './fx/Scramble';

// Section label drawn like a span in a tracing tool (Jaeger, Honeycomb): a name, and a bar that fills
// when the section scrolls into view. Each section's bar starts a bit further right than the last,
// so scrolling the home page reads like one waterfall trace.
export default function SpanHeader({ index, name, meta }) {
    const start = Math.min((index - 1) * 9, 60); // % offset of this span in the "trace"
    const width = Math.min(100 - start, 28 + ((index * 23) % 37));

    return (
        <div className="font-mono text-xs text-muted">
            <div className="flex items-baseline justify-between gap-4">
                <span>
                    <span className="text-signal">{String(index).padStart(2, '0')}</span>
                    <span className="mx-2 text-line-strong">/</span>
                    <Scramble text={name} />
                </span>
                {meta && <span>{meta}</span>}
            </div>
            <div className="relative mt-2 h-[3px] rounded-full bg-line">
                <motion.div
                    className="absolute inset-y-0 origin-left rounded-full bg-signal"
                    style={{ left: `${start}%`, width: `${width}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
        </div>
    );
}
