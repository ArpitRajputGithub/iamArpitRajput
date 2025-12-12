'use client';

import { useEffect, useRef } from 'react';
import { ShinyText } from '@/components/lightswind/shiny-text';
import { ScrollReveal } from '@/components/lightswind/scroll-reveal';
import CatchMeImage from '@/components/CatchMeImage';

// Social Icons
const GitHubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const TwitterIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const EmailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

export default function Hero() {
    const heroRef = useRef(null);

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

        const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="section hero-section" ref={heroRef} id="home">
            <div className="hero-content">
                <div className="hero-header">
                    <div className="hero-text">
                        <h1
                            className="hero-name animate-on-scroll"
                            style={{ opacity: 0, animationDelay: '0.1s' }}
                        >
                            <span className="hero-text-inline">Hi, I'm</span>
                            <br />
                            <ShinyText
                                speed={3}
                                shineColor="var(--accent)"
                                baseColor="var(--foreground)"
                                intensity={1}
                                className="hero-text-inline hero-name-text gradient-text"
                            >
                                Arpit Rajput
                            </ShinyText>
                        </h1>
                    </div>
                    <CatchMeImage src="/me.jpg" alt="Arpit" />
                </div>
                <p
                    className="hero-title animate-on-scroll"
                    style={{ opacity: 0, animationDelay: '0.3s' }}
                >
                    Software engineer
                </p>
                <ScrollReveal
                    size="sm"
                    align="left"
                    containerClassName="hero-description-wrapper"
                    textClassName="hero-description-text"
                    enableBlur={true}
                    staggerDelay={0.03}
                >
                    I'm a passionate developer from India. I love building things using modern frameworks and technologies. Currently working on exciting projects and always open to new opportunities.
                </ScrollReveal>

                <div
                    className="hero-actions animate-on-scroll"
                    style={{ opacity: 0, animationDelay: '0.5s' }}
                >
                    <a href="#contact" className="btn btn-primary">
                        Get in Touch
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                    <a href="#projects" className="btn btn-secondary">
                        View Projects
                    </a>
                </div>

                <div
                    className="social-links animate-on-scroll"
                    style={{ opacity: 0, animationDelay: '0.6s', marginTop: '2rem' }}
                >
                    <a href="https://github.com/ArpitRajputGithub" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                        <GitHubIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/arpit-rajput-831393213/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                        <LinkedInIcon />
                    </a>
                    <a href="https://x.com/arpitstwt" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                        <TwitterIcon />
                    </a>
                    <a href="mailto:work.arpitrajput@gmail.com" className="social-link" aria-label="Email">
                        <EmailIcon />
                    </a>
                </div>
            </div>

            <style jsx>{`
        .hero-section {
          display: flex;
          align-items: center;
          padding: 4rem 0;
        }
        .hero-content {
          max-width: 100%;
        }
        .hero-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .hero-text {
          min-width: 0;
        }
        .hero-text-inline {
          font-size: clamp(3rem, 10vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          display: inline-block;
          color: var(--foreground);
          vertical-align: baseline;
          line-height: 1.1;
        }
        .hero-name {
          margin-bottom: 0.5rem;
          line-height: 1.1;
        }
        .hero-name-text {
          font-size: clamp(3.5rem, 12vw, 6rem);
          white-space: nowrap;
        }
        .hero-image {
          width: 150px;
          height: 220px;
          border-radius: 16px;
          overflow: hidden;
          flex-shrink: 0;
          border: 3px solid var(--border);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .hero-image:hover {
          transform: scale(1.05);
          border-color: var(--accent);
        }
        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-title {
          font-size: 1.5rem;
          color: var(--foreground-secondary);
          font-weight: 500;
          margin-bottom: 1.5rem;
        }
        .hero-description {
          font-size: 1.1rem;
          max-width: 540px;
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        @media (max-width: 480px) {
          .hero-header {
            flex-direction: column-reverse;
            align-items: flex-start;
          }
          .hero-image {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
        </section>
    );
}
