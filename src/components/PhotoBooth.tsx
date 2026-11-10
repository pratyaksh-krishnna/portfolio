'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface BoothPhoto {
    src: string;
    alt: string;
    /** CSS object-position used to keep the subject in frame. */
    position?: string;
    /** Extra zoom toward `focus` (CSS transform-origin), e.g. 1.3 to tighten a wide shot. */
    zoom?: number;
    focus?: string;
}

const FLASH_MS = 350;

// A macOS Photo Booth style frame around a single photo; the shutter button just fires the flash.
export default function PhotoBooth({ photo }: { photo: BoothPhoto }) {
    const [flash, setFlash] = useState(false);

    useEffect(() => {
        if (!flash) return;
        const timer = setTimeout(() => setFlash(false), FLASH_MS);
        return () => clearTimeout(timer);
    }, [flash]);

    const snap = () => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setFlash(true);
    };

    return (
        <figure className="w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50">
            <figcaption className="px-3 py-2 text-[11px] font-semibold text-white/50">Photo Booth</figcaption>

            <div className="relative aspect-[8/7] overflow-hidden border-b border-black">
                <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, 85vw"
                    // The photo is the page's LCP element, so fetch it up front.
                    preload
                    fetchPriority="high"
                    className="object-cover"
                    style={{
                        objectPosition: photo.position,
                        transform: photo.zoom ? `scale(${photo.zoom})` : undefined,
                        transformOrigin: photo.focus,
                    }}
                />
                <div
                    className={`pointer-events-none absolute inset-0 bg-white transition-opacity ${flash ? 'opacity-90 duration-0' : 'opacity-0 duration-300'}`}
                    aria-hidden
                />
            </div>

            <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-1.5 text-white/50" aria-hidden>
                    <span className="h-3 w-3 rounded-[3px] border border-current" />
                    <span className="h-3 w-4 rounded-[3px] border border-current" />
                </div>
                <button
                    type="button"
                    onClick={snap}
                    aria-label="Take photo"
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
