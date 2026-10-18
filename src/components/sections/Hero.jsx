import { email, socials } from '@/lib/site';
import Reveal from '../Reveal';
import { ButtonLink } from '../ui';
import ScanPhoto from '../fx/ScanPhoto';
import PageTrace from '../fx/PageTrace';
import Scramble from '../fx/Scramble';
import { ArrowRightIcon, DownloadIcon, MailIcon, socialIcons } from '../icons';

const iconLink =
    'grid size-10 place-items-center rounded-full border border-line text-muted transition duration-150 ease-smooth hover:-translate-y-0.5 hover:border-line-strong hover:text-fg';

export default function Hero() {
    return (
        <section id="home" className="pt-14 pb-16 sm:pt-20 sm:pb-20">
            <Reveal onLoad className="flex items-center gap-5">
                <ScanPhoto src="/me.jpg" alt="Arpit Rajput" size={84} />
                <div className="font-mono text-xs">
                    <p className="text-fg">
                        <Scramble text="software engineer @vaatun" />
                    </p>
                    <p className="mt-1.5 flex items-center gap-2 text-muted">
                        <span className="size-1.5 rounded-full bg-ok" /> building backends · india
                    </p>
                </div>
            </Reveal>

            <Reveal onLoad index={1}>
                <h1 className="mt-10 text-6xl leading-[0.92] font-extrabold tracking-tight sm:text-8xl">
                    <span className="text-muted">Hi, I'm</span>
                    <br />
                    Arpit Rajput
                </h1>
            </Reveal>

            <Reveal onLoad index={2}>
                <p className="mt-7 max-w-xl text-lg text-muted">
                    I'm a passionate developer from India. I love building things using modern frameworks and
                    technologies. Currently working on exciting projects and always open to collaborations and good conversations.
                </p>
            </Reveal>

            <Reveal onLoad index={3} className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href="#contact">
                    Get in Touch
                    <ArrowRightIcon size={15} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink href="/downloads/resume.pdf" variant="secondary" download>
                    Resume <DownloadIcon size={15} />
                </ButtonLink>
                <ul className="flex gap-2 sm:ml-2">
                    {socials.map(({ label, href, icon }) => {
                        const Icon = socialIcons[icon];
                        return (
                            <li key={href}>
                                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={iconLink}>
                                    <Icon size={16} />
                                </a>
                            </li>
                        );
                    })}
                    <li>
                        <a href={`mailto:${email}`} aria-label="Email" className={iconLink}>
                            <MailIcon size={16} />
                        </a>
                    </li>
                </ul>
            </Reveal>

            <Reveal onLoad index={4} className="mt-12">
                <PageTrace />
            </Reveal>
        </section>
    );
}
