'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isTouch || reducedMotion) return;

        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        let frame = 0;
        function raf(time: number) {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        }

        frame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frame);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
