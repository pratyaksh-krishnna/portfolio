'use client';

import { useState } from 'react';
import type { Experience } from '@/data/experience';
import TracingBeam from './TracingBeam';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseMonth(value: string) {
    const [year, month] = value.split('-').map(Number);
    return { year, month: month - 1 };
}

function formatMonth(value: string) {
    if (value === 'Present') return 'Present';
    const { year, month } = parseMonth(value);
    return `${MONTHS[month]} ${year}`;
}

function formatDuration(start: string, end: string) {
    const from = parseMonth(start);
    const now = new Date();
    const to = end === 'Present' ? { year: now.getFullYear(), month: now.getMonth() } : parseMonth(end);
    const total = (to.year - from.year) * 12 + (to.month - from.month) + 1;
    const years = Math.floor(total / 12);
    const months = total % 12;
    const parts = [];
    if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
    return parts.join(' ');
}

function CompanyLogo({ item }: { item: Experience }) {
    if (item.logo) {
        return <img src={item.logo} alt={item.company} className="h-9 w-9 md:h-10 md:w-10 rounded-lg object-cover border border-theme-divider" />;
    }
    return (
        <div className="h-9 w-9 md:h-10 md:w-10 rounded-lg border border-theme-divider bg-theme-card flex items-center justify-center text-theme-primary text-sm font-medium">
            {item.company.charAt(0)}
        </div>
    );
}

export default function ExperienceTimeline({ items }: { items: Experience[] }) {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <TracingBeam>
            <ol className="relative">
                {items.map((item) => {
                    const isCurrent = item.end === 'Present';
                    const isOpen = !!expanded[item.id];

                    return (
                        <li key={item.id} className="group relative pl-7 md:pl-9 pb-8 md:pb-10 last:pb-0">
                            <span data-beam-dot className="absolute left-0 top-2.5 md:top-3 flex h-[15px] w-[15px] items-center justify-center" aria-hidden>
                                {isCurrent ? (
                                    <>
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40 animate-ping" />
                                        <span className="relative h-[15px] w-[15px] rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                                    </>
                                ) : (
                                    <span className="h-[11px] w-[11px] rounded-full border-2 border-theme-muted bg-page transition-colors duration-300 group-hover:border-theme-primary" />
                                )}
                            </span>

                            <div className="flex gap-3 md:gap-4 -mx-3 -my-2 px-3 py-2 rounded-xl border border-transparent transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-theme-card group-hover:border-theme-card-border">
                                <div className="shrink-0 self-start">
                                    <CompanyLogo item={item} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    {/* On wider screens the dates move to the right so the row uses the full column. */}
                                    <div className="md:flex md:items-start md:justify-between md:gap-5">
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                <h3 className="text-[15px] md:text-[17px] leading-snug tracking-tight text-theme-primary font-medium" style={{ fontFamily: 'inherit' }}>{item.role}</h3>
                                                {isCurrent && (
                                                    <span className="text-[10px] leading-4 font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <p className="flex flex-wrap items-center gap-x-1.5 text-xs md:text-[13px] leading-5 mt-1">
                                                <span className="text-theme-secondary font-medium">{item.company}</span>
                                                <span className="text-theme-faint" aria-hidden>·</span>
                                                <span className="text-theme-muted">{item.type}</span>
                                            </p>
                                        </div>
                                        <div className="mt-2 md:mt-0.5 md:shrink-0 md:text-right">
                                            <p className="text-[11px] md:text-xs leading-5 tabular-nums text-theme-secondary">
                                                {formatMonth(item.start)} – {formatMonth(item.end)}
                                            </p>
                                            <p className="text-[11px] leading-5 text-theme-muted">
                                                {formatDuration(item.start, item.end)} · {item.location}
                                            </p>
                                        </div>
                                    </div>

                                    {item.highlights.length > 0 && (
                                        <>
                                            <div
                                                id={`experience-${item.id}-details`}
                                                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                            >
                                                <ul className="overflow-hidden max-w-2xl space-y-2 text-[13px] md:text-sm leading-6 text-theme-secondary" inert={!isOpen}>
                                                    {item.highlights.map((highlight, i) => (
                                                        <li key={highlight} className={`flex gap-2.5 ${i === 0 ? 'mt-3 md:mt-4' : ''}`}>
                                                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-theme-faint" aria-hidden />
                                                            <span>{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => toggle(item.id)}
                                                aria-expanded={isOpen}
                                                aria-controls={`experience-${item.id}-details`}
                                                className="mt-2 inline-flex min-h-8 items-center gap-1.5 rounded text-[11px] md:text-xs font-medium text-theme-muted hover:text-theme-primary transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-primary cursor-pointer"
                                            >
                                                {isOpen ? 'Show less' : 'Show more'}
                                                <svg
                                                    className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden
                                                >
                                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </>
                                    )}

                                    {item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-2.5 md:mt-3">
                                            {item.tags.map((tag) => (
                                                <span key={tag} className="text-[10px] md:text-[11px] leading-4 px-2 py-0.5 bg-theme-badge-bg text-theme-badge-text rounded-md border border-theme-divider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </TracingBeam>
    );
}
