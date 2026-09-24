'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from './ThemeProvider';

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface ContributionWeek {
    days: (ContributionDay | null)[];
}

interface GitHubContributionsProps {
    username: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MIN_TILE = 9;
const TILE_GAP = 3;

function parseDate(date: string) {
    const [y, m, d] = date.split('-').map(Number);
    return new Date(y, m - 1, d);
}

function formatDate(date: string) {
    const d = parseDate(date);
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function toWeeks(days: ContributionDay[]): ContributionWeek[] {
    if (days.length === 0) return [];
    const cells: (ContributionDay | null)[] = [
        ...Array(parseDate(days[0].date).getDay()).fill(null),
        ...days,
    ];
    const weeks: ContributionWeek[] = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push({ days: cells.slice(i, i + 7) });
    }
    return weeks;
}

export default function GitHubContributions({ username }: GitHubContributionsProps) {
    const [contributions, setContributions] = useState<ContributionWeek[]>([]);
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [totalContributions, setTotalContributions] = useState(0);
    const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (status === 'ready' && scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, [status]);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchContributions() {
            try {
                const response = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
                    { signal: controller.signal }
                );
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                if (!Array.isArray(data.contributions)) throw new Error('Unexpected response');

                const days: ContributionDay[] = data.contributions;
                const summed = days.reduce((sum, day) => sum + day.count, 0);
                setContributions(toWeeks(days));
                setTotalContributions(data.total?.lastYear ?? summed);
                setStatus('ready');
            } catch (error) {
                if (controller.signal.aborted) return;
                console.error('Failed to fetch GitHub contributions:', error);
                setStatus('error');
            }
        }

        fetchContributions();
        return () => controller.abort();
    }, [username]);

    const monthLabels = useMemo(() => {
        const labels: { month: string; start: number; span: number }[] = [];
        let lastMonth = -1;

        contributions.forEach((week, weekIndex) => {
            const firstDay = week.days.find((day): day is ContributionDay => day !== null);
            if (!firstDay) return;
            const month = parseDate(firstDay.date).getMonth();
            if (month !== lastMonth) {
                labels.push({ month: MONTHS[month], start: weekIndex, span: 0 });
                lastMonth = month;
            }
        });

        labels.forEach((label, i) => {
            label.span = (labels[i + 1]?.start ?? contributions.length) - label.start;
        });

        return labels.filter((label) => label.span >= 3);
    }, [contributions]);

    const getLevelColor = (level: number) => {
        if (theme === 'light') {
            switch (level) {
                case 1: return 'bg-[#c0c0c0]';
                case 2: return 'bg-[#8a8a8a]';
                case 3: return 'bg-[#505050]';
                case 4: return 'bg-[#1a1a1a]';
                default: return 'bg-[#ebedf0]';
            }
        }
        switch (level) {
            case 1: return 'bg-[#3d3d3d] shadow-[inset_0_0_4px_rgba(255,255,255,0.05)]';
            case 2: return 'bg-[#5a5a5a] shadow-[inset_0_0_6px_rgba(255,255,255,0.1)]';
            case 3: return 'bg-[#8a8a8a] shadow-[inset_0_0_8px_rgba(255,255,255,0.15)]';
            case 4: return 'bg-[#e8e8e8] shadow-[0_0_8px_rgba(255,255,255,0.4),inset_0_0_4px_rgba(255,255,255,0.3)]';
            default: return 'bg-[#1a1a1a]';
        }
    };

    const handleMouseEnter = (day: ContributionDay, e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHoveredDay({ day, x: rect.left + rect.width / 2, y: rect.top - 8 });
    };

    const profileUrl = `https://github.com/${username}`;

    if (status === 'loading') {
        return (
            <div className="animate-pulse">
                <div className="h-3 bg-theme-card-hover rounded w-1/3 mb-4" />
                <div className="h-28 bg-theme-card rounded-lg" />
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="rounded-lg border border-theme-divider bg-theme-card px-5 py-8 text-center text-sm text-theme-muted">
                Couldn&apos;t load GitHub activity right now.{' '}
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-theme-primary animated-underline">
                    View it on GitHub
                </a>
            </div>
        );
    }

    const gridColumns = `repeat(${contributions.length}, minmax(${MIN_TILE}px, 1fr))`;
    const minWidth = contributions.length * (MIN_TILE + TILE_GAP);

    const tooltip = hoveredDay ? createPortal(
        <div
            className="fixed z-[9999] px-3 py-1.5 rounded-md text-xs whitespace-nowrap pointer-events-none shadow-lg"
            style={{
                left: hoveredDay.x,
                top: hoveredDay.y,
                transform: 'translate(-50%, -100%)',
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.9)',
            }}
        >
            {hoveredDay.day.count} contribution{hoveredDay.day.count !== 1 ? 's' : ''} on {formatDate(hoveredDay.day.date)}
        </div>,
        document.body
    ) : null;

    return (
        <>
            <div className="w-full">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                    <p className="text-sm text-theme-secondary">
                        <span className="text-theme-primary font-medium">{totalContributions.toLocaleString()}</span>{' '}
                        contributions in the last year
                    </p>
                    <a
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-theme-muted hover:text-theme-primary transition-colors whitespace-nowrap"
                    >
                        @{username} ↗
                    </a>
                </div>

                <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
                    <div style={{ minWidth }}>
                        <div
                            className="grid mb-2 text-[11px] text-theme-muted"
                            style={{ gridTemplateColumns: gridColumns, columnGap: TILE_GAP }}
                        >
                            {monthLabels.map((label) => (
                                <span
                                    key={`${label.month}-${label.start}`}
                                    style={{ gridColumn: `${label.start + 1} / span ${label.span}` }}
                                >
                                    {label.month}
                                </span>
                            ))}
                        </div>

                        <div className="grid" style={{ gridTemplateColumns: gridColumns, gap: TILE_GAP }}>
                            {contributions.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col" style={{ gap: TILE_GAP }}>
                                    {week.days.map((day, dayIndex) =>
                                        day ? (
                                            <div
                                                key={day.date}
                                                className={`aspect-square w-full rounded-[2px] ${getLevelColor(day.level)} transition-transform duration-150 hover:scale-125 hover:ring-1 hover:ring-theme-card-hover-border cursor-pointer`}
                                                onMouseEnter={(e) => handleMouseEnter(day, e)}
                                                onMouseLeave={() => setHoveredDay(null)}
                                            />
                                        ) : (
                                            <div key={`empty-${dayIndex}`} className="aspect-square w-full" />
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-1 mt-4 text-[11px] text-theme-muted">
                    <span className="mr-1">Less</span>
                    {[0, 1, 2, 3, 4].map((level) => (
                        <div key={level} className={`w-[10px] h-[10px] rounded-[2px] ${getLevelColor(level)}`} />
                    ))}
                    <span className="ml-1">More</span>
                </div>
            </div>
            {tooltip}
        </>
    );
}
