'use client';

import { useEffect, useRef } from 'react';
import { ScrollReveal } from '@/components/lightswind/scroll-reveal';

const skillCategories = [
    {
        title: 'Frontend',
        skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
        title: 'Backend',
        skills: ['Node.js', 'Python', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis'],
    },
    {
        title: 'Tools & Others',
        skills: ['Git', 'Docker', 'AWS', 'Linux', 'Figma', 'VS Code'],
    },
];

export default function Skills() {
    const skillsRef = useRef(null);

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

        const elements = skillsRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="section" ref={skillsRef} id="skills">
            <div className="section-title animate-on-scroll" style={{ opacity: 0 }}>
                <h2>Skills & Technologies</h2>
            </div>

            <div className="skills-categories">
                {skillCategories.map((category, index) => (
                    <div
                        key={index}
                        className="skill-category animate-on-scroll"
                        style={{ opacity: 0, animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                        <h3 className="category-title">{category.title}</h3>
                        <div className="skills-grid">
                            {category.skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .skills-categories {
          display: grid;
          gap: 2rem;
        }
        .skill-category {
          background: var(--background-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        .skill-category:hover {
          border-color: var(--accent);
        }
        .category-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 1rem;
        }
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .skill-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--foreground);
          transition: all 0.2s ease;
        }
        .skill-tag:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-2px);
        }
      `}</style>
        </section>
    );
}
