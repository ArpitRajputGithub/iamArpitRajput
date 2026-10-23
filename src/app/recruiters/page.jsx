import { email } from '@/lib/site';
import Reveal from '@/components/Reveal';
import { ButtonLink, Card, PageHeader, Tag } from '@/components/ui';
import { DownloadIcon, MailIcon } from '@/components/icons';

export const metadata = {
    title: 'For Recruiters',
    description: 'Quick overview: availability, skills, and hiring info.',
};

const skills = [
    'JavaScript', 'TypeScript', 'Python', 'React', 'Next.js',
    'Node.js', 'NestJS', 'FastAPI', 'PostgreSQL', 'MongoDB',
    'AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Better Auth'
];

const highlights = [
    { label: 'Experience', value: '2+ Years' },
    { label: 'Work Preference', value: 'Remote / Hybrid' },
    { label: 'Availability', value: 'Not looking, happy to chat' },
    { label: 'Location', value: 'India' },
];

export default function RecruitersPage() {
    return (
        <div className="pb-20">
            <PageHeader href="/recruiters" title="For Recruiters" />

            <div className="grid grid-cols-2 gap-3">
                {highlights.map((item, index) => (
                    <Reveal key={item.label} index={index}>
                        <Card className="h-full">
                            <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{item.label}</p>
                            <p className="mt-2 text-lg leading-snug font-bold">{item.value}</p>
                        </Card>
                    </Reveal>
                ))}
            </div>

            <Reveal className="mt-14">
                <h2 className="text-2xl font-extrabold">Tech Stack</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <Tag key={skill}>{skill}</Tag>
                    ))}
                </div>
            </Reveal>

            <Reveal className="mt-14 rounded-2xl bg-surface p-8 sm:p-10">
                <h2 className="text-2xl font-extrabold">Let's Connect</h2>
                <p className="mt-2 max-w-lg text-muted">
                    I'm not looking for a new role right now, but I'm always happy to chat about engineering, ideas, or collaborations.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink href={`mailto:${email}`}>
                        <MailIcon size={16} /> Send Email
                    </ButtonLink>
                    <ButtonLink href="/downloads/resume.pdf" variant="secondary" download>
                        <DownloadIcon size={16} /> Download Resume
                    </ButtonLink>
                </div>
            </Reveal>
        </div>
    );
}
