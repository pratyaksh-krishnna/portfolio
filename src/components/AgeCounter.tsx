'use client';

import { useEffect, useState } from 'react';

const BIRTHDATE = new Date('2006-02-09T00:00:00+05:30');
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
// The 8th decimal place ticks over about every 316ms; updating more often only re-renders the same text.
const TICK_MS = MS_PER_YEAR / 1e8;

export default function AgeCounter() {
    const [age, setAge] = useState<number | null>(null);

    useEffect(() => {
        const updateAge = () => {
            const now = new Date();
            const ageInYears = (now.getTime() - BIRTHDATE.getTime()) / MS_PER_YEAR;
            setAge(ageInYears);
        };

        updateAge();
        const interval = setInterval(updateAge, TICK_MS);
        return () => clearInterval(interval);
    }, []);

    // The age depends on the visitor's clock, so the server can't render it. Keep the line's space reserved
    // (a same-width placeholder in the mono font) and fade it in once the client knows the value.
    return (
        <p
            className={`text-theme-badge-text text-sm md:text-base font-mono transition-opacity duration-500 ease-out ${age === null ? 'opacity-0' : 'opacity-100'}`}
            aria-hidden={age === null}
        >
            <span className="text-theme-muted">~ </span>
            {age === null ? '00.00000000' : age.toFixed(8)}
            <span className="text-theme-muted ml-1">years</span>
        </p>
    );
}
