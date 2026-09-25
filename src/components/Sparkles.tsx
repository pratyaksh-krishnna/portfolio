'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';

interface SparklesProps {
    className?: string;
    particleColor?: string;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    particleDensity?: number;
}

let engineReady: Promise<void> | null = null;

function loadEngine() {
    engineReady ??= initParticlesEngine((engine) => loadSlim(engine));
    return engineReady;
}

export default function Sparkles({
    className = '',
    particleColor = '#ffffff',
    minSize = 1,
    maxSize = 3,
    speed = 4,
    particleDensity = 120,
}: SparklesProps) {
    const id = useId();
    const controls = useAnimation();
    const reduceMotion = useReducedMotion();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cancelled = false;
        loadEngine().then(() => !cancelled && setReady(true));
        return () => {
            cancelled = true;
        };
    }, []);

    const options = useMemo<ISourceOptions>(
        () => ({
            background: { color: { value: 'transparent' } },
            fullScreen: { enable: false },
            fpsLimit: 60,
            detectRetina: true,
            particles: {
                color: { value: particleColor },
                move: { enable: true, direction: 'none', outModes: { default: 'out' }, speed: { min: 0.1, max: 1 } },
                number: { density: { enable: true, width: 400, height: 400 }, value: particleDensity },
                opacity: {
                    value: { min: 0.1, max: 1 },
                    animation: { enable: true, speed, sync: false, startValue: 'random' },
                },
                shape: { type: 'circle' },
                size: { value: { min: minSize, max: maxSize } },
            },
        }),
        [particleColor, particleDensity, speed, minSize, maxSize]
    );

    if (reduceMotion) return null;

    return (
        <motion.div animate={controls} className={`opacity-0 ${className}`} aria-hidden>
            {ready && (
                <Particles
                    id={id}
                    className="h-full w-full"
                    options={options}
                    particlesLoaded={async (container) => {
                        if (container) controls.start({ opacity: 1, transition: { duration: 1 } });
                    }}
                />
            )}
        </motion.div>
    );
}
