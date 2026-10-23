'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { email } from '@/lib/site';
import Reveal from '../Reveal';
import SpanHeader from '../SpanHeader';
import { ButtonLink } from '../ui';
import { DownloadIcon } from '../icons';

const field = 'w-full bg-transparent text-fg placeholder:text-muted/60 outline-none focus-visible:outline-none';

// Contact as an API request composer. "Send" opens the visitor's mail app with the message filled in,
// so it works without a server and nothing is stored anywhere.
export default function Contact() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const send = (e) => {
        e.preventDefault();
        const subject = `Hello from ${name.trim() || 'your website'}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        setSent(true);
    };

    return (
        <section id="contact" className="border-t border-dashed border-line-strong py-16 sm:py-20">
            <SpanHeader index={7} name="contact" meta="mailto" />
            <Reveal>
                <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">Get In Touch</h2>
                <p className="mt-4 max-w-lg text-lg text-muted">
                    I'm always open to collaborations and good conversations. Whether you have a project in mind, a
                    question, or just want to say hi, feel free to reach out!
                </p>
            </Reveal>

            <Reveal index={1}>
                <form onSubmit={send} className="mt-8 overflow-hidden rounded-xl border border-line bg-card font-mono text-sm">
                    <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                        <span className="rounded-md bg-signal/15 px-2 py-0.5 text-xs font-medium text-signal">POST</span>
                        <span className="truncate text-muted">/arpit/hello</span>
                        <button
                            type="submit"
                            disabled={!message.trim()}
                            className="ml-auto rounded-full bg-fg px-4 py-1.5 font-sans text-xs font-medium text-bg transition duration-150 ease-smooth hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                        >
                            Send ↗
                        </button>
                    </div>

                    <div className="space-y-1 p-4 text-muted">
                        <p>{'{'}</p>
                        <label className="flex items-baseline gap-2 pl-4">
                            <span className="shrink-0">"name":</span>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='"your name"' aria-label="Your name" className={field} />
                        </label>
                        <label className="flex items-start gap-2 pl-4">
                            <span className="shrink-0">"message":</span>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder='"say hi, ask anything…"'
                                aria-label="Message"
                                rows={3}
                                required
                                className={`${field} resize-none`}
                            />
                        </label>
                        <p>{'}'}</p>
                    </div>

                    <AnimatePresence>
                        {sent && (
                            <motion.p
                                role="status"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="border-t border-dashed border-line px-4 py-3 text-ok"
                            >
                                200 OK <span className="text-muted">· opening your mail app…</span>
                            </motion.p>
                        )}
                    </AnimatePresence>
                </form>
            </Reveal>

            <Reveal index={2} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
                <span>
                    Prefer plain email?{' '}
                    <a href={`mailto:${email}`} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-signal">
                        {email}
                    </a>
                </span>
                <ButtonLink href="/downloads/resume.pdf" variant="secondary" download>
                    <DownloadIcon size={15} /> Download Resume
                </ButtonLink>
            </Reveal>
        </section>
    );
}
