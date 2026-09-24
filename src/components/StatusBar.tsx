'use client';

import { useEffect, useState } from 'react';

const TIME_ZONE = 'Asia/Kolkata';

function formatTime(date: Date) {
    return new Intl.DateTimeFormat('en-IN', {
        timeZone: TIME_ZONE,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(date).toUpperCase();
}

export default function StatusBar() {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const update = () => setTime(formatTime(new Date()));
        update();
        const interval = setInterval(update, 15_000);
        return () => clearInterval(interval);
    }, []);

    const pill = 'flex items-center gap-2 rounded-full border border-white/15 bg-black/35 backdrop-blur-md px-3 py-1.5 text-[11px] sm:text-xs text-white/80';

    return (
        <div className="flex h-full items-end justify-between gap-3 px-4 md:px-6 pb-4">
            <div className={pill}>
                <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="truncate">
                    Building at Stealth<span className="hidden sm:inline"> · open to collaborations</span>
                </span>
            </div>

            <div className={`${pill} shrink-0`}>
                <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" strokeWidth={1.8} />
                </svg>
                <span>Delhi, IN</span>
                {time && (
                    <>
                        <span className="text-white/40">·</span>
                        <time className="tabular-nums">{time} IST</time>
                    </>
                )}
            </div>
        </div>
    );
}
