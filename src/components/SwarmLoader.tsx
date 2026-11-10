'use client';

import { useEffect, useRef, useState } from 'react';

// Loading screen: a swarm of multiplayer-style cursors builds a small title card (drags out a box,
// types the name, drags in a guide, snaps a label onto it, draws a rule, fills a progress bar),
// then flies off and the overlay fades to reveal the page.
// Everything is derived from one clock `t` (ms), so each piece stays attached to the cursor making it.

type Key = readonly [t: number, x: number, y: number];
type Point = { x: number; y: number };
type CursorId = 'layout' | 'type' | 'guide' | 'move' | 'pen' | 'bar';
type CursorDef = { id: CursorId; label: string; color: string; ink: string; keys: Key[] };
type Frame = { t: number; loaded: boolean; W: number; H: number; scale: number };

const NAME = 'Pratyaksh Krishnna';
const SUBTITLE = 'AI Engineer';
const NAME_SIZE = 26;
const CHAR_W = NAME_SIZE * 0.6; // Geist Mono advance width
const STAGE_W = 400; // widest stage element plus margin; narrower screens scale the stage down
const MONO = "var(--font-geist-mono), ui-monospace, monospace";
const SANS = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

// Stage layout, in px from the screen centre.
const BOX = { x: -175, y: -82, w: 350, h: 52 };
const TEXT = { x: -160, y: BOX.y + (BOX.h - NAME_SIZE * 1.2) / 2 };
const TYPE_Y = BOX.y + BOX.h / 2 + 8;
const GUIDE_Y = -2;
const SUB = { x: TEXT.x, y: GUIDE_Y + 6 };
const GRAB = { x: 26, y: 8 }; // where the move cursor holds the subtitle
const RULE_Y = 38;
const BAR = { x: -175, y: 56, w: 350, h: 6 };

// Timeline, ms.
const T = {
    gather: 650,
    boxStart: 700,
    boxEnd: 1250,
    guideStart: 800,
    guideEnd: 1400,
    typeStart: 1300,
    typeEnd: 2100,
    moveStart: 1450,
    moveEnd: 2000,
    penStart: 2100,
    penEnd: 2500,
    barStart: 2100,
    barEnd: 2450,
    fillEnd: 3000,
    exit: 3100,
    fade: 3250,
    done: 3750,
};
// If the page still hasn't fired `load` by the end of the fill, wait at most this long for it.
const MAX_WAIT_FOR_LOAD_MS = 4000;

const COLORS: Record<CursorId, string> = {
    layout: '#F24E1E',
    type: '#A259FF',
    guide: '#E5398F',
    move: '#0ACF83',
    pen: '#1ABCFE',
    bar: '#FFC700',
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const easeIn = (p: number) => p * p * p;

function along(keys: Key[], t: number): Point {
    if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2] };
    for (let i = 1; i < keys.length; i++) {
        const [t1, x1, y1] = keys[i];
        if (t <= t1) {
            const [t0, x0, y0] = keys[i - 1];
            const p = easeInOut((t - t0) / (t1 - t0 || 1));
            return { x: x0 + (x1 - x0) * p, y: y0 + (y1 - y0) * p };
        }
    }
    const last = keys[keys.length - 1];
    return { x: last[1], y: last[2] };
}

function rectFrom(a: Point, b: Point) {
    return { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), w: Math.abs(b.x - a.x), h: Math.abs(b.y - a.y) };
}

// W and H are half the viewport in stage units, plus a margin, so the first keyframe starts off screen.
function makeCursors(W: number, H: number): CursorDef[] {
    // Keep resting spots on screen (narrow phones), leaving room for the name tag on the right.
    // The first key stays off screen so cursors still fly in from the edges.
    const minX = -(W - 40 - 20);
    const maxX = Math.max(W - 40 - 70, BOX.x + BOX.w);
    const onScreen = (keys: Key[]): Key[] =>
        keys.map((k, i) => (i === 0 ? k : [k[0], Math.min(maxX, Math.max(minX, k[1])), k[2]] as const));
    return defineCursors(W, H).map((c) => ({ ...c, keys: onScreen(c.keys) }));
}

