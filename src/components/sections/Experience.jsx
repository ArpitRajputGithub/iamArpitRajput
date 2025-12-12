'use client';

import { useEffect, useRef } from 'react';
import { ScrollReveal } from '@/components/lightswind/scroll-reveal';

const experiences = [
    {
        title: 'Software Developer',
        company: 'Company Name',
        location: 'Remote',
        duration: 'Jan 2024 - Present',
        description: 'Working on full-stack development projects using modern technologies. Building scalable web applications and APIs.',
        highlights: [
            'Developed and maintained web applications using React and Node.js',
            'Implemented CI/CD pipelines for automated deployments',
            'Collaborated with cross-functional teams to deliver projects on time',
        ],
    },
    {
        title: 'Freelance Developer',
        company: 'Self-Employed',
        location: 'Remote',
        duration: 'Jun 2023 - Dec 2023',
        description: 'Worked with various clients to build custom web solutions tailored to their business needs.',
        highlights: [
            'Built e-commerce platforms for small businesses',
            'Created responsive and accessible user interfaces',
            'Managed client relationships and project timelines',
        ],
    },
];

export default function Experience() {
    const experienceRef = useRef(null);

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

        const elements = experienceRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="section" ref={experienceRef} id="experience">
            <div className="section-title animate-on-scroll" style={{ opacity: 0 }}>
                <h2>Experience</h2>
            </div>

            <div className="timeline">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="timeline-item animate-on-scroll"
                        style={{ opacity: 0, animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                        <div className="experience-header">
                            <h3 className="experience-title">{exp.title}</h3>
                            <span className="experience-duration">{exp.duration}</span>
                        </div>
                        <p className="experience-company">
                            {exp.company} • {exp.location}
                        </p>
                        <p className="experience-description">{exp.description}</p>
                        <ul className="experience-highlights">
                            {exp.highlights.map((highlight, hIndex) => (
                                <li key={hIndex}>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }
        .experience-title {
          font-size: 1.1rem;
          margin-bottom: 0;
        }
        .experience-duration {
          font-size: 0.875rem;
          color: var(--accent);
          font-weight: 500;
        }
        .experience-company {
          font-size: 0.95rem;
          color: var(--foreground-secondary);
          margin-bottom: 0.75rem;
        }
        .experience-description {
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 0.75rem;
        }
        .experience-highlights {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .experience-highlights li {
          position: relative;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          color: var(--foreground-secondary);
          line-height: 1.6;
          margin-bottom: 0.25rem;
        }
        .experience-highlights li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--accent);
        }
      `}</style>
        </section>
    );
}
