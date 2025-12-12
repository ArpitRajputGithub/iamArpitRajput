'use client';

import { useEffect, useRef } from 'react';
import { ScrollReveal } from '@/components/lightswind/scroll-reveal';

export default function About() {
  const aboutRef = useRef(null);

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

    const elements = aboutRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" ref={aboutRef} id="about">
      <div className="section-title animate-on-scroll" style={{ opacity: 0 }}>
        <h2>About Me</h2>
      </div>

      <div className="about-content">
        <div className="about-text">
          <ScrollReveal size="sm" align="left" staggerDelay={0.03} enableBlur={true}>
            I'm a passionate software developer with a love for creating elegant solutions to complex problems. With experience in full-stack development, I specialize in building modern web applications using cutting-edge technologies.
          </ScrollReveal>
          <p className="animate-on-scroll" style={{ opacity: 0, animationDelay: '0.2s' }}>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community.
          </p>
          <p className="animate-on-scroll" style={{ opacity: 0, animationDelay: '0.3s' }}>
            I believe in writing clean, maintainable code and creating intuitive user experiences. I'm always eager to learn new things and take on challenging projects.
          </p>
        </div>

        <div className="about-highlights animate-on-scroll" style={{ opacity: 0, animationDelay: '0.2s' }}>
          <div className="highlight-card">
            <span className="highlight-number">2+</span>
            <span className="highlight-label">Years Experience</span>
          </div>
          <div className="highlight-card">
            <span className="highlight-number">10+</span>
            <span className="highlight-label">Projects Completed</span>
          </div>
          <div className="highlight-card">
            <span className="highlight-number">5+</span>
            <span className="highlight-label">Technologies</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-content {
          display: grid;
          gap: 2rem;
        }
        .about-text p {
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .about-text p:last-child {
          margin-bottom: 0;
        }
        .about-highlights {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }
        .highlight-card {
          background: var(--background-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        .highlight-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
        }
        .highlight-number {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .highlight-label {
          display: block;
          font-size: 0.875rem;
          color: var(--foreground-secondary);
          margin-top: 0.25rem;
        }
        @media (max-width: 600px) {
          .about-highlights {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
