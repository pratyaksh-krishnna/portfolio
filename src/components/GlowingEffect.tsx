'use client';

import { memo, useCallback, useEffect, useRef, type CSSProperties } from 'react';
import { animate } from 'framer-motion';

export type GlowPalette = [string, string, string, string];

interface GlowingEffectProps {
    blur?: number;
    inactiveZone?: number;
    proximity?: number;
    spread?: number;
    movementDuration?: number;
    borderWidth?: number;
    className?: string;
    colors?: GlowPalette;
}

const DEFAULT_COLORS: GlowPalette = ['#93c5fd', '#60a5fa', '#3b82f6', '#2563eb'];

function fade(hex: string) {
    return `${hex}00`;
}

function glowGradient([a, b, c, d]: GlowPalette) {
    return `radial-gradient(circle, ${a} 10%, ${fade(a)} 20%),
    radial-gradient(circle at 40% 40%, ${b} 5%, ${fade(b)} 15%),
    radial-gradient(circle at 60% 60%, ${c} 10%, ${fade(c)} 20%),
    radial-gradient(circle at 40% 60%, ${d} 10%, ${fade(d)} 20%),
    repeating-conic-gradient(
        from 236.84deg at 50% 50%,
        ${a} 0%,
        ${b} calc(25% / var(--repeating-conic-gradient-times)),
        ${c} calc(50% / var(--repeating-conic-gradient-times)),
        ${d} calc(75% / var(--repeating-conic-gradient-times)),
        ${a} calc(100% / var(--repeating-conic-gradient-times))
    )`;
}

// Must be placed inside a `relative` parent with a border radius; the glow traces that parent's edge.
const GlowingEffect = memo(function GlowingEffect({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    movementDuration = 2,
    borderWidth = 1,
    className = '',
    colors = DEFAULT_COLORS,
}: GlowingEffectProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const frameRef = useRef(0);
    const animationRef = useRef<ReturnType<typeof animate> | null>(null);

    const handleMove = useCallback(
        (e?: { x: number; y: number }) => {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = requestAnimationFrame(() => {
                const element = containerRef.current;
                if (!element) return;

                const { left, top, width, height } = element.getBoundingClientRect();
                const mouseX = e?.x ?? lastPosition.current.x;
                const mouseY = e?.y ?? lastPosition.current.y;
                if (e) lastPosition.current = { x: mouseX, y: mouseY };

                const center = [left + width * 0.5, top + height * 0.5];
                const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
                if (distanceFromCenter < 0.5 * Math.min(width, height) * inactiveZone) {
                    element.style.setProperty('--active', '0');
                    return;
                }

                const isActive =
                    mouseX > left - proximity &&
                    mouseX < left + width + proximity &&
                    mouseY > top - proximity &&
                    mouseY < top + height + proximity;
                element.style.setProperty('--active', isActive ? '1' : '0');
                if (!isActive) return;

                const currentAngle = parseFloat(element.style.getPropertyValue('--start')) || 0;
                const targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
                // Wrap into [-180, 180) so the glow always takes the short way round.
                const angleDiff = ((((targetAngle - currentAngle) % 360) + 540) % 360) - 180;

                animationRef.current?.stop();
                animationRef.current = animate(currentAngle, currentAngle + angleDiff, {
                    duration: movementDuration,
                    ease: [0.16, 1, 0.3, 1],
                    onUpdate: (value) => element.style.setProperty('--start', String(value)),
                });
            });
        },
        [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
        const handleScroll = () => handleMove();
        const handlePointerMove = (e: PointerEvent) => handleMove(e);

        window.addEventListener('scroll', handleScroll, { passive: true });
        document.body.addEventListener('pointermove', handlePointerMove, { passive: true });
        return () => {
            cancelAnimationFrame(frameRef.current);
            animationRef.current?.stop();
            window.removeEventListener('scroll', handleScroll);
            document.body.removeEventListener('pointermove', handlePointerMove);
        };
    }, [handleMove]);

    return (
        <div
            ref={containerRef}
            style={
                {
                    '--blur': `${blur}px`,
                    '--spread': spread,
                    '--start': '0',
                    '--active': '0',
                    '--glowingeffect-border-width': `${borderWidth}px`,
                    '--repeating-conic-gradient-times': '5',
                    '--gradient': glowGradient(colors),
                } as CSSProperties
            }
            className={`pointer-events-none absolute inset-0 rounded-[inherit] ${blur > 0 ? 'blur-[var(--blur)]' : ''} ${className}`}
        >
            <div
                className={[
                    'rounded-[inherit]',
                    "after:absolute after:content-[''] after:rounded-[inherit] after:inset-[calc(-1*var(--glowingeffect-border-width))]",
                    'after:[border:var(--glowingeffect-border-width)_solid_transparent]',
                    'after:[background:var(--gradient)] after:[background-attachment:fixed]',
                    'after:opacity-[var(--active)] after:transition-opacity after:duration-300',
                    'after:[mask-clip:padding-box,border-box]',
                    'after:[mask-composite:intersect]',
                    'after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]',
                ].join(' ')}
            />
        </div>
    );
});

export default GlowingEffect;
