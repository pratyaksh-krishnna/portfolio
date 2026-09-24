'use client';

import {
    SiBun,
    SiCplusplus,
    SiDocker,
    SiExpress,
    SiFigma,
    SiFramer,
    SiGit,
    SiGithub,
    SiGreensock,
    SiJavascript,
    SiLeaflet,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPostman,
    SiPrisma,
    SiPython,
    SiReact,
    SiRedis,
    SiShadcnui,
    SiSwift,
    SiTailwindcss,
    SiTypescript
} from 'react-icons/si';

const ZustandIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="7" cy="6" r="3" />
        <circle cx="17" cy="6" r="3" />
        <circle cx="12" cy="14" r="8" />
        <circle cx="9" cy="13" r="1.2" fill="white" />
        <circle cx="15" cy="13" r="1.2" fill="white" />
        <path d="M9 17q3 2 6 0" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
);

const ConvexIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.08 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" />
    </svg>
);

const skills = [
    { name: 'React', icon: SiReact },
    { name: 'Next', icon: SiNextdotjs },
    { name: 'Express', icon: SiExpress },
    { name: 'Node', icon: SiNodedotjs },
    { name: 'Bun', icon: SiBun },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Redis', icon: SiRedis },
    { name: 'Prisma', icon: SiPrisma },
    { name: 'Zustand', icon: ZustandIcon },
    { name: 'Postman', icon: SiPostman },
    { name: 'Tailwind', icon: SiTailwindcss },
    { name: 'shadcn', icon: SiShadcnui },
    { name: 'Motion', icon: SiFramer },
    { name: 'GSAP', icon: SiGreensock },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Python', icon: SiPython },
    { name: 'Swift', icon: SiSwift },
    { name: 'C/C++', icon: SiCplusplus },
    { name: 'SQL', icon: SiMysql },
    { name: 'Git', icon: SiGit },
    { name: 'GitHub', icon: SiGithub },
    { name: 'Figma', icon: SiFigma },
    { name: 'Docker', icon: SiDocker },
    { name: 'Convex', icon: ConvexIcon },
    { name: 'Leaflet', icon: SiLeaflet },
];

type Skill = (typeof skills)[number];

const half = Math.ceil(skills.length / 2);
const rows: Skill[][] = [skills.slice(0, half), skills.slice(half)];

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
                    style={{ '--marquee-duration': `${row.length * 3}s` } as React.CSSProperties}
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
