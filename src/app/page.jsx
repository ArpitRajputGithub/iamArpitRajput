import ThemeToggle from '@/components/ThemeToggle';
import NavigationDock from '@/components/NavigationDock';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
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
                <About />
                <Separator className="my-4 opacity-50" />
                <Projects />
                <Separator className="my-4 opacity-50" />
                <Skills />
                <Separator className="my-4 opacity-50" />
                <Experience />
                <Separator className="my-4 opacity-50" />
                <ExploreMore />
                <Separator className="my-4 opacity-50" />
                <Contact />
            </main>
        </>
    );
}
