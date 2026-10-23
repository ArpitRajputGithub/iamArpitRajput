'use client';

import { motion } from 'motion/react';

// The photo "renders in" from top to bottom behind an amber scan line, like an image arriving over the wire.
export default function ScanPhoto({ src, alt, size = 88 }) {
    const scan = { duration: 1.1, ease: 'linear', delay: 0.25 };
    return (
        <div className="relative shrink-0 overflow-hidden rounded-xl border border-line bg-surface" style={{ width: size, height: size }}>
            <motion.img
                src={src}
                alt={alt}
                width={size}
                height={size}
                className="size-full object-cover grayscale-[35%]"
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)' }}
                transition={scan}
            />
            <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 h-px bg-signal shadow-[0_0_10px_var(--signal)]"
                initial={{ top: '0%', opacity: 1 }}
                animate={{ top: '100%', opacity: 0 }}
                transition={{ top: scan, opacity: { delay: scan.delay + scan.duration, duration: 0.25 } }}
            />
            {/* faint scanlines over the photo */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.12)_0_1px,transparent_1px_3px)]"
            />
        </div>
    );
}
