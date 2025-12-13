'use client';

import { useEffect, useRef } from 'react';

export default function Community() {
    const communityRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = communityRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Codegeeks community photos
    const communityImages = [
        '/codegeeks/1.jpg',
        '/codegeeks/2.jpg',
        '/codegeeks/3.jpg',
        '/codegeeks/4.jpg',
        '/codegeeks/IMG_2581.HEIC',
    ];

    // Shuffle array to randomize order
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Create different shuffled versions for each row
    const row1Images = [...shuffleArray(communityImages), ...shuffleArray(communityImages), ...shuffleArray(communityImages)];
    const row2Images = [...shuffleArray(communityImages), ...shuffleArray(communityImages), ...shuffleArray(communityImages)];
    const row3Images = [...shuffleArray(communityImages), ...shuffleArray(communityImages), ...shuffleArray(communityImages)];

    return (
        <section className="section community-section" ref={communityRef} id="community">
            <div className="section-title animate-on-scroll" style={{ opacity: 0 }}>
                <h2>Codegeeks Community</h2>
            </div>

            <div className="community-intro animate-on-scroll" style={{ opacity: 0, animationDelay: '0.1s' }}>
                <p className="community-description">
                    Co-founder of <strong>Codegeeks</strong>, a thriving coding community where developers connect, learn, and build together.
                </p>
                <a
                    href="https://whatsapp.com/channel/0029Vb6t1WcDZ4LUSuMSo62S"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="join-button"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Join Now
                </a>
            </div>

            <div className="marquee-3d-container animate-on-scroll" style={{ opacity: 0, animationDelay: '0.2s' }}>
                <div className="marquee-3d">
                    {/* First row - moving right */}
                    <div className="marquee-row marquee-row-1">
                        {row1Images.map((image, index) => (
                            <div key={`row1-${index}`} className="marquee-item">
                                <img src={image} alt={`Codegeeks community ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    {/* Second row - moving left */}
                    <div className="marquee-row marquee-row-2">
                        {row2Images.map((image, index) => (
                            <div key={`row2-${index}`} className="marquee-item">
                                <img src={image} alt={`Codegeeks community ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    {/* Third row - moving right */}
                    <div className="marquee-row marquee-row-3">
                        {row3Images.map((image, index) => (
                            <div key={`row3-${index}`} className="marquee-item">
                                <img src={image} alt={`Codegeeks community ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .community-section {
                    padding: 4rem 0;
                }

                .community-intro {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .community-description {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: var(--foreground-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                }

                .community-description strong {
                    color: var(--accent);
                    font-weight: 600;
                }

                .join-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 1.5rem;
                    padding: 0.75rem 1.5rem;
                    background: #25D366;
                    color: white;
                    border-radius: 999px;
                    font-weight: 600;
                    font-size: 1rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                }

                .join-button:hover {
                    background: #20BA5A;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
                    color: white;
                }

                .join-button svg {
                    flex-shrink: 0;
                }

                .marquee-3d-container {
                    perspective: 1500px;
                    overflow: hidden;
                    padding: 4rem 0;
                    position: relative;
                }

                .marquee-3d-container::before,
                .marquee-3d-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 150px;
                    z-index: 10;
                    pointer-events: none;
                }

                .marquee-3d-container::before {
                    left: 0;
                    background: linear-gradient(to right, var(--background) 0%, transparent 100%);
                }

                .marquee-3d-container::after {
                    right: 0;
                    background: linear-gradient(to left, var(--background) 0%, transparent 100%);
                }

                .marquee-3d {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    transform-style: preserve-3d;
                    transform: rotateX(35deg) rotateZ(-20deg);
                }

                .marquee-row {
                    display: flex;
                    gap: 1.5rem;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }

                .marquee-row-1 {
                    animation: marqueeRight 30s linear infinite;
                }

                .marquee-row-2 {
                    animation: marqueeLeft 35s linear infinite;
                }

                .marquee-row-3 {
                    animation: marqueeRight 40s linear infinite;
                }

                .marquee-item {
                    flex-shrink: 0;
                    width: 280px;
                    height: 200px;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 2px solid var(--border);
                    background: var(--card-bg);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .marquee-item:hover {
                    transform: translateY(-8px) scale(1.05);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
                    border-color: var(--accent);
                    z-index: 10;
                }

                .marquee-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                @keyframes marqueeRight {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes marqueeLeft {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                @media (max-width: 768px) {
                    .marquee-item {
                        width: 220px;
                        height: 160px;
                    }

                    .marquee-row {
                        gap: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .community-section {
                        padding: 2rem 0;
                    }
                    .community-intro {
                        margin-bottom: 2rem;
                    }
                    .community-description {
                        font-size: 0.9375rem;
                        padding: 0 0.5rem;
                    }
                    .join-button {
                        font-size: 0.9375rem;
                        padding: 0.875rem 1.25rem;
                        min-height: 48px;
                    }
                    .marquee-3d-container {
                        padding: 2rem 0;
                        perspective: none;
                        overflow-x: hidden;
                    }
                    .marquee-3d-container::before,
                    .marquee-3d-container::after {
                        width: 50px;
                    }
                    .marquee-3d {
                        transform: none;
                        gap: 1rem;
                    }
                    .marquee-row {
                        gap: 1rem;
                    }
                    .marquee-item {
                        width: 180px;
                        height: 130px;
                    }
                }
            `}</style>
        </section>
    );
}
