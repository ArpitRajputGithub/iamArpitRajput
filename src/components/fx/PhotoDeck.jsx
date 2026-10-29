'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react';

const CARD_W = 210;
const TILT = [-4, 3, -2, 5, -3, 2]; // each print sits at its own slight angle
const FLICK_DISTANCE = 90; // px dragged, or…
const FLICK_SPEED = 500; // …px/s released, to send the top print to the back
const spring = { type: 'spring', stiffness: 260, damping: 26 };

// Where a print sits: stacked in a pile (by depth), or fanned out like a hand of cards
function placement({ photo, depth, count, spread, width }) {
    if (!spread) {
        return { x: depth * 7, y: depth * -5, rotate: TILT[photo % TILT.length], scale: 1 - depth * 0.035, zIndex: count - depth };
    }
    const reach = Math.max(0, Math.min(width - CARD_W - 60, 500)) / 2; // half the fan's width, kept inside the column
    const t = count === 1 ? 0 : photo / (count - 1) - 0.5; // -0.5 … 0.5, in the photos' own order
    return { x: t * 2 * reach, y: Math.abs(t) * 30, rotate: t * 22, scale: 0.9, zIndex: photo + 1 };
}

function Print({ src, photo, depth, count, spread, width, onFlick, onPick }) {
    const isTop = depth === 0 && !spread;
    const dragX = useMotionValue(0);
    const dragRotate = useTransform(dragX, [-220, 220], [-16, 16]); // the print tilts the way you drag it

    return (
        <motion.li
            className="absolute top-0 left-1/2 -ml-[105px] list-none"
            initial={false}
            animate={placement({ photo, depth, count, spread, width })}
            transition={spring}
        >
            <motion.button
                type="button"
                aria-label={spread ? `Bring photo ${photo + 1} to the top` : `Photo ${photo + 1} of ${count}`}
                tabIndex={spread || isTop ? 0 : -1}
                onClick={spread ? onPick : undefined}
                drag={isTop ? 'x' : false} // sideways only, so vertical swipes still scroll the page on phones
                dragSnapToOrigin
                dragElastic={0.7}
                onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > FLICK_DISTANCE || Math.abs(info.velocity.x) > FLICK_SPEED) onFlick();
                }}
                style={{ x: dragX, rotate: dragRotate }}
                whileHover={spread ? { y: -12, scale: 1.04 } : undefined}
                whileDrag={{ scale: 1.04, cursor: 'grabbing' }}
                className={`block w-[210px] rounded-[3px] bg-[#f4f0e8] p-2.5 pb-0 text-left shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] ${
                    isTop ? 'cursor-grab' : spread ? 'cursor-pointer' : 'pointer-events-none'
                }`}
            >
                {/* "Developing": prints under the top one are dim and grey; the top one resolves to full colour */}
                <motion.img
                    src={src}
                    alt={`Codegeeks community, photo ${photo + 1}`}
                    draggable={false}
                    width={190}
                    height={180}
                    loading="lazy"
                    className="h-[180px] w-full object-cover"
                    initial={false}
                    animate={{
                        filter: isTop || spread ? 'grayscale(0) brightness(1) blur(0px)' : 'grayscale(0.9) brightness(0.75) blur(1px)',
                    }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                />
                <span className="block py-2.5 text-right font-mono text-[10px] text-[#55514a]">
                    {photo + 1}/{count}
                </span>
            </motion.button>
        </motion.li>
    );
}

// A pile of printed photos: drag or flick the top one to the back, or spread them all out
export default function PhotoDeck({ photos }) {
    const [order, setOrder] = useState(() => photos.map((_, i) => i)); // order[0] is the top print
    const [spread, setSpread] = useState(false);
    const [paused, setPaused] = useState(false);
    const [width, setWidth] = useState(600);
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.5 });
    const reduceMotion = useReducedMotion();

    const next = () => setOrder((o) => [...o.slice(1), o[0]]);
    const prev = () => setOrder((o) => [o.at(-1), ...o.slice(0, -1)]);
    const pick = (photo) => {
        setOrder((o) => [photo, ...o.filter((p) => p !== photo)]);
        setSpread(false);
    };

    // The fan's width follows the space available
    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Gently flip to the next print while the deck is on screen and nobody is interacting with it
    useEffect(() => {
        if (reduceMotion || paused || spread || !inView) return;
        const id = setInterval(next, 4000);
        return () => clearInterval(id);
    }, [reduceMotion, paused, spread, inView]);

    const control =
        'rounded-full border border-line bg-card px-3 py-1.5 font-mono text-xs text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg';

    return (
        <div
            ref={ref}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <ul aria-label="Codegeeks photos" className="relative mx-auto h-[290px] max-w-full">
                {order.map((photo, depth) => (
                    <Print
                        key={photo}
                        src={photos[photo]}
                        photo={photo}
                        depth={depth}
                        count={photos.length}
                        spread={spread}
                        width={width}
                        onFlick={next}
                        onPick={() => pick(photo)}
                    />
                ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button type="button" onClick={prev} disabled={spread} className={`${control} disabled:opacity-40`} aria-label="Previous photo">
                    ←
                </button>
                <button type="button" onClick={() => setSpread((s) => !s)} className={control} aria-pressed={spread}>
                    {spread ? 'stack them' : 'spread them out'}
                </button>
                <button type="button" onClick={next} disabled={spread} className={`${control} disabled:opacity-40`} aria-label="Next photo">
                    →
                </button>
            </div>
            <p className="mt-3 text-center font-mono text-[11px] text-muted">
                {spread ? 'pick one to pull it to the top' : 'drag or flick the top print'}
            </p>
            <p className="sr-only" aria-live="polite">
                Photo {order[0] + 1} of {photos.length} on top
            </p>
        </div>
    );
}
