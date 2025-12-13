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
                <Projects />
                <Separator className="my-4 opacity-50" />
                <Skills />
                <Separator className="my-4 opacity-50" />
                <Experience />
                <Separator className="my-4 opacity-50" />
                <Community />
                <ExploreMore />
                <Separator className="my-4 opacity-50" />
                <Contact />
            </main>
        </>
    );
}