function defineCursors(W: number, H: number): CursorDef[] {
    return [
        {
            id: 'layout', label: 'layout', color: COLORS.layout, ink: '#fff',
            keys: [
                [0, -W, -H * 0.5],
                [T.gather, BOX.x, BOX.y],
                [T.boxStart, BOX.x, BOX.y],
                [T.boxEnd, BOX.x + BOX.w, BOX.y + BOX.h],
                [1400, BOX.x + BOX.w, BOX.y + BOX.h],
                [1900, 238, 110],
                [2300, BAR.x + 2, BAR.y + BAR.h],
                [T.barEnd, BAR.x + 2, BAR.y + BAR.h],
            ],
        },
        {
            id: 'type', label: 'type', color: COLORS.type, ink: '#fff',
            keys: [
                [0, -W * 0.3, -H],
                [T.gather, -40, BOX.y - 50],
                [T.typeStart, TEXT.x + 3, TYPE_Y],
                [T.typeEnd, TEXT.x + NAME.length * CHAR_W + 3, TYPE_Y],
                [2550, 60, BOX.y - 56],
            ],
        },
        {
            id: 'guide', label: 'guides', color: COLORS.guide, ink: '#fff',
            keys: [
                [0, W, -H * 0.4],
                [T.gather, 250, -H * 0.55],
                [T.guideStart, 255, -H + 50],
                [T.guideEnd, 255, GUIDE_Y],
                [1550, 255, GUIDE_Y],
                [2050, 268, -56],
                [2700, 246, -96],
            ],
        },
        {
            id: 'move', label: 'move', color: COLORS.move, ink: '#fff',
            keys: [
                [0, -W, H * 0.6],
                [T.gather, -70, 130],
                [T.moveStart, -70, 130],
                [T.moveEnd - 70, SUB.x + GRAB.x + 4, SUB.y + GRAB.y + 4],
                [T.moveEnd, SUB.x + GRAB.x, SUB.y + GRAB.y],
                [2500, -238, 104],
            ],
        },
        {
            id: 'pen', label: 'pen', color: COLORS.pen, ink: '#fff',
            keys: [
                [0, W, H * 0.5],
                [T.gather, 245, 80],
                [1700, -60, 92],
                [T.penStart - 40, BOX.x, RULE_Y],
                [T.penStart, BOX.x, RULE_Y],
                [T.penEnd, BOX.x + BOX.w, RULE_Y],
                [2620, BOX.x + BOX.w, RULE_Y],
                [3000, 248, 14],
            ],
        },
        {
            id: 'bar', label: 'fill', color: COLORS.bar, ink: '#1a1a1a',
            keys: [
                [0, W * 0.3, H],
                [T.gather, 120, 120],
                [T.barStart - 60, BAR.x, BAR.y],
                [T.barStart, BAR.x, BAR.y],
                [T.barEnd, BAR.x + BAR.w, BAR.y + BAR.h],
                [2900, 130, 118],
            ],
        },
    ];
}

