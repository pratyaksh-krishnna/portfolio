'use client';

import { createContext, useContext, useRef, useState, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    /** True for TOGGLE_COOLDOWN_MS after a switch starts; toggles in that window are ignored. */
    locked: boolean;
    toggleTheme: (x?: number, y?: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    locked: false,
    toggleTheme: () => { },
});

// A slow, steady sweep that still moves from the first frame (~8% of the page at 100ms, ~half by 400ms),
// so it reads as a deliberate reveal without the "did my click register?" pause of an ease-in start.
const REVEAL_DURATION_MS = 1300;
const REVEAL_EASING = 'cubic-bezier(0.5, 1, 0.89, 1)';
// Start the circle at about the toggle's size so the very first frame already shows a change.
const REVEAL_START_RADIUS = 16;
// The fallback colour fade (browsers without view transitions); covers the 650ms .theme-fade transition in globals.css.
const FADE_DURATION_MS = 700;
// One switch per 2s, counted from the click; covers the whole reveal so switches can't overlap.
const TOGGLE_COOLDOWN_MS = 2000;

export function useTheme() {
    return useContext(ThemeContext);
}

// The saved theme lives in localStorage; the inline script in layout.tsx applies it before hydration.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

function getTheme(): Theme {
    return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

function getServerTheme(): Theme {
    return 'dark';
}

function setTheme(next: Theme) {
    try {
        localStorage.setItem('theme', next);
    } catch { }
    document.documentElement.classList.toggle('light', next === 'light');
    listeners.forEach((listener) => listener());
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
    const [locked, setLocked] = useState(false);
    const lockedRef = useRef(false);

    const toggleTheme = async (x?: number, y?: number) => {
        if (lockedRef.current) return;
        lockedRef.current = true;
        setLocked(true);
        const cooldown = new Promise<void>((resolve) => window.setTimeout(resolve, TOGGLE_COOLDOWN_MS));
        try {
            await playSwitch(x, y);
        } finally {
            await cooldown;
            lockedRef.current = false;
            setLocked(false);
        }
    };

    const playSwitch = async (x?: number, y?: number) => {
        const next = getTheme() === 'dark' ? 'light' : 'dark';
        const root = document.documentElement;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setTheme(next);
            return;
        }

        let transition: ViewTransition | undefined;

        try {
            if (typeof document.startViewTransition !== 'function') {
                // Keep older browsers smooth without an overlay hiding the content.
                root.classList.add('theme-fade');
                void root.offsetWidth;
                setTheme(next);
                await new Promise<void>((resolve) => window.setTimeout(resolve, FADE_DURATION_MS));
                return;
            }

            const originX = x ?? window.innerWidth / 2;
            const originY = y ?? window.innerHeight / 2;
            const radius = Math.ceil(Math.hypot(
                Math.max(originX, window.innerWidth - originX),
                Math.max(originY, window.innerHeight - originY)
            ));

            root.classList.add('theme-reveal');
            transition = document.startViewTransition(() => {
                // Capture React's themed content along with the updated CSS colors.
                flushSync(() => setTheme(next));
            });

            await transition.ready;
            root.animate(
                {
                    clipPath: [
                        `circle(${REVEAL_START_RADIUS}px at ${originX}px ${originY}px)`,
                        `circle(${radius}px at ${originX}px ${originY}px)`,
                    ],
                },
                {
                    duration: REVEAL_DURATION_MS,
                    easing: REVEAL_EASING,
                    pseudoElement: '::view-transition-new(root)',
                    fill: 'both',
                }
            );
            await transition.finished;
        } catch {
            // A hidden tab or interrupted capture must still apply the chosen theme.
            transition?.skipTransition();
            setTheme(next);
        } finally {
            root.classList.remove('theme-reveal', 'theme-fade');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, locked, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
