'use client';

import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { books } from '@/lib/site';
import { Eyebrow } from '../ui';

const spring = { type: 'spring', stiffness: 260, damping: 30 };
const heights = [176, 166, 184, 170]; // uneven spines look like a real shelf
const lastName = (author) => author.split(' ').at(-1);

// A spine on the shelf. Shares its layoutId with the 3D book, so Motion morphs one into the other.
function Spine({ book, index, onPick }) {
    return (
        <motion.button
            layoutId={`book-${book.title}`}
            transition={spring}
            whileHover={{ y: -10 }}
            onClick={onPick}
            aria-label={`Pull out ${book.title} by ${book.author}`}
            style={{ background: book.color, height: heights[index % heights.length] }}
            className="flex w-10 flex-col items-center justify-between rounded-[3px] py-2 text-[#f6f1e7] shadow-[inset_-3px_0_5px_rgba(0,0,0,0.25),inset_2px_0_2px_rgba(255,255,255,0.08)]"
        >
            <span className="w-full border-b border-white/25 pb-1.5 text-center font-mono text-[8px] tracking-[0.08em] uppercase">
                {lastName(book.author).slice(0, 6)}
            </span>
            <span className="flex-1 truncate py-2 font-sans text-xs font-bold [writing-mode:vertical-rl]">{book.spine ?? book.title}</span>
            <span className="w-full border-t border-white/25 pt-1 text-center font-mono text-[10px]">{index + 1}</span>
        </motion.button>
    );
}

// The pulled-out book: a CSS 3D box (faces in globals.css) that Motion turns toward you on hover
function Book({ book }) {
    return (
        <motion.div layoutId={`book-${book.title}`} transition={spring} className="book3d" style={{ '--book': book.color }}>
            <motion.div
                className="book3d-inner"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 28 }}
                whileHover={{ rotateY: 6, y: -6 }}
                transition={spring}
            >
                <div className="book3d-front flex flex-col justify-between p-4 text-[#f6f1e7]">
                    <span className="text-[17px] leading-[1.1] font-extrabold">{book.title}</span>
                    <span className="border-t border-white/30 pt-2 font-mono text-[9px] tracking-[0.08em] uppercase">{book.author}</span>
                </div>
                <div className="book3d-spine" />
                <div className="book3d-pages" />
                <div className="book3d-top" />
            </motion.div>
        </motion.div>
    );
}

export default function Reading() {
    const [current, setCurrent] = useState(Math.max(0, books.findIndex((b) => b.current)));
    const book = books[current];

    return (
        <div className="grid items-end gap-10 sm:grid-cols-[auto_1fr]">
            <LayoutGroup>
                <ul aria-label="Bookshelf" className="flex h-[212px] items-end gap-1.5 border-b-2 border-line-strong px-1">
                    {books.map((b, i) => (
                        <li key={b.title} className="flex items-end">
                            {i === current ? <Book book={b} /> : <Spine book={b} index={i} onPick={() => setCurrent(i)} />}
                        </li>
                    ))}
                </ul>
            </LayoutGroup>

            <div aria-live="polite" className="min-h-40">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={book.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                    >
                        <Eyebrow>{book.current ? 'Reading now' : `From my shelf · ${current + 1} of ${books.length}`}</Eyebrow>
                        <h3 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">{book.title}</h3>
                        <p className="mt-2 text-muted">{book.author}</p>
                    </motion.div>
                </AnimatePresence>
                <p className="mt-6 font-mono text-xs text-muted">Tap a spine to pull it off the shelf.</p>
            </div>
        </div>
    );
}
