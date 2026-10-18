'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const NAMES = ['dns.lookup', 'tcp.connect', 'http.request', 'http.response', 'dom.parse', 'react.hydrate'];
const fmt = (ms) => (ms < 1 ? '<1 ms' : `${Math.round(ms)} ms`);

// A real trace of *this visitor's* page load, drawn like a tracing tool's waterfall.
// Numbers come from the browser's Navigation Timing API; nothing is sent anywhere.
export default function PageTrace() {
    const [trace, setTrace] = useState(null);

    useEffect(() => {
        const hydratedAt = performance.now(); // this effect runs right after React hydrates the page
        const build = () => {
            const nav = performance.getEntriesByType('navigation')[0];
            if (!nav) return;
            // Arriving here by in-app navigation: the page loaded long ago, so end the trace at that load
            const hydrateEnd = nav.loadEventEnd > 0 ? Math.min(hydratedAt, nav.loadEventEnd) : hydratedAt;
            const ends = [
                [nav.domainLookupStart, nav.domainLookupEnd],
                [nav.connectStart, nav.connectEnd],
                [nav.requestStart, nav.responseStart],
                [nav.responseStart, nav.responseEnd],
                [nav.responseEnd, nav.domInteractive],
                [nav.domInteractive, Math.max(nav.domInteractive, hydrateEnd)],
            ];
            const total = Math.max(...ends.map(([, end]) => end), 1);
            setTrace({
                path: new URL(nav.name).pathname,
                status: nav.responseStatus || 200,
                total,
                spans: ends.map(([start, end], i) => ({ name: NAMES[i], start, end })),
            });
        };
        if (document.readyState === 'complete') build();
        else addEventListener('load', build, { once: true });
    }, []);

    return (
        <figure className="overflow-hidden rounded-xl border border-line bg-card font-mono text-xs">
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
                <span>
                    <span className="text-signal">GET</span> {trace?.path ?? '/'}
                </span>
                <span className="text-muted">
                    {trace ? (
                        <>
                            <span className="text-ok">{trace.status}</span> · {fmt(trace.total)}
                        </>
                    ) : (
                        'measuring…'
                    )}
                </span>
            </div>

            <ol className="space-y-2 px-4 py-4">
                {NAMES.map((name, i) => {
                    const span = trace?.spans[i];
                    const left = span ? (span.start / trace.total) * 100 : 0;
                    const width = span ? Math.max(((span.end - span.start) / trace.total) * 100, 0.8) : 0;
                    return (
                        <li key={name} className="grid grid-cols-[7.5rem_1fr_4rem] items-center gap-3 sm:grid-cols-[8.5rem_1fr_4.5rem]">
                            <span className="truncate text-muted">{name}</span>
                            <span className="relative h-2 rounded-sm bg-line/60">
                                {span && (
                                    <motion.span
                                        className={`absolute inset-y-0 origin-left rounded-sm ${name === 'react.hydrate' ? 'bg-fg' : 'bg-signal'}`}
                                        style={{ left: `${left}%`, width: `${width}%` }}
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.5, delay: 0.15 + (left / 100) * 0.9 }}
                                    />
                                )}
                            </span>
                            <span className="text-right text-muted tabular-nums">{span ? fmt(span.end - span.start) : '…'}</span>
                        </li>
                    );
                })}
            </ol>

            <figcaption className="border-t border-dashed border-line px-4 py-2.5 text-[11px] text-muted">
                This page, as your browser just loaded it. Measured on your device, sent nowhere.
            </figcaption>
        </figure>
    );
}
