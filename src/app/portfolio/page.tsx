'use client';

import AgeCounter from '@/components/AgeCounter';
import BlogCard from '@/components/BlogCard';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import GitHubContributions from '@/components/GitHubContributions';
import ProjectCard from '@/components/ProjectCard';
import RotatingTitle from '@/components/RotatingTitle';
import SkillBadges from '@/components/SkillBadges';
import SmoothScroll from '@/components/SmoothScroll';
import ThemeToggle from '@/components/ThemeToggle';
import VisitorCounter from '@/components/VisitorCounter';
import { blogs } from '@/data/blogs';
import { experience } from '@/data/experience';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';

const CALENDLY_URL = 'https://calendly.com/pratyaksh-krish/30min';
const RESUME_URL = '/resume.pdf';

function Row({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className="border-b border-theme-divider">
            <div className={`plus-marks max-w-5xl mx-auto border-x border-theme-divider bg-page ${className}`}>{children}</div>
        </div>
    );
}

function Band({ className = 'h-12 md:h-16' }: { className?: string }) {
    return (
        <div className="border-b border-theme-divider">
            <div className={`plus-marks max-w-5xl mx-auto border-x border-theme-divider ${className}`} />
        </div>
    );
}

function ViewAllLink({ href }: { href: string }) {
    return (
        <div className="flex justify-center mt-8">
            <Link
                href={href}
                className="group text-sm text-theme-muted hover:text-theme-primary px-4 py-2 rounded-lg border border-theme-divider hover:border-theme-card-hover-border hover:bg-theme-card transition-all flex items-center gap-2"
            >
                <span className="animated-underline">View All</span>
                <svg className="w-4 h-4 view-all-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
            </Link>
        </div>
    );
}

