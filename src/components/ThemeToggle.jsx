'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '../lib/utils';

// Sun Icon SVG Component
const SunIcon = ({ className }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

// Moon Icon SVG Component
const MoonIcon = ({ className }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

// Animation types available
// "none" | "circle-spread" | "round-morph" | "swipe-left" | "swipe-up" | 
// "diag-down-right" | "fade-in-out" | "shrink-grow" | "flip-x-in" | 
// "split-vertical" | "swipe-right" | "swipe-down" | "wave-ripple"

export default function ThemeToggle({
    className,
    duration = 400,
    animationType = 'circle-spread',
    ...props
}) {
    const [isDark, setIsDark] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        const updateTheme = () => {
            // Check both class and data-theme attribute
            const hasDarkClass = document.documentElement.classList.contains('dark');
            const hasDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
            setIsDark(hasDarkClass || hasDarkTheme);
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'data-theme'],
        });

        return () => observer.disconnect();
    }, []);

    const toggleTheme = useCallback(async () => {
        if (!buttonRef.current) return;

        // Check if View Transitions API is supported
        if (!document.startViewTransition) {
            // Fallback for browsers without View Transitions support
            const newTheme = !isDark;
            setIsDark(newTheme);
            document.documentElement.classList.toggle('dark', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return;
        }

        // Wait for the DOM update to complete within the View Transition
        await document.startViewTransition(() => {
            flushSync(() => {
                const newTheme = !isDark;
                setIsDark(newTheme);
                document.documentElement.classList.toggle('dark', newTheme);
                document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
                localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            });
        }).ready;

        // Calculate coordinates and dimensions for spatial animations
        const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const maxRadius = Math.hypot(
            Math.max(left, window.innerWidth - left),
            Math.max(top, window.innerHeight - top)
        );
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Implement different animation types
        switch (animationType) {
            case 'circle-spread':
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${maxRadius}px at ${x}px ${y}px)`,
                        ],
                    },
                    {
                        duration,
                        easing: 'ease-in-out',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                break;

            case 'round-morph':
                document.documentElement.animate(
                    [
                        { opacity: 0, transform: 'scale(0.8) rotate(5deg)' },
                        { opacity: 1, transform: 'scale(1) rotate(0deg)' },
                    ],
                    {
                        duration: duration * 1.2,
                        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                break;

            case 'swipe-left':
                document.documentElement.animate(
                    {
                        clipPath: [
                            `inset(0 0 0 ${viewportWidth}px)`,
                            `inset(0 0 0 0)`,
                        ],
                    },
                    {
                        duration,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                break;

            case 'swipe-up':
                document.documentElement.animate(
                    {
                        clipPath: [
                            `inset(${viewportHeight}px 0 0 0)`,
                            `inset(0 0 0 0)`,
                        ],
                    },
                    {
                        duration,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                break;

            case 'diag-down-right':
                document.documentElement.animate(
                    {
                        clipPath: [
                            `polygon(0 0, 0 0, 0 0, 0 0)`,
                            `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                        ],
                    },
                    {
                        duration: duration * 1.5,
                        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                break;

            case 'fade-in-out':
                document.documentElement.animate(
                    {
                        opacity: [0, 1],
                    },
                    {
                        duration: duration * 0.5,
                        easing: 'ease-in-out',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                break;

            case 'shrink-grow':
                document.documentElement.animate(
                    [
                        { transform: 'scale(0.9)', opacity: 0 },
                        { transform: 'scale(1)', opacity: 1 },
                    ],
                    {
                        duration: duration * 1.2,
                        easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                document.documentElement.animate(
                    [
                        { transform: 'scale(1)', opacity: 1 },
                        { transform: 'scale(1.05)', opacity: 0 },
                    ],
                    {
                        duration: duration * 1.2,
                        easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
                        pseudoElement: '::view-transition-old(root)',
                    }
                );
                break;

            case 'flip-x-in':
                const styleElement = document.createElement('style');
                styleElement.textContent = `
                    ::view-transition-group(root) { perspective: 1000px; }
                    ::view-transition-old(root) { transform-origin: center; animation: flip-out 400ms forwards; }
                    ::view-transition-new(root) { transform-origin: center; animation: flip-in 400ms forwards; }
                    
                    @keyframes flip-out { from { transform: rotateY(0deg); opacity: 1; } to { transform: rotateY(-90deg); opacity: 0; } }
                    @keyframes flip-in { from { transform: rotateY(90deg); opacity: 0; } to { transform: rotateY(0deg); opacity: 1; } }
                `;
                document.head.appendChild(styleElement);
                setTimeout(() => styleElement.remove(), 1000);
                break;

            case 'split-vertical':
                document.documentElement.animate(
                    [{ opacity: 0 }, { opacity: 1 }],
                    {
                        duration: duration * 0.75,
                        easing: 'ease-in',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                document.documentElement.animate(
                    [
                        { clipPath: 'inset(0 0 0 0)', transform: 'none' },
                        { clipPath: 'inset(0 40% 0 40%)', transform: 'scale(1.2)' },
                        { clipPath: 'inset(0 50% 0 50%)', transform: 'scale(1)' },
                    ],
                    {
                        duration: duration * 1.5,
                        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        pseudoElement: '::view-transition-old(root)',
                    }
                );
                break;

            case 'swipe-right':
                document.documentElement.animate(
                    {
                        clipPath: [
                            `inset(0 ${viewportWidth}px 0 0)`,
                            `inset(0 0 0 0)`,
                        ],
                    },
                    {
                        duration,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                break;

            case 'swipe-down':
                document.documentElement.animate(
                    {
                        clipPath: [
                            `inset(0 0 ${viewportHeight}px 0)`,
                            `inset(0 0 0 0)`,
                        ],
                    },
                    {
                        duration,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                break;

            case 'wave-ripple':
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0% at 50% 50%)`,
                            `circle(${maxRadius}px at 50% 50%)`,
                        ],
                    },
                    {
                        duration: duration * 1.5,
                        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                break;

            case 'none':
            default:
                // No custom animation runs
                break;
        }
    }, [isDark, duration, animationType]);

    return (
        <>
            <button
                ref={buttonRef}
                onClick={toggleTheme}
                className={cn(
                    'theme-toggle',
                    isDark ? 'theme-toggle-dark' : 'theme-toggle-light',
                    className
                )}
                aria-label="Toggle theme"
                {...props}
            >
                {isDark ? (
                    <SunIcon className="theme-icon" />
                ) : (
                    <MoonIcon className="theme-icon" />
                )}
            </button>

            {/* View Transition styles for animations */}
            {animationType !== 'flip-x-in' && (
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                            ::view-transition-old(root),
                            ::view-transition-new(root) {
                                animation: none;
                                mix-blend-mode: normal;
                            }
                        `,
                    }}
                />
            )}
        </>
    );
}
