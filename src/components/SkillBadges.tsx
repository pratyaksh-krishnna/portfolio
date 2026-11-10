'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState, type ComponentType } from 'react';
import { LuCloud, LuCode, LuDatabase, LuLayers, LuPanelsTopLeft, LuServer, LuSparkles } from 'react-icons/lu';
import {
    SiAmazonwebservices,
    SiApachekafka,
    SiBun,
    SiCelery,
    SiClaude,
    SiCplusplus,
    SiDocker,
    SiDrizzle,
    SiExpress,
    SiFastapi,
    SiGit,
    SiGithub,
    SiGithubactions,
    SiGooglebigquery,
    SiGooglecloud,
    SiJavascript,
    SiLangchain,
    SiLinux,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiNginx,
    SiNodedotjs,
    SiOllama,
    SiOpenai,
    SiPostgresql,
    SiPostman,
    SiPrisma,
    SiPython,
    SiReact,
    SiRedis,
    SiRust,
    SiShadcnui,
    SiSocketdotio,
    SiSupabase,
    SiTailwindcss,
    SiTypescript,
    SiVite,
    SiZod,
} from 'react-icons/si';

type IconProps = { className?: string };

const LangGraphIcon = ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="5" cy="6" r="2.5" />
        <circle cx="19" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M7.5 6h9M6.3 8.2l4.4 7.6M17.7 8.2l-4.4 7.6" />
    </svg>
);

const BullMQIcon = ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <rect x="3" y="10" width="18" height="4" rx="1" />
        <rect x="3" y="16" width="12" height="4" rx="1" />
    </svg>
);

const PgvectorIcon = ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20L20 4M20 4h-6M20 4v6" />
        <path d="M4 20l6-12" opacity="0.6" />
        <path d="M4 20l12-4" opacity="0.6" />
    </svg>
);

const TanStackIcon = ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 7h16M4 12h16M4 17h16" />
        <circle cx="9" cy="7" r="1.6" fill="currentColor" />
        <circle cx="15" cy="12" r="1.6" fill="currentColor" />
        <circle cx="7" cy="17" r="1.6" fill="currentColor" />
    </svg>
);

type Category = 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'DevOps & Cloud' | 'AI';
/** `color` is the brand colour; left unset for logos that are black or too pale to read in both themes. */
type Skill = { name: string; icon: ComponentType<IconProps>; category: Category; color?: string };

