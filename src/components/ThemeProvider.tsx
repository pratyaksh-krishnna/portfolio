'use client';

import { createContext, useContext, useRef, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (x?: number, y?: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => { },
});

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
    const animatingRef = useRef(false);

    const toggleTheme = async (x?: number, y?: number) => {
        if (animatingRef.current) return;

        const next = getTheme() === 'dark' ? 'light' : 'dark';
        const root = document.documentElement;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setTheme(next);
            return;
        }

        animatingRef.current = true;
        let transition: ViewTransition | undefined;

        try {
            if (typeof document.startViewTransition !== 'function') {
                // Keep older browsers smooth without an overlay hiding the content.
                root.classList.add('theme-fade');
                void root.offsetWidth;
                setTheme(next);
                await new Promise<void>((resolve) => window.setTimeout(resolve, 700));
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
                        `circle(0px at ${originX}px ${originY}px)`,
                        `circle(${radius}px at ${originX}px ${originY}px)`,
                    ],
                },
                {
                    duration: 900,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
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
            animatingRef.current = false;
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
