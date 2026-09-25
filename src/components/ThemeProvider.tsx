'use client';

import { createContext, useContext, useRef, useSyncExternalStore } from 'react';

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
    try {
        return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    } catch {
        return 'dark';
    }
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
    const overlayRef = useRef<HTMLDivElement>(null);
    const animatingRef = useRef(false);

    const toggleTheme = (x?: number, y?: number) => {
        if (animatingRef.current) return;
        animatingRef.current = true;

        const next = theme === 'dark' ? 'light' : 'dark';
        const overlay = overlayRef.current;

        if (!overlay || x === undefined || y === undefined) {
            setTheme(next);
            animatingRef.current = false;
            return;
        }

        overlay.getAnimations().forEach(a => a.cancel());

        const maxRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        overlay.style.backgroundColor = next === 'light' ? '#fafafa' : '#000000';
        overlay.style.opacity = '1';
        overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        overlay.style.display = 'block';
        void overlay.offsetHeight; // force a reflow so the animation starts from the reset styles

        const expandAnim = overlay.animate(
            [
                { clipPath: `circle(0px at ${x}px ${y}px)` },
                { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` },
            ],
            { duration: 800, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)' }
        );

        const switchTimer = setTimeout(() => {
            setTheme(next);
        }, 480);

        expandAnim.onfinish = () => {
            overlay.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;

            const fadeAnim = overlay.animate(
                [{ opacity: '1' }, { opacity: '0' }],
                { duration: 200, easing: 'ease-out' }
            );

            fadeAnim.onfinish = () => {
                overlay.style.display = 'none';
                overlay.style.clipPath = '';
                overlay.style.opacity = '';
                animatingRef.current = false;
            };
        };

        expandAnim.oncancel = () => {
            clearTimeout(switchTimer);
            overlay.style.display = 'none';
            overlay.style.clipPath = '';
            overlay.style.opacity = '';
            animatingRef.current = false;
        };
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
            <div
                ref={overlayRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    display: 'none',
                }}
            />
        </ThemeContext.Provider>
    );
}
