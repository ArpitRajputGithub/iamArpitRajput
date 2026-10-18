import Reveal from '@/components/Reveal';
import { PageHeader } from '@/components/ui';

export const metadata = {
    title: 'How I Work',
    description: 'My engineering philosophy and principles for building great software.',
};

const philosophyPrinciples = [
    {
        title: 'Ship Fast, Iterate Often',
        description: 'I believe in getting things out quickly and improving based on real feedback. Perfection is the enemy of progress.',
    },
    {
        title: 'Code for Humans',
        description: 'Clean, readable code is more important than clever code. Future me (and my teammates) will thank present me.',
    },
    {
        title: 'Embrace Complexity, Simplify Solutions',
        description: 'Complex problems deserve elegant solutions. I break down challenges into manageable pieces.',
    },
    {
        title: 'Collaborate & Communicate',
        description: 'Great software is built by great teams. I prioritize clear communication and knowledge sharing.',
    },
    {
        title: 'Never Stop Learning',
        description: 'Technology evolves fast. I dedicate time to learning new tools, patterns, and best practices.',
    },
    {
        title: 'Automate Everything',
        description: 'If I do something twice, I automate it. Efficiency compounds over time.',
    },
];

export default function PhilosophyPage() {
    return (
        <div className="pb-20">
            <PageHeader href="/philosophy"
                title="How I Work"
                intro="Engineering is more than writing code. It's about solving problems, building systems that scale, and creating value for users. Here's my philosophy."
            />

            <ol className="border-t border-line">
                {philosophyPrinciples.map((principle, index) => (
                    <Reveal
                        as="li"
                        key={principle.title}
                        index={index}
                        className="grid gap-2 border-b border-line py-6 sm:grid-cols-[4rem_1fr]"
                    >
                        <span className="font-mono text-sm text-muted">{String(index + 1).padStart(2, '0')}</span>
                        <div>
                            <h2 className="text-xl font-bold">{principle.title}</h2>
                            <p className="mt-1 text-muted">{principle.description}</p>
                        </div>
                    </Reveal>
                ))}
            </ol>

            <Reveal as="figure" className="mt-14 rounded-2xl bg-surface p-8 sm:p-10">
                <blockquote className="text-2xl leading-snug font-bold">
                    "The best code is no code at all. Every new line of code you willingly bring into the world is code
                    that has to be debugged, code that has to be read and understood."
                </blockquote>
                <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-muted">— Jeff Atwood</figcaption>
            </Reveal>
        </div>
    );
}
