import Link from 'next/link';
import { email, pages, socials } from '@/lib/site';
import Reveal from './Reveal';
import { Eyebrow } from './ui';
import { MailIcon, socialIcons } from './icons';

const linkLook = 'inline-flex items-center gap-2 text-muted transition-colors duration-150 hover:text-fg';

export default function Footer() {
    return (
        <footer className="border-t border-dashed border-line-strong text-sm">
            <div className="grid gap-10 py-14 sm:grid-cols-2">
                <div>
                    <Eyebrow>Explore</Eyebrow>
                    <ul className="mt-4 space-y-2">
                        {pages.map((page) => (
                            <li key={page.href}>
                                <Link href={page.href} className={linkLook}>
                                    {page.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <Eyebrow>Elsewhere</Eyebrow>
                    <ul className="mt-4 space-y-2">
                        {socials.map(({ label, href, icon }) => {
                            const Icon = socialIcons[icon];
                            return (
                                <li key={href}>
                                    <a href={href} target="_blank" rel="noopener noreferrer" className={linkLook}>
                                        <Icon size={14} /> {label}
                                    </a>
                                </li>
                            );
                        })}
                        <li>
                            <a href={`mailto:${email}`} className={linkLook}>
                                <MailIcon size={14} /> {email}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* The favourite quote, written as a doc comment */}
            <Reveal as="figure" className="border-t border-dashed border-line-strong py-12 font-mono text-sm leading-relaxed">
                <blockquote className="whitespace-pre-wrap text-muted">
                    <span className="block text-signal">/**</span>
                    <span className="block"> * “We’re here to put a dent in the universe.</span>
                    <span className="block"> *  Otherwise, why else even be here?”</span>
                    <span className="block">
                        {' '}* <span className="text-fg">@author</span> Steve Jobs
                    </span>
                    <span className="block text-signal"> */</span>
                </blockquote>
            </Reveal>

            {/* Editor-style status bar */}
            <div className="-mx-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-line bg-card px-6 py-2 font-mono text-[11px] text-muted">
                <span className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-ok" /> all systems operational
                    </span>
                    <span className="hidden sm:inline">⎇ main</span>
                </span>
                <span>© {new Date().getFullYear()} arpit rajput</span>
            </div>
        </footer>
    );
}
