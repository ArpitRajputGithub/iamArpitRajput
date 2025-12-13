'use client';

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
} from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

// Custom hook for dock item sizing with magnification effect
function useDockItemSize(mouseY, baseItemSize, magnification, distance, ref, spring) {
    const mouseDistance = useTransform(mouseY, (val) => {
        if (typeof val !== 'number' || isNaN(val)) return 0;
        const rect = ref.current?.getBoundingClientRect() ?? {
            y: 0,
            height: baseItemSize,
        };
        return val - rect.y - baseItemSize / 2;
    });

    const targetSize = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        [baseItemSize, magnification, baseItemSize]
    );

    return useSpring(targetSize, spring);
}

// Home Icon
const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

// User Icon (About)
const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

// Folder Icon (Projects)
const FolderIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
);

// Code Icon (Skills)
const CodeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
);

// Briefcase Icon (Experience)
const BriefcaseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

// Mail Icon (Contact)
const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

// GitHub Icon
const GitHubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

// LinkedIn Icon
const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

// Users Icon (Community)
const UsersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

// Dock Item Component
function DockItem({
    icon,
    label,
    onClick,
    mouseY,
    baseItemSize,
    magnification,
    distance,
    spring,
}) {
    const ref = useRef(null);
    const isHovered = useMotionValue(0);
    const size = useDockItemSize(
        mouseY,
        baseItemSize,
        magnification,
        distance,
        ref,
        spring
    );
    const [showLabel, setShowLabel] = useState(false);

    useEffect(() => {
        const unsubscribe = isHovered.on('change', (value) =>
            setShowLabel(value === 1)
        );
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <motion.div
            ref={ref}
            style={{ width: size, height: size }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            onClick={onClick}
            className="dock-item"
            tabIndex={0}
            role="button"
            aria-label={label}
        >
            <div className="dock-item-icon">{icon}</div>
            <AnimatePresence>
                {showLabel && (
                    <motion.div
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: -10 }}
                        exit={{ opacity: 0, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="dock-item-label"
                        role="tooltip"
                    >
                        {label}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Navigation items for the dock
const navigationItems = [
    { icon: <HomeIcon />, label: 'Home', href: '#home' },
    { icon: <FolderIcon />, label: 'Projects', href: '#projects' },
    { icon: <CodeIcon />, label: 'Skills', href: '#skills' },
    { icon: <BriefcaseIcon />, label: 'Experience', href: '#experience' },
    { icon: <UsersIcon />, label: 'Community', href: '#community' },
    { icon: <MailIcon />, label: 'Contact', href: '#contact' },
    { icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/ArpitRajputGithub', external: true },
    { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/arpit-rajput-831393213/', external: true },
];

// Main Navigation Dock Component
export default function NavigationDock({
    className = '',
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 60,
    distance = 140,
    panelWidth = 56,
    baseItemSize = 40,
}) {
    const mouseY = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxWidth = useMemo(
        () => Math.max(panelWidth + 20, magnification + 20),
        [magnification, panelWidth]
    );

    const animatedWidth = useSpring(
        useTransform(isHovered, [0, 1], [panelWidth, maxWidth]),
        spring
    );

    const handleItemClick = (item) => {
        if (item.external) {
            window.open(item.href, '_blank', 'noopener,noreferrer');
        } else {
            document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            style={{ width: animatedWidth }}
            className={`navigation-dock ${className}`}
        >
            <motion.div
                onMouseMove={({ pageY }) => {
                    isHovered.set(1);
                    mouseY.set(pageY);
                }}
                onMouseLeave={() => {
                    isHovered.set(0);
                    mouseY.set(Infinity);
                }}
                className="navigation-dock-panel"
                role="toolbar"
                aria-label="Navigation dock"
            >
                {navigationItems.map((item, index) => (
                    <DockItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        onClick={() => handleItemClick(item)}
                        mouseY={mouseY}
                        baseItemSize={baseItemSize}
                        magnification={magnification}
                        distance={distance}
                        spring={spring}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}
