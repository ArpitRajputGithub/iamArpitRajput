import Reveal from '@/components/Reveal';
import { ListRow, PageHeader } from '@/components/ui';

export const metadata = {
    title: 'Downloads',
    description: 'Resume, starter templates, API boilerplates, and resources.',
};

const downloadItems = [
    {
        title: 'Resume',
        description: 'My latest resume with work experience and skills',
        fileType: 'PDF',
        href: '/downloads/resume.pdf',
    },
    {
        title: 'Starter Templates',
        description: 'A compact checklist for Next.js, React, and Node.js project starters',
        fileType: 'ZIP',
        href: '/downloads/starter-templates.zip',
    },
    {
        title: 'API Boilerplates',
        description: 'Backend patterns for REST APIs, auth, validation, and database design',
        fileType: 'ZIP',
        href: '/downloads/api-boilerplates.zip',
    },
    {
        title: 'Coding Notes',
        description: 'Personal engineering notes for backend, frontend, and deployment checklists',
        fileType: 'PDF',
        href: '/downloads/coding-notes.pdf',
    },
    {
        title: 'Design Kit',
        description: 'Portfolio design tokens, typography, color palette, and component conventions',
        fileType: 'ZIP',
        href: '/downloads/design-kit.zip',
    },
];

export default function DownloadsPage() {
    return (
        <div className="pb-20">
            <PageHeader href="/downloads" title="Downloads" />

            <div className="border-t border-line">
                {downloadItems.map((item, index) => (
                    <Reveal key={item.href} index={index}>
                        <ListRow href={item.href} title={item.title} meta={item.fileType} download>
                            {item.description}
                        </ListRow>
                    </Reveal>
                ))}
            </div>

            <Reveal as="p" className="mt-10 text-center text-muted">
                More resources coming soon! Follow me for updates.
            </Reveal>
        </div>
    );
}
