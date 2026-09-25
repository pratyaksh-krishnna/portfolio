'use client';

import { FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import GlowingEffect, { type GlowPalette } from './GlowingEffect';
import Sparkles from './Sparkles';
import { useTheme } from './ThemeProvider';

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

// One accent for every card, matching the blue used by the experience timeline.
const GLOW_COLORS: GlowPalette = ['#93c5fd', '#60a5fa', '#3b82f6', '#1d4ed8'];
const linkHover = 'hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400';

const linkButton = 'inline-flex items-center gap-1.5 rounded-md border border-theme-badge-border bg-theme-badge-bg px-2 py-1 text-xs font-medium text-theme-badge-text transition-colors';

const monoFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" };

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
    const { theme } = useTheme();
    const cardLink = `/portfolio/projects/${project.id}?from=${compact ? 'projects' : 'home'}`;
    // The body shares the media's horizontal padding so text lines up with the image edge.
    const mediaPadding = compact ? 'p-5' : 'p-5 md:p-6';
    const bodyPadding = compact ? 'px-5 pb-5' : 'px-5 pb-5 md:px-6 md:pb-6';
    // The home page cards span the full column, so a wider crop keeps them from dominating the page.
    const mediaAspect = compact ? 'aspect-video' : 'aspect-[2/1]';
    // Icon-only buttons where a text label would squeeze the title.
    const linkLabel = compact ? 'sr-only' : 'sr-only sm:not-sr-only';

    return (
        <div className="group relative h-full rounded-xl transition-transform duration-300 hover:scale-[1.02]">
            <GlowingEffect spread={40} proximity={64} inactiveZone={0.01} borderWidth={2} colors={GLOW_COLORS} />
            <div className="relative flex h-full flex-col rounded-xl bg-theme-card border border-theme-card-border overflow-hidden group-hover:border-theme-card-hover-border group-hover:bg-theme-card-hover transition-colors duration-300">
                <div className={`relative ${mediaPadding}`}>
                    <Sparkles
                        className="absolute inset-0"
                        particleColor={theme === 'light' ? '#1a1a1a' : '#ffffff'}
                        minSize={0.4}
                        maxSize={1.2}
                        particleDensity={100}
                    />
                    <div className={`relative ${mediaAspect} overflow-hidden rounded-lg border border-theme-card-border shadow-2xl shadow-black/40`}>
                        {project.image ? (
                            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-theme-card bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_60%)]">
                                <span className="px-6 text-center text-lg tracking-tight text-theme-secondary" style={{ ...monoFont, fontWeight: 600 }}>
                                    {project.title}
                                </span>
                            </div>
                        )}
                        {project.status === 'In Progress' && (
                            <span className="absolute top-2.5 right-2.5 text-xs px-2 py-1 bg-blue-500/90 text-white rounded font-medium">
                                {project.status}
                            </span>
                        )}
                    </div>
                </div>
                <div className={`flex flex-1 flex-col ${bodyPadding}`}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                        {/* The ::after overlay stretches this link across the whole card. */}
                        <a
                            href={cardLink}
                            className="block min-w-0 truncate text-base tracking-tight text-theme-primary group-hover:text-theme-icon-hover after:absolute after:inset-0 after:z-10 after:content-['']"
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
                    <p className="text-sm leading-6 text-theme-muted mb-4 line-clamp-3">{project.description}</p>
                    {project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span key={tech} className="text-xs px-2 py-1 bg-theme-badge-bg text-theme-badge-text rounded border border-theme-divider">{tech}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
