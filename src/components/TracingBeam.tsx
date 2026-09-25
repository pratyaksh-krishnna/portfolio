'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

type Track = { x: number; start: number; end: number; height: number };

const SPRING = { stiffness: 500, damping: 90 };

// Draws a scroll-linked beam through every descendant marked with `data-beam-dot`,
// from the first dot's center to the last one's.
export default function TracingBeam({ children, className = '' }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const gradientId = useId();
    const [track, setTrack] = useState<Track>({ x: 0, start: 0, end: 0, height: 0 });

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const measure = () => {
            const dots = container.querySelectorAll<HTMLElement>('[data-beam-dot]');
            if (dots.length === 0) return;
            const box = container.getBoundingClientRect();
            const center = (el: HTMLElement) => {
                const rect = el.getBoundingClientRect();
                return { x: rect.left + rect.width / 2 - box.left, y: rect.top + rect.height / 2 - box.top };
            };
            const first = center(dots[0]);
            const last = center(dots[dots.length - 1]);
            setTrack({ x: first.x, start: first.y, end: last.y, height: box.height });
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    const tail = Math.min(200, (track.end - track.start) * 0.4);
    const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [track.start, track.end]), SPRING);
    const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [track.start, track.end - tail]), SPRING);

    const path = `M ${track.x} ${track.start} V ${track.end}`;

    return (
        <div ref={ref} className={`relative ${className}`}>
            <svg
                className="pointer-events-none absolute inset-0 overflow-visible"
                width="100%"
                height={track.height}
                aria-hidden
            >
                <path d={path} fill="none" strokeWidth="1" className="stroke-theme-divider" />
                <path d={path} fill="none" strokeWidth="1.5" stroke={`url(#${gradientId})`} className="motion-reduce:hidden" />
                <defs>
                    <motion.linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
                        <stop stopColor="#93C5FD" stopOpacity="0" />
                        <stop stopColor="#93C5FD" />
                        <stop offset="0.325" stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#1D4ED8" stopOpacity="0" />
                    </motion.linearGradient>
                </defs>
            </svg>
            {children}
        </div>
    );
}
