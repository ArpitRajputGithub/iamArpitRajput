import Reveal from '../Reveal';
import { Card, Section, Tag } from '../ui';
import { ArrowUpRightIcon } from '../icons';

const projects = [
    {
        title: 'Plunge - Social Networking Platform',
        description: 'Built a responsive social networking platform serving 5,000+ active users with real-time messaging, accessible dynamic UI components, advanced search, and user recommendation flows.',
        tech: ['React Native', 'Node.js', 'MongoDB', 'Real-time Messaging'],
        demo: 'https://plunge.one',
    },
    {
        title: 'CraviiFy - Food Delivery Platform',
        description: 'Developed a secure multi-vendor food ordering app with real-time order tracking, Auth0 authentication for 1,000+ users, resilient REST APIs, and optimized database queries that reduced response times by 45%.',
        tech: ['MERN', 'Auth0', 'REST APIs', 'Caching'],
        demo: 'https://mern-food-ordering-app-frontend-8971.onrender.com',
    },
    {
        title: 'CodeZen - Hackathon Event Platform',
        description: 'Created a high-performance hackathon website handling 1,000+ concurrent users with zero downtime, 95+ Lighthouse scores, optimized server rendering, payment integration, and 500+ participant registrations.',
        tech: ['Next.js', 'Vercel', 'SSR', 'Payments'],
        demo: 'https://codezen-eight.vercel.app/',
    },
];

export default function Projects() {
    return (
        <Section id="projects" index={1} name="projects" meta={`${projects.length} shipped`} title="Proof of Work">
            <div className="grid gap-4">
                {projects.map((project, index) => (
                    <Reveal key={project.title} index={index}>
                        <Card href={project.demo}>
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-xl font-bold">{project.title}</h3>
                                <ArrowUpRightIcon
                                    size={18}
                                    className="mt-1 shrink-0 text-muted transition duration-150 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                                />
                            </div>
                            <p className="mt-2 text-muted">{project.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <Tag key={tech}>{tech}</Tag>
                                ))}
                            </div>
                        </Card>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}
