'use client';

import { motion } from 'framer-motion';
import { memo, useEffect, useState, type CSSProperties } from 'react';

// Split-flap name, adapted from Aceternity's text-flipping-board.
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const START_DELAY_MS = 500;
const CHAR_DELAY_MS = 45;
const STEP_MS = 50;
const FLIP_S = 0.28;

const BASE_COLORS = 'bg-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:text-white';
const FLAP_COLORS = 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-white';
const ACCENT_COLORS = [
    'bg-white text-neutral-900',
    'bg-neutral-300 text-neutral-900',
    'bg-neutral-500 text-white',
    'bg-black text-white',
];

const HALF = 'absolute inset-x-0 h-[calc(50%-0.5px)] overflow-hidden';
const GLYPH = 'absolute inset-x-0 flex h-[200%] items-center justify-center text-[0.78em] font-bold select-none';

interface FlapState {
    current: string;
    previous: string;
    flipId: number;
    accent: string | null;
    previousAccent: string | null;
}

const Flap = memo(function Flap({ target, delay }: { target: string; delay: number }) {
    const [state, setState] = useState<FlapState>({
        current: ' ',
        previous: ' ',
        flipId: 0,
        accent: null,
        previousAccent: null,
    });

    useEffect(() => {
        const steps = 12 + Math.floor(Math.random() * 10);
        let step = 0;
        let timer: ReturnType<typeof setTimeout>;

        const run = () => {
            step++;
            const isLast = step === steps;
            const char = isLast ? target : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            const accent = !isLast && Math.random() < 0.15
                ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
                : null;
            setState((s) => ({
                current: char,
                previous: s.current,
                flipId: s.flipId + 1,
                accent,
                previousAccent: s.accent,
            }));
            if (!isLast) timer = setTimeout(run, STEP_MS);
        };

        timer = setTimeout(run, delay);
        return () => clearTimeout(timer);
    }, [target, delay]);

    const { current, previous, flipId, accent, previousAccent } = state;
    const colors = accent ?? BASE_COLORS;

    return (
        <span className="relative inline-block h-[1.25em] w-[0.72em] rounded-[0.1em] perspective-dramatic transform-3d">
            <span className={`${HALF} top-0 rounded-t-[0.1em] ${colors}`}>
                <span className={`${GLYPH} top-0`}>{current}</span>
            </span>
            <span className={`${HALF} bottom-0 rounded-b-[0.1em] ${colors}`}>
                <span className={`${GLYPH} bottom-0`}>{current}</span>
            </span>

            {flipId > 0 && (
                <motion.span
                    key={`t${flipId}`}
                    className={`${HALF} top-0 z-10 origin-bottom rounded-t-[0.1em] backface-hidden ${previousAccent ?? FLAP_COLORS}`}
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: -100 }}
                    transition={{ duration: FLIP_S, ease: [0.55, 0.055, 0.675, 0.19] }}
                >
                    <span className={`${GLYPH} top-0`}>{previous}</span>
                </motion.span>
            )}
            {flipId > 0 && (
                <motion.span
                    key={`b${flipId}`}
                    className={`${HALF} bottom-0 z-10 origin-top rounded-b-[0.1em] backface-hidden ${colors}`}
                    initial={{ rotateX: 90 }}
                    animate={{ rotateX: 0 }}
                    transition={{ duration: FLIP_S * 0.85, delay: FLIP_S * 0.5, ease: [0.33, 1.55, 0.64, 1] }}
                >
                    <span className={`${GLYPH} bottom-0`}>{current}</span>
                </motion.span>
            )}

            <span className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-1/2 bg-neutral-400/60 dark:bg-black/70" />
        </span>
    );
});

export default function FlipName({ name, className, style }: { name: string; className?: string; style?: CSSProperties }) {
    const words = name.toUpperCase().split(' ');
    let index = 0;

    return (
        <h1 className={className} style={style}>
            <span className="sr-only">{name}</span>
            <span aria-hidden className="inline-flex flex-wrap gap-x-[0.3em] gap-y-[0.15em] sm:flex-nowrap">
                {words.map((word, w) => (
                    <span key={w} className="inline-flex gap-[0.06em]">
                        {[...word].map((char, c) => (
                            <Flap key={c} target={char} delay={START_DELAY_MS + index++ * CHAR_DELAY_MS} />
                        ))}
                    </span>
                ))}
            </span>
        </h1>
    );
}