const SKILLS: Skill[] = [
    { name: 'TypeScript', icon: SiTypescript, category: 'Languages', color: '#3178C6' },
    { name: 'JavaScript', icon: SiJavascript, category: 'Languages', color: '#F7DF1E' },
    { name: 'Python', icon: SiPython, category: 'Languages', color: '#3776AB' },
    { name: 'SQL', icon: SiMysql, category: 'Languages', color: '#4479A1' },
    { name: 'C/C++', icon: SiCplusplus, category: 'Languages', color: '#00599C' },
    { name: 'Rust', icon: SiRust, category: 'Languages' },

    { name: 'React', icon: SiReact, category: 'Frontend', color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, category: 'Frontend' },
    { name: 'Vite', icon: SiVite, category: 'Frontend', color: '#646CFF' },
    { name: 'TanStack', icon: TanStackIcon, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Frontend', color: '#06B6D4' },
    { name: 'shadcn/ui', icon: SiShadcnui, category: 'Frontend' },

    { name: 'Node.js', icon: SiNodedotjs, category: 'Backend', color: '#5FA04E' },
    { name: 'Express', icon: SiExpress, category: 'Backend' },
    { name: 'Bun', icon: SiBun, category: 'Backend' },
    { name: 'FastAPI', icon: SiFastapi, category: 'Backend', color: '#009688' },
    { name: 'Celery', icon: SiCelery, category: 'Backend', color: '#37814A' },
    { name: 'BullMQ', icon: BullMQIcon, category: 'Backend' },
    { name: 'Kafka', icon: SiApachekafka, category: 'Backend' },
    { name: 'Socket.IO', icon: SiSocketdotio, category: 'Backend' },
    { name: 'Prisma', icon: SiPrisma, category: 'Backend' },
    { name: 'Drizzle', icon: SiDrizzle, category: 'Backend' },
    { name: 'Zod', icon: SiZod, category: 'Backend', color: '#3E67B1' },
    { name: 'Postman', icon: SiPostman, category: 'Backend', color: '#FF6C37' },

    { name: 'PostgreSQL', icon: SiPostgresql, category: 'Databases', color: '#4169E1' },
    { name: 'MongoDB', icon: SiMongodb, category: 'Databases', color: '#47A248' },
    { name: 'Redis', icon: SiRedis, category: 'Databases', color: '#FF4438' },
    { name: 'Supabase', icon: SiSupabase, category: 'Databases', color: '#3FCF8E' },
    { name: 'pgvector', icon: PgvectorIcon, category: 'Databases' },
    { name: 'BigQuery', icon: SiGooglebigquery, category: 'Databases', color: '#669DF6' },

    { name: 'Docker', icon: SiDocker, category: 'DevOps & Cloud', color: '#2496ED' },
    { name: 'AWS', icon: SiAmazonwebservices, category: 'DevOps & Cloud', color: '#FF9900' },
    { name: 'GCP', icon: SiGooglecloud, category: 'DevOps & Cloud', color: '#4285F4' },
    { name: 'Nginx', icon: SiNginx, category: 'DevOps & Cloud', color: '#009639' },
    { name: 'Linux', icon: SiLinux, category: 'DevOps & Cloud' },
    { name: 'Git', icon: SiGit, category: 'DevOps & Cloud', color: '#F05032' },
    { name: 'GitHub', icon: SiGithub, category: 'DevOps & Cloud' },
    { name: 'GitHub Actions', icon: SiGithubactions, category: 'DevOps & Cloud', color: '#2088FF' },

    { name: 'LangChain', icon: SiLangchain, category: 'AI' },
    { name: 'LangGraph', icon: LangGraphIcon, category: 'AI' },
    { name: 'OpenAI', icon: SiOpenai, category: 'AI' },
    { name: 'Claude', icon: SiClaude, category: 'AI', color: '#D97757' },
    { name: 'Ollama', icon: SiOllama, category: 'AI' },
];

const TABS: { label: 'All' | Category; icon: ComponentType<IconProps> }[] = [
    { label: 'All', icon: LuLayers },
    { label: 'Languages', icon: LuCode },
    { label: 'Frontend', icon: LuPanelsTopLeft },
    { label: 'Backend', icon: LuServer },
    { label: 'Databases', icon: LuDatabase },
    { label: 'DevOps & Cloud', icon: LuCloud },
    { label: 'AI', icon: LuSparkles },
];

const MONO = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" };

// Project tech stacks use a few names that differ from the skill list.
const ICON_ALIASES: Record<string, string> = { 'AWS S3': 'AWS', Tailwind: 'Tailwind CSS', Next: 'Next.js', Node: 'Node.js' };
const iconsByName = new Map(SKILLS.map((skill) => [skill.name, skill.icon]));

export function getSkillIcon(name: string) {
    return iconsByName.get(ICON_ALIASES[name] ?? name);
}

export default function SkillBadges() {
    const [tab, setTab] = useState<(typeof TABS)[number]['label']>('All');
    const reduceMotion = useReducedMotion();
    const visible = tab === 'All' ? SKILLS : SKILLS.filter((skill) => skill.category === tab);

    return (
        <div>
            <div
                role="group"
                aria-label="Filter tech stack by category"
                className="flex gap-1 overflow-x-auto scrollbar-hide rounded-xl border border-theme-card-border bg-theme-card p-1.5"
            >
                {TABS.map(({ label, icon: Icon }) => {
                    const active = tab === label;
                    return (
                        <button
                            key={label}
                            type="button"
                            onClick={() => setTab(label)}
                            aria-pressed={active}
                            className={`relative flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3.5 py-2 text-sm md:text-[15px] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-primary ${active ? 'text-page' : 'text-theme-secondary hover:text-theme-primary'}`}
                        >
                            {active && (
                                <motion.span
                                    layoutId="tech-tab-pill"
                                    className="absolute inset-0 rounded-lg bg-theme-primary"
                                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                                    aria-hidden
                                />
                            )}
                            <Icon className="relative h-4 w-4 shrink-0" aria-hidden />
                            <span className="relative">{label}</span>
                        </button>
                    );
                })}
            </div>

            <ul className="mt-6 md:mt-8 flex flex-wrap gap-2.5 md:gap-3" aria-live="polite">
                <AnimatePresence mode="popLayout" initial={false}>
                    {visible.map((skill) => {
                        const Icon = skill.icon;
                        return (
                            <motion.li
                                key={skill.name}
                                layout={!reduceMotion}
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.92 }}
                                transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
                                className="flex items-center gap-2.5 rounded-lg border border-theme-card-border bg-theme-card px-3.5 py-2 text-sm md:text-[15px] text-theme-primary transition-colors duration-200 hover:border-transparent hover:bg-theme-primary hover:text-page"
                            >
                                <span className="flex shrink-0" style={skill.color ? { color: skill.color } : undefined} aria-hidden>
                                    <Icon className="h-[18px] w-[18px]" />
                                </span>
                                <span className="whitespace-nowrap" style={MONO}>{skill.name}</span>
                            </motion.li>
                        );
                    })}
                </AnimatePresence>
            </ul>
        </div>
    );
}
