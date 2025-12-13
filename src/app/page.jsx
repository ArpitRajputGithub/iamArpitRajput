import ThemeToggle from '@/components/ThemeToggle';
import NavigationDock from '@/components/NavigationDock';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Community from '@/components/sections/Community';
import Contact from '@/components/sections/Contact';
import ExploreMore from '@/components/sections/ExploreMore';
import { Separator } from '@/components/lightswind/separator';

export default function Home() {
    return (
        <>
            <ThemeToggle />
            <NavigationDock />
            <main className="container">
                <Hero />
                <Separator className="my-4 opacity-50" lineStyle="dashed" />
                <Projects />
                <Separator className="my-4 opacity-50" lineStyle="dashed" />
                <Skills />
                <Separator className="my-4 opacity-50" lineStyle="dashed" />
                <Experience />
                <Separator className="my-4 opacity-50" lineStyle="dashed" />
                <Community />
                <ExploreMore />
                <Separator className="my-4 opacity-50" lineStyle="dashed" />
                <Contact />
            </main>
        </>
    );
}
