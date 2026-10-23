'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { email, pages, socials } from '@/lib/site';
import { toggleTheme } from './ThemeToggle';
import { SearchIcon } from './icons';

const sections = ['Projects', 'Skills', 'Experience', 'Reading', 'Community', 'Contact'];

// ⌘K / Ctrl+K anywhere (or the search button in the nav) opens a quick-jump menu.
// Built on the native <dialog>: focus trapping, Esc to close and the backdrop come from the browser.
export default function CommandPalette() {
    const dialogRef = useRef(null);
    const listRef = useRef(null);
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const [toast, setToast] = useState('');

    const goToSection = (id) => {
        if (location.pathname === '/') document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        else router.push(`/#${id}`);
    };
    const notify = (text) => {
        setToast(text);
        setTimeout(() => setToast(''), 1800);
    };

    const commands = [
        ...sections.map((s) => ({ group: 'Jump to', label: s, hint: '#', run: () => goToSection(s.toLowerCase()) })),
        ...pages.map((p) => ({ group: 'Pages', label: p.title, hint: p.badge, run: () => router.push(p.href) })),
        {
            group: 'Actions',
            label: 'Copy email address',
            hint: email,
            run: () => navigator.clipboard.writeText(email).then(() => notify('Email copied')),
        },
        { group: 'Actions', label: 'Toggle dark mode', hint: 'theme', run: () => toggleTheme() },
        {
            group: 'Actions',
            label: 'Download résumé',
            hint: 'PDF',
            run: () => Object.assign(document.createElement('a'), { href: '/downloads/resume.pdf', download: '' }).click(),
        },
        ...socials.map((s) => ({ group: 'Elsewhere', label: s.label, hint: '↗', run: () => window.open(s.href, '_blank', 'noopener') })),
    ];
    const q = query.trim().toLowerCase();
    const results = commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(q));

    const open = () => {
        setQuery('');
        setActive(0);
        dialogRef.current?.showModal();
    };
    const close = () => dialogRef.current?.close();
    const run = (command) => {
        close();
        command?.run();
    };

    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                dialogRef.current?.open ? close() : open();
            }
        };
        window.addEventListener('keydown', onKey);
        window.addEventListener('open-command-palette', open);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('open-command-palette', open);
        };
    }, []);

    // Keep the highlighted row visible while arrowing through a long list
    useEffect(() => {
        listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    }, [active]);

    const onKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const step = e.key === 'ArrowDown' ? 1 : -1;
            setActive((i) => (i + step + results.length) % results.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            run(results[active]);
        }
    };

    let lastGroup = null;
    return (
        <>
            <dialog
                ref={dialogRef}
                aria-label="Command menu"
                className="palette"
                onClick={(e) => e.target === dialogRef.current && close()} // click on the backdrop
            >
                <div className="flex items-center gap-3 border-b border-line px-4">
                    <SearchIcon size={16} className="shrink-0 text-muted" />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setActive(0);
                        }}
                        onKeyDown={onKeyDown}
                        placeholder="Jump to a section, page or action…"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls="palette-results"
                        aria-activedescendant={results[active] ? `palette-${active}` : undefined}
                        className="h-13 w-full bg-transparent text-base outline-none placeholder:text-muted focus-visible:outline-none"
                    />
                    <kbd className="kbd">esc</kbd>
                </div>

                <ul ref={listRef} id="palette-results" role="listbox" className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
                    {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results for “{query}”</li>}
                    {results.map((c, i) => {
                        const heading = c.group !== lastGroup ? (lastGroup = c.group) : null;
                        return (
                            <li key={`${c.group}-${c.label}`} role="none">
                                {heading && (
                                    <p className="px-3 pt-3 pb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{heading}</p>
                                )}
                                <button
                                    id={`palette-${i}`}
                                    role="option"
                                    aria-selected={i === active}
                                    onMouseMove={() => setActive(i)}
                                    onClick={() => run(c)}
                                    className="flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm aria-selected:bg-surface"
                                >
                                    <span>{c.label}</span>
                                    <span className="truncate font-mono text-xs text-muted">{c.hint}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex gap-4 border-t border-line px-4 py-2.5 font-mono text-[11px] text-muted">
                    <span>
                        <kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> move
                    </span>
                    <span>
                        <kbd className="kbd">↵</kbd> open
                    </span>
                </div>
            </dialog>

            {/* Small confirmation, e.g. after copying the email */}
            <p role="status" className={`toast ${toast ? 'toast-show' : ''}`}>
                {toast}
            </p>
        </>
    );
}
