'use client';

import { useEffect, useRef } from 'react';
import { ScrollReveal } from '@/components/lightswind/scroll-reveal';

const experiences = [
    {
        title: 'Full Stack Developer',
        company: 'LabBuddy',
        location: 'Delhi, India',
        duration: 'Apr 2025 - Oct 2025',
        description: 'Developed secure RESTful APIs and real-time notification systems for patient and lab management workflows.',
        highlights: [
            'Developed secure RESTful APIs using Python (FastAPI) for patient and lab management workflows',
            'Implemented JWT-based authentication and authorization, reducing security vulnerabilities by 95%',
            'Integrated AWS S3 for storage and AWS SES for notifications, achieving 99.9% uptime',
            'Built asynchronous background tasks, improving system responsiveness and user experience by 60%',
            'Designed and deployed Firebase Cloud Messaging for real-time push notifications with a 98% delivery rate',
            'Collaborated with 8-member agile team in daily standups, sprint planning, and reviews',
        ],
    },
    {
        title: 'Full Stack Developer',
        company: 'Plunge',
        location: 'Delhi, India',
        duration: 'Dec 2024 - Apr 2025',
        description: 'Architected and developed social networking features using React Native and Node.js, enhancing user experience and system scalability.',
        highlights: [
            'Optimized API response times, reducing backend latency by 40% and improving engagement by 25%',
            'Implemented MongoDB schemas for efficient data retrieval, improving database query performance and application responsiveness',
            'Delivered 15+ features in agile sprints, collaborating with PMs and designers',
            'Established CI/CD pipelines (GitHub Actions), cutting deployment time by 50%',
            'Conducted code reviews and mentored juniors, raising team coding standards',
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