export default function PortfolioPage() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const headingFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace", fontWeight: 600 };
    const geistMonoFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" };

    return (
        <SmoothScroll>
            <div className="blueprint min-h-screen text-page-text overflow-y-auto overflow-x-hidden relative z-[2]" style={geistMonoFont}>
                <main
                    className="relative transition-all duration-700 ease-out"
                    style={{
                        filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? 'scale(1)' : 'scale(1.02)',
                    }}
                >
                    <Band className="h-20 md:h-28" />

                    <Row className="px-6 md:px-10 py-8 md:py-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                            <div className="flex items-center gap-5 md:gap-6 flex-1 min-w-0">
                                <div className="shrink-0 p-1 rounded-2xl border border-theme-divider bg-theme-card">
                                    <img
                                        src="/images/avatar.jpg"
                                        alt="Pratyaksh Krishnna"
                                        className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <h1 className="text-2xl md:text-3xl text-theme-primary tracking-wide mb-1" style={headingFont}>
                                        Pratyaksh Krishnna
                                    </h1>
                                    <RotatingTitle />
                                    <AgeCounter />
                                    <div className="flex items-center gap-4 mt-3 text-theme-muted">
                                        <a href="https://x.com/pratyaksh_k" target="_blank" rel="noopener noreferrer" className="hover:text-theme-icon-hover transition-colors" title="X/Twitter">
                                            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                        </a>
                                        <a href="https://www.linkedin.com/in/pratyaksh-krishnna/" target="_blank" rel="noopener noreferrer" className="hover:text-theme-icon-hover transition-colors" title="LinkedIn">
                                            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                        </a>
                                        <a href="https://github.com/pratyaksh-krishnna" target="_blank" rel="noopener noreferrer" className="hover:text-theme-icon-hover transition-colors" title="GitHub">
                                            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                                <div className="flex items-center gap-3">
                                    <VisitorCounter />
                                    <ThemeToggle />
                                </div>
                                <a
                                    href={CALENDLY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-[0_0_0_1px_rgba(96,165,250,0.4),0_6px_20px_-6px_rgba(37,99,235,0.6)] transition-colors"
                                >
                                    Hire me
                                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </Row>

                    <Row className="px-6 md:px-10 py-12 md:py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
                            <div className="flex flex-col items-start gap-6">
                                <h2 className="text-2xl md:text-[1.75rem] leading-snug text-theme-primary tracking-tight" style={headingFont}>
                                    Building AI-native products, from zero to one.
                                </h2>
                                <a
                                    href={RESUME_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-theme-card-border hover:border-theme-card-hover-border bg-theme-card hover:bg-theme-card-hover text-theme-badge-text hover:text-theme-primary text-sm font-medium transition-colors"
                                >
                                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Resume
                                </a>
                            </div>
                            <div className="text-theme-secondary text-[15px] leading-7 space-y-4">
                                <p>
                                    <span className="text-theme-primary">AI-native software engineer</span> who builds
                                    full-stack applications and agentic systems, including{' '}
                                    <span className="text-theme-primary">multi-agent workflows</span> and{' '}
                                    <span className="text-theme-primary">RAG pipelines</span>.
                                </p>
                                <p>
                                    I take products from <span className="text-theme-primary">zero to one</span>: I turn
                                    ambiguous problems into clear requirements, sound system designs, and
                                    production-ready software.
                                </p>
                                <p>
                                    AI speeds up how I build. Product judgment, architecture, code quality, and
                                    maintainability <span className="text-theme-primary">stay with me</span>.
                                </p>
                            </div>
                        </div>
                    </Row>

                    <Band />

                    <Row className="px-6 md:px-10 py-12">
                        <section id="experience">
                            <h2 className="text-2xl mb-8 tracking-wider" style={headingFont}>Experience</h2>
                            <ExperienceTimeline items={experience} />
                        </section>
                    </Row>

                    <Band />

                    <Row className="px-6 md:px-10 py-12">
                        <h2 className="text-2xl mb-8 tracking-wider" style={headingFont}>Skills</h2>
                        <SkillBadges />
                    </Row>

                    <Band />

                    <Row className="px-6 md:px-10 py-12">
                        <section id="projects">
                            <h2 className="text-2xl mb-8 tracking-wider" style={headingFont}>Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {projects.slice(0, 2).map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                            <ViewAllLink href="/portfolio/projects" />
                        </section>
                    </Row>

                    <Band />

                    <Row className="px-6 md:px-10 py-12">
                        <section>
                            <h2 className="text-2xl mb-8 tracking-wider" style={headingFont}>Stats</h2>
                            <GitHubContributions username="pratyaksh-krishnna" />
                        </section>
                    </Row>

                    {blogs.length > 0 && (
                        <>
                            <Band />

                            <Row className="px-6 md:px-10 py-12">
                                <section id="blog">
                                    <h2 className="text-2xl mb-8 tracking-wider" style={headingFont}>Blogs</h2>
                                    <div className="space-y-4">
                                        {blogs.map((blog) => (
                                            <BlogCard key={blog.id} blog={blog} />
                                        ))}
                                    </div>
                                </section>
                            </Row>
                        </>
                    )}

                    <Band />

                    <Row>
                        <div className="relative">
                            <div
                                className="absolute inset-0 pointer-events-none z-10"
                                style={{
                                    background: `linear-gradient(to bottom, var(--theme-gradient-overlay) 0%, transparent 30%, transparent 70%, var(--theme-gradient-overlay) 100%)`
                                }}
                            />
                            <img
                                src="/images/vagabond-mountains.jpg"
                                alt="Vagabond - Mountains"
                                className="w-full h-56 object-cover object-center opacity-60"
                            />
                            <p
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-theme-muted text-lg tracking-wider z-20 whitespace-nowrap"
                                style={{ fontFamily: "var(--font-dancing), 'Dancing Script', cursive" }}
                            >
                                &ldquo;inside, i&apos;m infinite&rdquo;
                            </p>
                        </div>
                    </Row>

                    <Band className="h-20 md:h-28" />
                </main>
            </div>
        </SmoothScroll>
    );
}
