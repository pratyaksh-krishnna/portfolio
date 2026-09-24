'use client';

import type { ComponentType, CSSProperties } from 'react';
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

type Skill = { name: string; icon: ComponentType<IconProps> };

const aiSkills: Skill[] = [
    { name: 'LangChain', icon: SiLangchain },
    { name: 'LangGraph', icon: LangGraphIcon },
    { name: 'OpenAI', icon: SiOpenai },
    { name: 'Claude', icon: SiClaude },
    { name: 'Ollama', icon: SiOllama },
    { name: 'pgvector', icon: PgvectorIcon },
    { name: 'Supabase', icon: SiSupabase },
    { name: 'FastAPI', icon: SiFastapi },
    { name: 'Celery', icon: SiCelery },
    { name: 'Zod', icon: SiZod },
    { name: 'Python', icon: SiPython },
    { name: 'Postman', icon: SiPostman },
];

const backendSkills: Skill[] = [
    { name: 'Node', icon: SiNodedotjs },
    { name: 'Express', icon: SiExpress },
    { name: 'Bun', icon: SiBun },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Redis', icon: SiRedis },
    { name: 'BullMQ', icon: BullMQIcon },
    { name: 'Kafka', icon: SiApachekafka },
    { name: 'Socket.IO', icon: SiSocketdotio },
    { name: 'Prisma', icon: SiPrisma },
    { name: 'Drizzle', icon: SiDrizzle },
    { name: 'Docker', icon: SiDocker },
    { name: 'Nginx', icon: SiNginx },
    { name: 'AWS', icon: SiAmazonwebservices },
    { name: 'GCP', icon: SiGooglecloud },
    { name: 'BigQuery', icon: SiGooglebigquery },
];

const frontendSkills: Skill[] = [
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'React', icon: SiReact },
    { name: 'Next', icon: SiNextdotjs },
    { name: 'Vite', icon: SiVite },
    { name: 'TanStack', icon: TanStackIcon },
    { name: 'Tailwind', icon: SiTailwindcss },
    { name: 'shadcn', icon: SiShadcnui },
    { name: 'SQL', icon: SiMysql },
    { name: 'C/C++', icon: SiCplusplus },
    { name: 'Rust', icon: SiRust },
    { name: 'Linux', icon: SiLinux },
    { name: 'Git', icon: SiGit },
    { name: 'GitHub', icon: SiGithub },
    { name: 'GitHub Actions', icon: SiGithubactions },
];

const rows: Skill[][] = [aiSkills, backendSkills, frontendSkills];

function LogoGroup({ items, hidden = false }: { items: Skill[]; hidden?: boolean }) {
    return (
        <ul className="marquee-group flex shrink-0 items-center" aria-hidden={hidden || undefined}>
            {items.map((skill) => {
                const Icon = skill.icon;
                return (
                    <li
                        key={skill.name}
                        className="flex items-center gap-2 pr-10 text-theme-muted hover:text-theme-primary transition-colors"
                    >
                        <Icon className="w-6 h-6 shrink-0" aria-hidden />
                        <span className="text-sm whitespace-nowrap">{skill.name}</span>
                    </li>
                );
            })}
        </ul>
    );
}

export default function SkillBadges() {
    return (
        <div className="flex flex-col gap-5">
            {rows.map((row, i) => (
                <div
                    key={i}
                    className={`marquee py-1 ${i % 2 === 1 ? 'marquee-reverse' : ''}`}
                    style={{ '--marquee-duration': `${row.length * 3}s` } as CSSProperties}
                >
                    <div className="marquee-track">
                        <LogoGroup items={row} />
                        <LogoGroup items={row} hidden />
                    </div>
                </div>
            ))}
        </div>
    );
}
