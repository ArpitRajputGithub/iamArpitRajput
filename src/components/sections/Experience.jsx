import Reveal from '../Reveal';
import { Section } from '../ui';

const experiences = [
    {
        title: 'Software Engineer',
        company: 'Vaatun',
        duration: 'Sep 2026 - Present',
    },
    {
        title: 'Software Engineer Intern',
        company: '1Fi',
        location: 'Gurugram, India',
        duration: 'Jan 2026 - Sep 2026', // end month assumed from the Sep 2026 Vaatun start; confirm
        description: 'Built backend services and internal tools for NBFC-backed loan management workflows.',
        highlights: [
            'Built backend services for a Loan Management System using NestJS, supporting loan creation, customer management, and loan-security assignment workflows',
            'Developed REST APIs for loan, customer, merchant, and admin modules with PostgreSQL data persistence and structured request validation',
            'Created a Next.js admin portal for internal teams to manage loans, merchants, customers, and operational workflows through a centralized dashboard',
            'Implemented secure authentication and authorization using Better Auth across protected APIs and admin-facing frontend routes',
            'Containerized services with Docker and deployed applications on Kubernetes using Deployments, Services, Ingress, ConfigMaps, and Secrets',
            'Automated build, test, and deployment workflows using GitHub Actions CI/CD, with tests written in Jest, Vitest, and Testing Library',
        ],
    },
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
            'Architected and developed social networking features using React Native and Node.js, enhancing user experience and system scalability',
            'Optimized API response times, reducing backend latency by 40% and improving engagement by 25%',
            'Implemented MongoDB schemas for efficient data retrieval, improving database query performance and application responsiveness',
            'Delivered 15+ features in agile sprints, collaborating with PMs and designers',
            'Conducted code reviews and mentored juniors, raising team coding standards',
        ],
    },
];
// "Jan 2026 - Present" → length in months, counted like LinkedIn (both end months included)
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const toMonth = (text) => {
    if (text === 'Present') {
        const now = new Date(); // ponytail: evaluated at build time, so a running role's AGE updates on each deploy
        return now.getFullYear() * 12 + now.getMonth();
    }
    const [month, year] = text.split(' ');
    return Number(year) * 12 + MONTHS.indexOf(month);
};
function age(duration) {
    const [from, to] = duration.split(' - ');
    const months = toMonth(to) - toMonth(from) + 1;
    return months >= 12 ? `${Math.floor(months / 12)}y${months % 12 ? `${months % 12}mo` : ''}` : `${months}mo`;
}

// Experience as `kubectl get roles`: one row per job; open a row to "describe" it
export default function Experience() {
    return (
        <Section id="experience" index={3} name="experience" meta={`${experiences.length} roles`} title="Experience">
            <Reveal className="overflow-hidden rounded-xl border border-line bg-card font-mono text-xs sm:text-sm">
                <p className="border-b border-line px-4 py-3 text-muted">
                    <span className="text-signal">$</span> kubectl get roles -n career
                </p>
                <div className="grid grid-cols-[1fr_auto_3.5rem] gap-x-4 px-4 pt-3 pb-1 text-[11px] tracking-[0.08em] text-muted uppercase sm:grid-cols-[7rem_1fr_7.5rem_3.5rem]">
                    <span>Company</span>
                    <span className="hidden sm:block">Role</span>
                    <span>Status</span>
                    <span>Age</span>
                </div>
                {experiences.map((exp, index) => {
                    const running = exp.duration.endsWith('Present');
                    return (
                        <details key={exp.company} className="group border-t border-line first-of-type:border-t-0" open={index === 0}>
                            <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto_3.5rem] items-center gap-x-4 px-4 py-3 transition-colors duration-150 hover:bg-surface sm:grid-cols-[7rem_1fr_7.5rem_3.5rem] [&::-webkit-details-marker]:hidden">
                                <span className="flex items-center gap-2 text-fg">
                                    <span className="text-muted transition-transform duration-150 group-open:rotate-90">›</span>
                                    {exp.company.toLowerCase()}
                                </span>
                                <span className="hidden truncate text-muted sm:block">{exp.title}</span>
                                <span className={`flex items-center gap-1.5 ${running ? 'text-ok' : 'text-muted'}`}>
                                    <span className={`size-1.5 rounded-full ${running ? 'bg-ok' : 'bg-line-strong'}`} />
                                    {running ? 'Running' : 'Completed'}
                                </span>
                                <span className="text-muted">{age(exp.duration)}</span>
                            </summary>

                            {/* `kubectl describe`: the details of one role */}
                            <dl className="grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-1.5 border-t border-dashed border-line px-4 py-4 sm:pl-10">
                                <dt className="text-muted">Role</dt>
                                <dd className="font-sans text-sm text-fg">{exp.title}</dd>
                                <dt className="text-muted">Period</dt>
                                <dd className="font-sans text-sm">{exp.duration}</dd>
                                {exp.location && (
                                    <>
                                        <dt className="text-muted">Location</dt>
                                        <dd className="font-sans text-sm">{exp.location}</dd>
                                    </>
                                )}
                                {exp.description && (
                                    <>
                                        <dt className="text-muted">Summary</dt>
                                        <dd className="font-sans text-sm">{exp.description}</dd>
                                    </>
                                )}
                                {exp.highlights && (
                                    <>
                                        <dt className="text-muted">Events</dt>
                                        <dd>
                                            <ul className="list-disc space-y-1.5 pl-4 font-sans text-sm text-muted marker:text-signal">
                                                {exp.highlights.map((highlight) => (
                                                    <li key={highlight}>{highlight}</li>
                                                ))}
                                            </ul>
                                        </dd>
                                    </>
                                )}
                            </dl>
                        </details>
                    );
                })}
            </Reveal>
        </Section>
    );
}
