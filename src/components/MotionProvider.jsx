'use client';

import { MotionConfig } from 'motion/react';

// Site-wide Motion settings. reducedMotion="user": visitors who turn on "reduce motion" in their OS
// get fades only (no sliding, scaling or layout movement), for every Motion animation at once.
export default function MotionProvider({ children }) {
    return (
        <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </MotionConfig>
    );
}
