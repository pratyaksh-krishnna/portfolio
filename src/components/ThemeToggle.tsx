'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { theme, locked, toggleTheme } = useTheme();
    const isLight = theme === 'light';
    const buttonRef = useRef<HTMLButtonElement>(null);
    const pointerRef = useRef<{ x: number; y: number } | null>(null);

    // During the reveal the browser hit-tests its transition overlay as <html>, so the button's own
    // not-allowed cursor can't show. While locked, put that cursor on <html> whenever the pointer is over the toggle.
    useEffect(() => {
        if (!locked) return;
        const root = document.documentElement;
        const update = (x: number, y: number) => {
            const r = buttonRef.current?.getBoundingClientRect();
            const over = !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
            root.style.cursor = over ? 'not-allowed' : '';
        };
        const onMove = (e: PointerEvent) => update(e.clientX, e.clientY);
        if (pointerRef.current) update(pointerRef.current.x, pointerRef.current.y);
        document.addEventListener('pointermove', onMove);
        return () => {
            document.removeEventListener('pointermove', onMove);
            root.style.cursor = '';
        };
    }, [locked]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        pointerRef.current = { x: e.clientX, y: e.clientY };
        if (locked) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        toggleTheme(x, y);
    };

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            className={`relative w-8 h-8 flex items-center justify-center rounded-lg text-theme-secondary transition-all duration-300 motion-reduce:transition-none ${locked ? 'cursor-not-allowed' : 'cursor-pointer hover:text-theme-primary hover:bg-theme-card'}`}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            aria-disabled={locked}
            title={locked ? 'One switch every 2 seconds' : `Switch to ${isLight ? 'dark' : 'light'} mode`}
        >
            <svg
                className={`w-[18px] h-[18px] absolute transition-all duration-500 motion-reduce:transition-none ${isLight ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                    }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
            >
                <circle cx="12" cy="12" r="4" />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-5.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636"
                />
            </svg>
            <svg
                className={`w-[18px] h-[18px] absolute transition-all duration-500 motion-reduce:transition-none ${isLight ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                    }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
            </svg>
        </button>
    );
}
