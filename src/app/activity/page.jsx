import Reveal from '@/components/Reveal';
import { PageHeader } from '@/components/ui';

export const metadata = {
    title: 'Activity Feed',
    description: "What I've been up to lately - projects, learnings, and thoughts.",
};

const activities = [
    {
        type: 'project',
        date: 'Sep 2026',
        title: 'Joined Vaatun as Software Engineer',
        description: 'Started a new role as a Software Engineer at Vaatun.',
        icon: '🚀',
    },
    {
        type: 'project',
        date: 'Jan 2026',
        title: 'Joined 1Fi as Software Engineer Intern',
        description: 'Building NestJS services, PostgreSQL-backed APIs, a Next.js admin portal, and Kubernetes deployments for NBFC-backed loan workflows.',
        icon: '💼',
    },
    {
        type: 'project',
        date: 'Oct 2025',
        title: 'Wrapped LabBuddy Backend Work',
        description: 'Delivered FastAPI workflows, JWT auth, AWS S3/SES integrations, background tasks, and Firebase Cloud Messaging for patient and lab operations.',
        icon: '🧪',
    },
    {
        type: 'community',
        date: '2025',
        title: 'Grew Codegeeks Community',
        description: 'Co-founded and helped run a developer community focused on learning, building, and mentoring junior developers.',
        icon: '🤝',
    },
    {
        type: 'project',
        date: 'Apr 2025',
        title: 'Shipped Plunge Social Features',
        description: 'Built React Native and Node.js social networking features, improved API latency by 40%, and delivered 15+ features in agile sprints.',
        icon: '📱',
    },
    {
        type: 'achievement',
        date: '2025',
        title: 'Best Coordinator Award',
        description: 'Awarded by Guru Gobind Singh Indraprastha University for leadership and event organization.',
        icon: '🏆',
    },
    {
        type: 'mentoring',
        date: '2024 - 2025',
        title: 'Mentored Junior Developers',
        description: 'Mentored 100+ junior developers in university coding classes and helped lead a 50+ member hackathon development team.',
        icon: '🌱',
    },
];

export default function ActivityPage() {
    return (
        <div className="pb-20">
            <PageHeader href="/activity" title="Activity Feed" intro="What I've been up to lately." />

            <ol className="ml-4 border-l border-line">
                {activities.map((activity, index) => (
                    <Reveal as="li" key={activity.title} index={index} className="relative pb-10 pl-10 last:pb-0">
                        <span
                            aria-hidden="true"
                            className="absolute top-0 -left-4 grid size-8 place-items-center rounded-full border border-line bg-card text-sm"
                        >
                            {activity.icon}
                        </span>
                        <p className="pt-1 font-mono text-xs uppercase tracking-[0.08em] text-muted">{activity.date}</p>
                        <h2 className="mt-1 text-xl font-bold">{activity.title}</h2>
                        <p className="mt-2 text-muted">{activity.description}</p>
                    </Reveal>
                ))}
            </ol>
        </div>
    );
}
