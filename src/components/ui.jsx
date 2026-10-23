// The design system's building blocks. Every section and page is assembled from these.
import { ViewTransition } from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import Scramble from './fx/Scramble';
import SpanHeader from './SpanHeader';
import { ArrowRightIcon, ArrowUpRightIcon, DownloadIcon } from './icons';

// Internal pages use next/link; files, anchors, mail and external URLs use a plain <a>.
export function SmartLink({ href, ...props }) {
    if (href.startsWith('/') && !/\.\w+$/.test(href)) return <Link href={href} {...props} />;
    const external = href.startsWith('http');
    return <a href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })} {...props} />;
}

// Shared name so a page's title can morph between the home-page list and the page header
const titleTransition = (href) => `title${href.replaceAll('/', '-')}`;

// Small monospace label. Plain strings "decrypt" when they scroll into view.
export function Eyebrow({ children, className = '' }) {
    return (
        <p className={`font-mono text-xs uppercase tracking-[0.08em] text-muted ${className}`}>
            {typeof children === 'string' ? <Scramble text={children} /> : children}
        </p>
    );
}

// A home-page section: dashed divider (from the original site), a trace-span header, then a big title.
export function Section({ id, index, name, meta, title, children }) {
    return (
        <section id={id} className="border-t border-dashed border-line-strong py-16 sm:py-20">
            <SpanHeader index={index} name={name ?? id} meta={meta} />
            <Reveal>
                <h2 className="mt-6 mb-8 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h2>
            </Reveal>
            {children}
        </section>
    );
}

// Header for the sub-pages. `href` links the title to the matching row on the home page for the page transition.
export function PageHeader({ href, title, intro }) {
    return (
        <header className="pt-14 pb-10 sm:pt-20">
            <Reveal onLoad>
                <Link href="/" className="text-sm text-muted transition-colors duration-150 hover:text-fg">
                    ← Home
                </Link>
            </Reveal>
            <Reveal onLoad index={1}>
                <ViewTransition name={titleTransition(href)}>
                    <h1 className="mt-6 text-5xl leading-none font-extrabold tracking-tight sm:text-7xl">{title}</h1>
                </ViewTransition>
            </Reveal>
            {intro && (
                <Reveal onLoad index={2}>
                    <p className="mt-5 max-w-xl text-lg text-muted">{intro}</p>
                </Reveal>
            )}
        </header>
    );
}

// Pill with a status dot; the dot and border light up amber on hover
export function Tag({ children }) {
    return (
        <span className="group/tag inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-0.5 font-mono text-xs text-muted transition-colors duration-150 hover:border-signal/50 hover:bg-signal/10 hover:text-fg">
            <span className="size-1.5 rounded-full bg-line-strong transition-colors duration-150 group-hover/tag:bg-signal" />
            {children}
        </span>
    );
}

export function ButtonLink({ href, variant = 'primary', className = '', children, ...props }) {
    const look =
        variant === 'primary'
            ? 'border-fg bg-fg text-bg'
            : variant === 'signal'
              ? 'border-signal/40 bg-signal/10 text-signal hover:border-signal'
              : 'border-line bg-card text-fg hover:border-line-strong';
    return (
        <SmartLink
            href={href}
            className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition duration-150 ease-smooth hover:-translate-y-0.5 ${look} ${className}`}
            {...props}
        >
            {children}
        </SmartLink>
    );
}

// A bordered surface. With `href` the whole card is a link with a cursor spotlight and a lift on hover.
export function Card({ href, className = '', children }) {
    const base = `relative block rounded-xl border border-line bg-card p-5 sm:p-6 ${className}`;
    if (!href) return <div className={base}>{children}</div>;
    return (
        <SmartLink
            href={href}
            data-spotlight
            className={`spotlight group ${base} transition duration-150 ease-smooth hover:-translate-y-1 hover:border-line-strong`}
        >
            {children}
        </SmartLink>
    );
}

// One line in a list: title and description on the left, a small label and an arrow on the right.
export function ListRow({ href, title, meta, download, children }) {
    const Icon = download ? DownloadIcon : href.startsWith('http') ? ArrowUpRightIcon : ArrowRightIcon;
    const isPage = href.startsWith('/') && !download;
    return (
        <SmartLink
            href={href}
            download={download}
            className="group flex items-start justify-between gap-6 border-b border-line py-5"
        >
            <div className="min-w-0">
                {isPage ? (
                    <ViewTransition name={titleTransition(href)}>
                        <p className="w-fit font-bold">{title}</p>
                    </ViewTransition>
                ) : (
                    <p className="font-bold">{title}</p>
                )}
                {children && <p className="mt-1 text-muted">{children}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-3 pt-1">
                {meta && <span className="hidden font-mono text-xs text-muted sm:inline">{meta}</span>}
                <Icon
                    size={16}
                    className="text-muted transition duration-150 ease-smooth group-hover:translate-x-1 group-hover:text-fg"
                />
            </div>
        </SmartLink>
    );
}
