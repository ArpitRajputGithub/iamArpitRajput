import Reveal from '@/components/Reveal';
import { Card, PageHeader } from '@/components/ui';
import { ArrowUpRightIcon } from '@/components/icons';

export const metadata = {
    title: 'Research Papers',
    description: 'Papers and resources that shaped my thinking as an engineer.',
};

const papers = [
    {
        title: 'Attention Is All You Need',
        authors: 'Vaswani et al.',
        year: '2017',
        category: 'AI/ML',
        summary: 'Introduced the Transformer architecture that revolutionized NLP and became the foundation for models like GPT and BERT.',
        insight: 'This paper changed how I think about sequence modeling. The self-attention mechanism is beautifully elegant.',
        link: 'https://arxiv.org/abs/1706.03762',
    },
    {
        title: 'Designing Data-Intensive Applications',
        authors: 'Martin Kleppmann',
        year: '2017',
        category: 'System Design',
        summary: 'Comprehensive guide to building reliable, scalable, and maintainable data systems.',
        insight: 'My go-to resource for understanding trade-offs in distributed systems. Every engineer should read this.',
        link: 'https://dataintensive.net/',
    },
    {
        title: 'The Twelve-Factor App',
        authors: 'Heroku',
        year: '2012',
        category: 'DevOps',
        summary: 'Methodology for building modern, scalable, maintainable software-as-a-service applications.',
        insight: 'These principles have guided how I structure every production application I build.',
        link: 'https://12factor.net/',
    },
    {
        title: 'MapReduce: Simplified Data Processing',
        authors: 'Dean & Ghemawat (Google)',
        year: '2004',
        category: 'Distributed Systems',
        summary: 'Programming model for processing large data sets with parallel, distributed algorithm on clusters.',
        insight: 'Understanding MapReduce helped me think about data parallelism and fault tolerance at scale.',
        link: 'https://research.google/pubs/pub62/',
    },
    {
        title: 'CAP Theorem',
        authors: 'Eric Brewer',
        year: '2000',
        category: 'Distributed Systems',
        summary: 'States that a distributed system can only guarantee two of three: Consistency, Availability, Partition tolerance.',
        insight: 'Essential mental model for making architecture decisions in distributed systems.',
        link: 'https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/',
    },
];

export default function ResearchPage() {
    return (
        <div className="pb-20">
            <PageHeader href="/research" title="Research Papers" intro="Papers and resources that shaped my thinking as an engineer." />

            <div className="grid gap-4">
                {papers.map((paper, index) => (
                    <Reveal as="article" key={paper.title} index={index}>
                        <Card>
                            <p className="flex justify-between gap-4 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                                <span>{paper.category}</span>
                                <span>{paper.year}</span>
                            </p>
                            <h2 className="mt-3 text-xl font-bold">{paper.title}</h2>
                            <p className="text-sm text-muted">{paper.authors}</p>
                            <p className="mt-3">{paper.summary}</p>
                            <p className="mt-4 border-l-2 border-accent pl-4 text-muted">
                                <strong className="text-fg">My Take:</strong> {paper.insight}
                            </p>
                            <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group mt-5 inline-flex items-center gap-1 text-sm font-medium"
                            >
                                Read Paper
                                <ArrowUpRightIcon
                                    size={14}
                                    className="transition-transform duration-150 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </a>
                        </Card>
                    </Reveal>
                ))}
            </div>

            <Reveal as="p" className="mt-10 text-center text-muted">
                I'm always reading and learning. This list gets updated regularly!
            </Reveal>
        </div>
    );
}
