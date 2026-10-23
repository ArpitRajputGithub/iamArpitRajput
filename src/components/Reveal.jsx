'use client';

import { motion } from 'motion/react';

// Fades and slides its children in. By default when they first scroll into view;
// with `onLoad`, straight away (for the top of the page). `index` staggers siblings by 60ms each.
export default function Reveal({ as = 'div', index = 0, onLoad = false, children, ...props }) {
    const Tag = motion[as];
    const shown = { opacity: 1, y: 0 };
    return (
        <Tag
            initial={{ opacity: 0, y: 16 }}
            {...(onLoad ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: '0px 0px -10% 0px' } })}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
            {...props}
        >
            {children}
        </Tag>
    );
}