function Arrow({ color }: { color: string }) {
    return (
        <svg width="18" height="22" viewBox="0 0 18 22" style={{ position: 'absolute', left: -1.5, top: -1.5, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' }}>
            <path d="M1.5 1.5 L1.5 17.5 L5.8 13.6 L8.9 20.4 L11.8 19.1 L8.8 12.5 L14.6 12.5 Z" fill={color} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

function Crosshair({ color }: { color: string }) {
    return (
        <svg width="19" height="19" viewBox="0 0 19 19" style={{ position: 'absolute', left: -9.5, top: -9.5, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' }}>
            <path d="M9.5 1 V18 M1 9.5 H18" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M9.5 1 V18 M1 9.5 H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function SizeBadge({ x, y, w, h, color, ink }: { x: number; y: number; w: number; h: number; color: string; ink: string }) {
    return (
        <span style={{ position: 'absolute', left: x, top: y, transform: 'translateX(-50%)', background: color, color: ink, fontFamily: MONO, fontSize: 10, lineHeight: '15px', padding: '0 5px', borderRadius: 4, whiteSpace: 'nowrap' }}>
            {Math.round(w)} × {Math.round(h)}
        </span>
    );
}

function Stage({ t, loaded, W, H, scale }: Frame) {
    const cursors = makeCursors(W, H);
    const fill = Math.min(clamp01((t - T.barEnd) / (T.fillEnd - T.barEnd)), loaded ? 1 : 0.9);
    const typed = t < T.typeStart ? 0 : Math.floor(clamp01((t - T.typeStart) / (T.typeEnd - T.typeStart)) * NAME.length);
    const exitP = easeIn(clamp01((t - T.exit) / 500));

    const pos = {} as Record<CursorId, Point>;
    cursors.forEach((c, i) => {
        let p = along(c.keys, t);
        let steady = false;
        if (c.id === 'type' && t >= T.typeStart && t <= T.typeEnd) {
            p = { x: TEXT.x + typed * CHAR_W + 3, y: TYPE_Y };
            steady = true;
        }
        if (c.id === 'layout' && t >= T.barEnd) {
            p = { x: BAR.x + BAR.w * fill + 2, y: BAR.y + BAR.h };
            steady = true;
        }
        // A little hand tremor on free-moving cursors.
        if (!steady) p = { x: p.x + Math.sin(t / 420 + i * 1.7) * 1.5, y: p.y + Math.cos(t / 510 + i * 2.3) * 1.5 };
        if (exitP > 0) {
            const len = Math.hypot(p.x, p.y) || 1;
            const dist = exitP * Math.max(W, H) * 1.8;
            p = { x: p.x + (p.x / len) * dist, y: p.y + (p.y / len) * dist };
        }
        pos[c.id] = p;
    });

    // Near the right edge (narrow phones), name tags sit on the cursor's left so they stay on screen.
    const tagFlips = (p: Point) => p.x > W - 40 - 75;

    // Box
    const boxDragging = t < T.boxEnd;
    const box = boxDragging ? rectFrom({ x: BOX.x, y: BOX.y }, pos.layout) : BOX;

    // Guide
    const guideY = t < T.guideEnd ? pos.guide.y : GUIDE_Y;
    const guideFlash = t >= T.moveEnd && t < T.moveEnd + 180;
    const guideOpacity = (guideFlash ? 1 : 0.7) * (1 - clamp01((t - 2600) / 300));

    // Subtitle
    const subPlaced = t >= T.moveEnd;
    const sub = subPlaced ? SUB : { x: pos.move.x - GRAB.x, y: pos.move.y - GRAB.y };

    // Pen rule
    const ruleEnd = t < T.penEnd ? Math.max(BOX.x, pos.pen.x) : BOX.x + BOX.w;
    const anchorOpacity = 1 - clamp01((t - 2650) / 200);

    // Progress bar
    const barDragging = t < T.barEnd;
    const bar = barDragging ? rectFrom({ x: BAR.x, y: BAR.y }, pos.bar) : BAR;

    const caretOn = t >= T.typeStart && (t <= T.typeEnd || (t < 2800 && Math.floor(t / 350) % 2 === 0));

    return (
        <div aria-hidden style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, transform: `scale(${scale})` }}>
            {t >= T.guideStart && guideOpacity > 0 && (
                <>
                    <div style={{ position: 'absolute', left: -W, top: guideY, width: W * 2, height: 1, background: COLORS.guide, opacity: guideOpacity }} />
                    {t < T.guideEnd && (
                        <span style={{ position: 'absolute', left: tagFlips(pos.guide) ? pos.guide.x - 8 : pos.guide.x + 16, transform: tagFlips(pos.guide) ? 'translateX(-100%)' : undefined, top: guideY - 22, background: COLORS.guide, color: '#fff', fontFamily: MONO, fontSize: 10, lineHeight: '15px', padding: '0 5px', borderRadius: 4 }}>
                            Y {Math.round((guideY + H - 40) * scale)}
                        </span>
                    )}
                </>
            )}

            {t >= T.boxStart && (
                <>
                    <div
                        style={{
                            position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, borderRadius: 8,
                            border: boxDragging ? `1px dashed ${COLORS.layout}` : '1px solid var(--theme-card-border)',
                            background: boxDragging ? 'rgba(242, 78, 30, 0.06)' : 'var(--theme-card-bg)',
                        }}
                    />
                    {boxDragging && <SizeBadge x={box.x + box.w / 2} y={box.y + box.h + 8} w={box.w} h={box.h} color={COLORS.layout} ink="#fff" />}
                </>
            )}

            {t >= T.typeStart && (
                <div style={{ position: 'absolute', left: TEXT.x, top: TEXT.y, fontFamily: MONO, fontSize: NAME_SIZE, lineHeight: 1.2, fontWeight: 600, color: 'var(--theme-primary)', whiteSpace: 'pre' }}>
                    {NAME.slice(0, typed)}
                    <span style={{ display: 'inline-block', width: 2, height: NAME_SIZE, marginLeft: 1, verticalAlign: '-0.15em', background: COLORS.type, opacity: caretOn ? 1 : 0 }} />
                </div>
            )}

            {t >= T.moveStart && (
                <div
                    style={{
                        position: 'absolute', left: sub.x, top: sub.y, fontFamily: MONO, fontSize: 12, lineHeight: '18px', letterSpacing: '0.24em', textTransform: 'uppercase',
                        color: 'var(--theme-secondary)', whiteSpace: 'nowrap', opacity: clamp01((t - T.moveStart) / 150),
                        outline: subPlaced ? 'none' : `1px solid ${COLORS.move}`, outlineOffset: 3,
                    }}
                >
                    {SUBTITLE}
                </div>
            )}

            {t >= T.penStart && (
                <>
                    <div style={{ position: 'absolute', left: BOX.x, top: RULE_Y, width: ruleEnd - BOX.x, height: 1, background: 'var(--theme-faint)' }} />
                    {anchorOpacity > 0 && [BOX.x, ...(t >= T.penEnd ? [BOX.x + BOX.w] : [])].map((x) => (
                        <div key={x} style={{ position: 'absolute', left: x - 3.5, top: RULE_Y - 3, width: 7, height: 7, background: '#fff', border: `1.5px solid ${COLORS.pen}`, opacity: anchorOpacity }} />
                    ))}
                </>
            )}

            {t >= T.barStart && (
                <>
                    <div
                        style={{
                            position: 'absolute', left: bar.x, top: bar.y, width: bar.w, height: Math.max(bar.h, 1), overflow: 'hidden',
                            borderRadius: barDragging ? 0 : 999,
                            border: barDragging ? `1px dashed ${COLORS.bar}` : '1px solid var(--theme-card-border)',
                            background: barDragging ? 'rgba(255, 199, 0, 0.08)' : 'var(--theme-card-bg)',
                        }}
                    >
                        {!barDragging && <div style={{ width: `${fill * 100}%`, height: '100%', background: 'var(--theme-primary)' }} />}
                    </div>
                    {barDragging ? (
                        <SizeBadge x={bar.x + bar.w / 2} y={bar.y + bar.h + 8} w={bar.w} h={bar.h} color={COLORS.bar} ink="#1a1a1a" />
                    ) : (
                        <div style={{ position: 'absolute', left: BAR.x, top: BAR.y + BAR.h + 10, width: BAR.w, display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 11, color: 'var(--theme-faint)' }}>
                            <span>{fill < 1 ? 'building…' : 'ready'}</span>
                            <span>{Math.round(fill * 100)}%</span>
                        </div>
                    )}
                </>
            )}

            {cursors.map((c) => {
                const p = pos[c.id];
                const cross = (c.id === 'layout' && t >= T.boxStart && t < T.boxEnd) || (c.id === 'bar' && t >= T.barStart && t < T.barEnd);
                return (
                    <div key={c.id} style={{ position: 'absolute', left: 0, top: 0, transform: `translate3d(${p.x}px, ${p.y}px, 0)`, willChange: 'transform' }}>
                        {cross ? <Crosshair color={c.color} /> : <Arrow color={c.color} />}
                        <span style={{ position: 'absolute', ...(tagFlips(p) ? { right: 4 } : { left: 14 }), top: 18, background: c.color, color: c.ink, fontFamily: SANS, fontSize: 11, fontWeight: 500, lineHeight: '17px', padding: '0 6px', borderRadius: 4, whiteSpace: 'nowrap' }}>
                            {c.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default function SwarmLoader() {
    const [frame, setFrame] = useState<Frame | null>(null);
    const [done, setDone] = useState(false);
    const skipRef = useRef<() => void>(() => { });

    useEffect(() => {
        const root = document.documentElement;
        const prevOverflow = root.style.overflow;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let start = performance.now();
        let loaded = document.readyState === 'complete';
        let waitStart = 0;
        let raf = 0;
        let finished = false;

        if (!reduceMotion) root.style.overflow = 'hidden';

        const finish = () => {
            if (finished) return;
            finished = true;
            root.style.overflow = prevOverflow;
            setDone(true);
        };

        const onLoad = () => { loaded = true; };
        // Click or any key jumps straight to the exit.
        const skip = () => {
            const now = performance.now();
            if (now - start < T.exit) start = now - T.exit;
            loaded = true;
        };
        skipRef.current = skip;
        window.addEventListener('load', onLoad);
        window.addEventListener('keydown', skip);

        const tick = (now: number) => {
            if (reduceMotion) return finish();
            let t = now - start;
            // Hold at a full-ish bar until the page has actually loaded.
            if (!loaded && t > T.fillEnd) {
                if (!waitStart) waitStart = now;
                if (now - waitStart < MAX_WAIT_FOR_LOAD_MS) {
                    start = now - T.fillEnd;
                    t = T.fillEnd;
                } else {
                    loaded = true;
                }
            }
            if (t >= T.done) return finish();
            const scale = Math.min(1, (window.innerWidth - 32) / STAGE_W);
            setFrame({ t, loaded, W: window.innerWidth / 2 / scale + 40, H: window.innerHeight / 2 / scale + 40, scale });
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('load', onLoad);
            window.removeEventListener('keydown', skip);
            root.style.overflow = prevOverflow;
        };
    }, []);

    if (done) return null;

    const opacity = frame ? 1 - clamp01((frame.t - T.fade) / (T.done - T.fade)) : 1;
    return (
        <div
            className="swarm-loader fixed inset-0 z-[9999] overflow-hidden bg-page select-none"
            style={{ opacity, pointerEvents: frame && frame.t >= T.exit ? 'none' : 'auto' }}
            onPointerDown={() => skipRef.current()}
            role="status"
        >
            <span className="sr-only">Loading</span>
            {frame && <Stage {...frame} />}
        </div>
    );
}
