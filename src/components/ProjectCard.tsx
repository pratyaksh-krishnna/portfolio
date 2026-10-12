'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useRef, type MouseEvent } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import GlowingEffect, { type GlowPalette } from './GlowingEffect';
import { getSkillIcon } from './SkillBadges';

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    status: 'Live' | 'In Progress' | 'Open Source';
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
    videoUrl?: string;
    postUrl?: string;
}

interface ProjectCardProps {
    project: Project;
    compact?: boolean;
}

// Monochrome border glow, white through to black.
const GLOW_COLORS: GlowPalette = ['#ffffff', '#a3a3a3', '#404040', '#000000'];
const linkHover = 'hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400';

const linkButton = 'inline-flex items-center gap-1.5 rounded-md border border-theme-badge-border bg-theme-badge-bg px-2 py-1 text-xs font-medium text-theme-badge-text transition-colors';

const monoFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" };

// How far (px) the photo drifts toward the cursor at the edge of the box.
const FOLLOW_PX = 14;
const FOLLOW_SPRING = { stiffness: 150, damping: 18, mass: 0.4 };
const VISIBLE_TAGS = 5;

const GRID_LINES =
    '[background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] ' +
    'dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.09)_1px,transparent_1px)] ' +
    '[background-size:24px_24px]';

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
    const cardLink = `/portfolio/projects/${project.id}?from=${compact ? 'projects' : 'home'}`;
    const cardPadding = compact ? 'p-4' : 'p-4 md:p-5';
    // Icon-only buttons where a text label would squeeze the title.
    const linkLabel = compact ? 'sr-only' : 'sr-only sm:not-sr-only';
    // The home page sizes match the rest of the wide home layout; the projects grid keeps the compact sizes.
    const titleSize = compact ? 'text-base' : 'text-base md:text-xl';
    const descriptionSize = compact ? 'text-sm leading-6' : 'text-sm leading-6 md:text-base md:leading-7';
    const tagSize = compact ? 'text-xs' : 'text-xs md:text-sm';

    const boxRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const followX = useMotionValue(0);
    const followY = useMotionValue(0);
    const x = useSpring(followX, FOLLOW_SPRING);
    const y = useSpring(followY, FOLLOW_SPRING);

    // Listens on the whole card because the title link's overlay sits above the photo box.
    const handleMouseMove = (event: MouseEvent) => {
        const box = boxRef.current;
        if (!box || reduceMotion) return;
        const rect = box.getBoundingClientRect();
        const clamp = (value: number) => Math.max(-1, Math.min(1, value));
        followX.set(clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2) * FOLLOW_PX);
        followY.set(clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2) * FOLLOW_PX);
    };

    const resetFollow = () => {
        followX.set(0);
        followY.set(0);
    };

    const visibleTags = project.techStack.slice(0, VISIBLE_TAGS);
    const hiddenTagCount = project.techStack.length - visibleTags.length;

    return (
        <div className="group relative h-full rounded-xl" onMouseMove={handleMouseMove} onMouseLeave={resetFollow}>
            <GlowingEffect spread={40} proximity={64} inactiveZone={0.01} borderWidth={2} colors={GLOW_COLORS} />
            <div className={`relative flex h-full flex-col rounded-xl border border-theme-card-border bg-theme-card ${cardPadding} transition-colors duration-300 group-hover:border-theme-card-hover-border`}>
                <div ref={boxRef} className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-200/70 dark:bg-neutral-950">
                    {/* Grid that fades out toward the top, lit by a spotlight rising from the bottom edge. */}
                    <div className={`absolute inset-0 ${GRID_LINES} [mask-image:radial-gradient(ellipse_90%_80%_at_50%_100%,black_20%,transparent_75%)]`} aria-hidden />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_100%,rgba(255,255,255,0.9),transparent)] dark:bg-[radial-gradient(ellipse_60%_55%_at_50%_100%,rgba(255,255,255,0.22),transparent)]" aria-hidden />

                    <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                        {project.image ? (
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                style={{ x, y }}
                                className="max-h-full max-w-full rounded-md object-contain shadow-2xl shadow-black/50"
                            />
                        ) : (
                            <motion.span
                                style={{ x, y, ...monoFont, fontWeight: 600 }}
                                className="px-6 text-center text-lg tracking-tight text-theme-secondary"
                            >
                                {project.title}
                            </motion.span>
                        )}
                    </div>

                    {project.status === 'In Progress' && (
                        <span className="absolute top-2.5 right-2.5 text-xs px-2 py-1 bg-blue-500/90 text-white rounded font-medium">
                            {project.status}
                        </span>
                    )}
                </div>

                <div className="mt-4 md:mt-5 flex flex-1 flex-col">
                    <div className="mb-2 flex items-center justify-between gap-3">
                        {/* The ::after overlay stretches this link across the whole card. */}
                        <a
                            href={cardLink}
                            className={`block min-w-0 truncate ${titleSize} tracking-tight text-theme-primary group-hover:text-theme-icon-hover after:absolute after:inset-0 after:z-10 after:content-['']`}
                            style={{ ...monoFont, fontWeight: 600 }}
                        >
                            {project.title}
                        </a>
                        {(project.githubUrl || project.liveUrl) && (
                            <div className="relative z-20 flex shrink-0 items-center gap-2">
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub" className={`${linkButton} ${linkHover}`}>
                                        <FaGithub className="h-3.5 w-3.5" aria-hidden />
                                        <span className={linkLabel}>GitHub</span>
                                        <span className="sr-only"> repository for {project.title}</span>
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Live site" className={`${linkButton} ${linkHover}`}>
                                        <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                                        <span className={linkLabel}>Live</span>
                                        <span className="sr-only"> site for {project.title}</span>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                    {/* Clamped so every card's tech stack starts at the same height; the full text is on the detail page. */}
                    <p className={`${descriptionSize} text-theme-muted mb-4 line-clamp-2`}>{project.description}</p>
                    {project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {visibleTags.map((tech) => {
                                const Icon = getSkillIcon(tech);
                                return (
                                    <span key={tech} className={`${tagSize} inline-flex items-center gap-1.5 rounded-full border border-theme-divider bg-theme-badge-bg px-2.5 py-1 text-theme-badge-text`}>
                                        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />}
                                        {tech}
                                    </span>
                                );
                            })}
                            {hiddenTagCount > 0 && (
                                <span className={`${tagSize} inline-flex items-center rounded-full border border-theme-divider bg-theme-badge-bg px-2.5 py-1 text-theme-badge-text`} title={project.techStack.slice(VISIBLE_TAGS).join(', ')}>
                                    +{hiddenTagCount}
                                </span>
                            )}
                        </div>
                    )}
                    <span className={`${compact ? 'text-sm' : 'text-sm md:text-base'} mt-auto self-start pt-4 inline-flex items-center gap-1.5 text-theme-muted transition-colors group-hover:text-theme-primary`}>
                        View Project
                        <FiArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    </span>
                </div>
            </div>
        </div>
    );
}
