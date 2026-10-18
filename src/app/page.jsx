import Hero from '@/components/sections/Hero';
import Statement from '@/components/sections/Statement';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Reading from '@/components/sections/Reading';
import Community from '@/components/sections/Community';
import ExploreMore from '@/components/sections/ExploreMore';
import Contact from '@/components/sections/Contact';
import { Section } from '@/components/ui';
import { books } from '@/lib/site';

export default function Home() {
    return (
        <>
            <Hero />
            <Statement />
            <Projects />
            <Skills />
            <Experience />
            <Section id="reading" index={4} name="reading" meta={`${books.length} books`} title="Currently reading">
                <Reading />
            </Section>
            <Community />
            <ExploreMore />
            <Contact />
        </>
    );
}
