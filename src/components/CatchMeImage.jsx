'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function CatchMeImage({ src, alt }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isEscaping, setIsEscaping] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const escapeCount = useRef(0);
    const lastEscapeTime = useRef(0);
    const resetTimer = useRef(null);

    // Check if mobile and set loaded state
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        setIsLoaded(true);
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener('resize', checkMobile);
            // Cleanup timer on unmount
            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }
        };
    }, []);

    // Get random position across the whole viewport
    const getRandomScreenPosition = useCallback(() => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const imageWidth = 150;
        const imageHeight = 220;

        // Calculate bounds with padding
        const padding = 50;
        const maxX = viewportWidth - imageWidth - padding;
        const maxY = viewportHeight - imageHeight - padding;

        // Get container position to calculate offset
        const container = containerRef.current;
        if (!container) return { x: 0, y: 0 };

        const rect = container.getBoundingClientRect();

        // Random position on screen, converted to offset from container
        const targetX = padding + Math.random() * (maxX - padding);
        const targetY = padding + Math.random() * (maxY - padding);

        return {
            x: targetX - rect.left,
            y: targetY - rect.top
        };
    }, []);

    // Escape function - moves across whole screen
    const escape = useCallback(() => {
        const now = Date.now();
        // Prevent escape spam - minimum 80ms between escapes
        if (now - lastEscapeTime.current < 80) return;
        lastEscapeTime.current = now;

        if (isMobile) {
            // On mobile, just wiggle
            setIsEscaping(true);
            setTimeout(() => setIsEscaping(false), 500);
            return;
        }

        // Get random position across the whole screen
        const newPos = getRandomScreenPosition();

        // Make sure it's not too close to current position
        const minDistance = 200;
        if (Math.abs(newPos.x - position.x) < minDistance && Math.abs(newPos.y - position.y) < minDistance) {
            newPos.x += (Math.random() > 0.5 ? 1 : -1) * minDistance;
            newPos.y += (Math.random() > 0.5 ? 1 : -1) * minDistance;
        }

        setPosition(newPos);
        setIsEscaping(true);
        setShowHint(false);
        escapeCount.current += 1;

        // Clear existing timer
        if (resetTimer.current) {
            clearTimeout(resetTimer.current);
        }

        // Reset position after 5 seconds of no interaction
        resetTimer.current = setTimeout(() => {
            setPosition({ x: 0, y: 0 });
            escapeCount.current = 0;
            setShowHint(true);
        }, 5000);

        setTimeout(() => setIsEscaping(false), 100);
    }, [isMobile, position, getRandomScreenPosition]);

    // Don't render until loaded to prevent flash
    if (!isLoaded) {
        return (
            <div style={{ width: '150px', height: '220px', flexShrink: 0 }} />
        );
    }

    return (
        <div className="catch-me-container" ref={containerRef}>
            {/* Hint arrow and text */}
            <div className={`catch-me-hint ${showHint ? 'visible' : 'hidden'}`}>
                <span className="catch-me-text">catch me if you can</span>
                <svg className="catch-me-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </div>

            {/* Escapable image */}
            <div
                ref={imageRef}
                className={`catch-me-image ${isEscaping ? 'escaping' : ''} ${isMobile && isEscaping ? 'wiggle' : ''}`}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                }}
                onMouseEnter={escape}
                onMouseMove={escape}
            >
                <img src={src} alt={alt} />
            </div>

            <style jsx>{`
                .catch-me-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex-shrink: 0;
                }

                .catch-me-hint {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    opacity: 1;
                    transition: opacity 0.3s ease;
                    flex-shrink: 0;
                }

                .catch-me-hint.hidden {
                    opacity: 0;
                }

                .catch-me-text {
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: var(--foreground-secondary);
                    font-style: italic;
                    white-space: nowrap;
                    animation: bounce-text 2s ease-in-out infinite;
                }

                .catch-me-arrow {
                    color: var(--accent);
                    animation: bounce-arrow 1s ease-in-out infinite;
                }

                .catch-me-image {
                    position: relative;
                    width: 150px;
                    height: 220px;
                    border-radius: 16px;
                    overflow: hidden;
                    flex-shrink: 0;
                    border: 3px solid var(--border);
                    cursor: none;
                    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                                border-color 0.3s ease,
                                box-shadow 0.3s ease;
                    will-change: transform;
                    z-index: 1000;
                    background: var(--background);
                }

                .catch-me-image:hover {
                    border-color: var(--accent);
                    box-shadow: 0 10px 40px -10px var(--accent);
                }

                .catch-me-image.escaping {
                    transition: transform 0.15s ease-out;
                }

                .catch-me-image.wiggle {
                    animation: wiggle 0.5s ease-in-out;
                }

                .catch-me-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    pointer-events: none;
                }

                @keyframes bounce-arrow {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    50% {
                        transform: translateX(5px);
                    }
                }

                @keyframes bounce-text {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-2px);
                    }
                }

                @keyframes wiggle {
                    0%, 100% {
                        transform: rotate(0deg);
                    }
                    25% {
                        transform: rotate(-5deg);
                    }
                    75% {
                        transform: rotate(5deg);
                    }
                }

                @media (max-width: 768px) {
                    .catch-me-hint {
                        display: none;
                    }
                    .catch-me-image {
                        width: 100px;
                        height: 150px;
                        position: relative;
                    }
                }
            `}</style>
        </div>
    );
}
