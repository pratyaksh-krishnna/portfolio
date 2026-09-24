import type { Experience } from '@/data/experience';

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
        return <img src={item.logo} alt={item.company} className="w-11 h-11 rounded-lg object-cover border border-theme-divider" />;
    }
    return (
        <div className="w-11 h-11 rounded-lg border border-theme-divider bg-theme-card flex items-center justify-center text-theme-primary text-lg font-semibold">
            {item.company.charAt(0)}
        </div>
    );
}

export default function ExperienceTimeline({ items }: { items: Experience[] }) {
    return (
        <ol className="relative">
            {items.map((item, index) => {
                const isCurrent = item.end === 'Present';
                const isLast = index === items.length - 1;

                return (
                    <li key={item.id} className="group relative pl-9 md:pl-10 pb-10 last:pb-0">
                        {!isLast && (
                            <span className="absolute left-[7px] top-5 bottom-0 w-px bg-theme-divider" aria-hidden />
                        )}

                        <span className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center" aria-hidden>
                            {isCurrent ? (
                                <>
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40 animate-ping" />
                                    <span className="relative h-[15px] w-[15px] rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                                </>
                            ) : (
                                <span className="h-[11px] w-[11px] rounded-full border-2 border-theme-muted bg-page transition-colors duration-300 group-hover:border-theme-primary" />
                            )}
                        </span>

                        <div className="flex gap-4 -mx-3 -my-2 px-3 py-2 rounded-xl border border-transparent transition-colors duration-300 group-hover:bg-theme-card group-hover:border-theme-card-border">
                            <div className="shrink-0 self-start transition-transform duration-500 group-hover:scale-110">
                                <CompanyLogo item={item} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <h3 className="text-base text-theme-primary font-medium origin-left transition-transform duration-300 group-hover:scale-[1.08] group-hover:text-theme-icon-hover" style={{ fontFamily: 'inherit' }}>{item.role}</h3>
                                    {isCurrent && (
                                        <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                                            Current
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-theme-secondary mt-0.5">
                                    {item.company} · {item.type}
                                </p>
                                <p className="text-xs text-theme-muted mt-1">
                                    {formatMonth(item.start)} – {formatMonth(item.end)} · {formatDuration(item.start, item.end)} · {item.location}
                                </p>

                                {item.highlights.length > 0 && (
                                    <ul className="mt-4 space-y-2 text-sm leading-6 text-theme-secondary">
                                        {item.highlights.map((highlight) => (
                                            <li key={highlight} className="flex gap-2.5">
                                                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-theme-muted" aria-hidden />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {item.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="text-xs px-2 py-1 bg-theme-badge-bg text-theme-badge-text rounded border border-theme-divider">
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
    );
}
