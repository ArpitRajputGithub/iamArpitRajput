import { pages } from '@/lib/site';
import Reveal from '../Reveal';
import { ListRow, Section } from '../ui';

export default function ExploreMore() {
    return (
        <Section id="explore" index={6} name="explore" meta={`${pages.length} pages`} title="Engineering, Curiosity & Me">
            <div className="border-t border-line">
                {pages.map((page, index) => (
                    <Reveal key={page.href} index={index}>
                        <ListRow href={page.href} title={page.title} meta={page.badge}>
                            {page.description}
                        </ListRow>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}
