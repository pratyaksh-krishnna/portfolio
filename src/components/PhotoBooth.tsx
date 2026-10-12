'use client';

import { useEffect, useState } from 'react';

export interface BoothPhoto {
    src: string;
    alt: string;
    /** CSS object-position used to keep the subject in frame. */
    position?: string;
    /** object-position for the wider filmstrip thumbnail, when the main framing would crop the subject there. */
    thumbPosition?: string;
    /** Extra zoom toward `focus` (CSS transform-origin), e.g. 1.3 to tighten a wide shot. */
    zoom?: number;
    focus?: string;
}

const AUTO_ADVANCE_MS = 5000;
const FLASH_MS = 350;

function photoStyle({ position, zoom, focus }: BoothPhoto) {
    return {
        objectPosition: position,
        transform: zoom ? `scale(${zoom})` : undefined,
        transformOrigin: focus,
    };
}

// A macOS Photo Booth style frame: the selected photo on top, a filmstrip of all photos below.
export default function PhotoBooth({ photos }: { photos: BoothPhoto[] }) {
    const [active, setActive] = useState(0);
    const [flash, setFlash] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        if (!autoPlay || photos.length < 2) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const timer = setInterval(() => setActive((i) => (i + 1) % photos.length), AUTO_ADVANCE_MS);
        return () => clearInterval(timer);
    }, [autoPlay, photos.length]);

    useEffect(() => {
        if (!flash) return;
        const timer = setTimeout(() => setFlash(false), FLASH_MS);
        return () => clearTimeout(timer);
    }, [flash]);

    const select = (index: number) => {
        setAutoPlay(false);
        setActive(index);
    };

    const snap = () => {
        select((active + 1) % photos.length);
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setFlash(true);
    };

    return (
        <figure className="w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50">
            <figcaption className="px-3 py-2 text-[11px] font-semibold text-white/50">Photo Booth</figcaption>

            <div className="relative aspect-[8/7] overflow-hidden">
                {photos.map((photo, i) => (
                    <img
                        key={photo.src}
                        src={photo.src}
                        alt={photo.alt}
                        aria-hidden={i !== active}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                        style={photoStyle(photo)}
                    />
                ))}
                <div
                    className={`pointer-events-none absolute inset-0 bg-white transition-opacity ${flash ? 'opacity-90 duration-0' : 'opacity-0 duration-300'}`}
                    aria-hidden
                />
            </div>

            <div className="grid gap-px border-y border-black bg-black" style={{ gridTemplateColumns: `repeat(${photos.length}, minmax(0, 1fr))` }}>
                {photos.map((photo, i) => (
                    <button
                        key={photo.src}
                        type="button"
                        onClick={() => select(i)}
                        aria-label={`Show photo ${i + 1}: ${photo.alt}`}
                        aria-pressed={i === active}
                        className="relative aspect-[3/2] cursor-pointer overflow-hidden"
                    >
                        <img
                            src={photo.src}
                            alt=""
                            className={`h-full w-full object-cover transition-opacity duration-300 ${i === active ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                            style={{ ...photoStyle(photo), objectPosition: photo.thumbPosition ?? photo.position }}
                        />
                        {i === active && <span className="absolute inset-0 ring-2 ring-inset ring-white/80" aria-hidden />}
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-1.5 text-white/50" aria-hidden>
                    <span className="h-3 w-3 rounded-[3px] border border-current" />
                    <span className="h-3 w-4 rounded-[3px] border border-current" />
                </div>
                <button
                    type="button"
                    onClick={snap}
                    aria-label="Next photo"
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-white/90 transition-colors hover:bg-neutral-600"
                >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M9 4.5 7.6 6.5H5A2 2 0 0 0 3 8.5v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2.6L15 4.5H9Zm3 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
                    </svg>
                </button>
                <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-[10px] font-medium text-white/70" aria-hidden>Effects</span>
            </div>
        </figure>
    );
}
