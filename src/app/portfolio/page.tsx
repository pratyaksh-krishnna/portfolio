'use client';

import BlogCard from '@/components/BlogCard';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import FlipName from '@/components/FlipName';
import GitHubContributions from '@/components/GitHubContributions';
import PhotoBooth from '@/components/PhotoBooth';
import ProjectCard from '@/components/ProjectCard';
import RotatingTitle from '@/components/RotatingTitle';
import SkillBadges from '@/components/SkillBadges';
import SmoothScroll from '@/components/SmoothScroll';
import NavLinks from '@/components/NavLinks';
import ThemeToggle from '@/components/ThemeToggle';
import VisitorCounter from '@/components/VisitorCounter';
import { blogs } from '@/data/blogs';
import { experience } from '@/data/experience';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { type ReactNode } from 'react';

const CALENDLY_URL = 'https://calendly.com/pratyaksh-krish/30min';
const RESUME_URL = '/resume.pdf';
const BOOTH_PHOTO = { src: '/images/booth/dublin.webp', alt: 'Pratyaksh on a street lit with holiday lights at night', position: '50% 60%', zoom: 1.3, focus: '45% 62%' };
const PILL_BUTTON = 'inline-flex items-center gap-2 rounded-full border border-theme-badge-border hover:border-theme-card-hover-border bg-theme-badge-bg hover:bg-theme-card-hover px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base text-theme-primary hover:text-theme-icon-hover shadow-[var(--theme-action-shadow)] hover:shadow-[var(--theme-action-hover-shadow)] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-primary';
const SOCIAL_LINK = 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-theme-divider bg-page/80 text-theme-secondary hover:text-theme-icon-hover hover:border-theme-card-hover-border hover:bg-theme-card-hover hover:-translate-y-0.5 transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-primary';

function Row({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className="border-b border-theme-divider">
            <div className={`plus-marks max-w-6xl mx-auto border-x border-theme-divider bg-page/80 md:bg-page/95 ${className}`}>{children}</div>
        </div>
    );
}

// A thin divider band: the dot grid in the side gutters, the content column left plain.
function DotBand() {
    return (
        <div aria-hidden className="band-dots border-b border-theme-divider">
            <div className="plus-marks max-w-6xl mx-auto border-x border-theme-divider bg-page h-9" />
        </div>
    );
}

// Opens a section: a plain heading row inside the column, with the dot grid only in the side gutters.
function SectionHeader({ title, aside }: { title: string; aside?: ReactNode }) {
    return (
        <div className="band-dots border-b border-theme-divider">
            <div className="plus-marks max-w-6xl mx-auto border-x border-theme-divider bg-page px-6 md:px-16 py-4 md:py-5 flex items-baseline justify-between gap-4">
                <h2
                    className="section-heading text-theme-primary"
                    style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace", fontWeight: 600 }}
                >
                    {title}
                </h2>
                {aside && <p className="hidden sm:block text-xs md:text-sm tracking-wide text-theme-faint">{aside}</p>}
            </div>
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
    const headingFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace", fontWeight: 600 };
    const geistMonoFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" };
    const quoteFont = { fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif" };

    return (
        <SmoothScroll>
            <div className="min-h-screen text-page-text overflow-x-clip relative z-[2]" style={geistMonoFont}>
                <div aria-hidden className="fixed inset-0 -z-10 bg-page" />
                <main className="page-enter relative">

                    <header className="border-b border-theme-divider">
                        <nav
                            aria-label="Main"
                            className="plus-marks max-w-6xl mx-auto border-x border-theme-divider bg-page h-14 md:h-16 px-6 md:px-16 grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] items-center gap-4"
                        >
                            {/* Phones: links on the left. Desktop: links in the true centre, the empty first column balancing the controls on the right. */}
                            <span aria-hidden className="hidden md:block" />
                            <NavLinks />
                            <div className="flex items-center justify-end gap-3">
                                <VisitorCounter />
                                <ThemeToggle />
                            </div>
                        </nav>
                    </header>

                    <Row className="px-6 md:px-16 pt-8 md:pt-16 pb-12 md:pb-20">
                        <section id="about">
                            {/* Phones: photo booth, then text, then resume/socials. Desktop: text on the left, booth and resume/socials stacked on the right. */}
                            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-4 items-start">
                                <div className="flex flex-col items-start min-w-0 lg:row-span-2">
                                    <FlipName
                                        name="Pratyaksh Krishnna"
                                        className="text-[1.35rem] sm:text-2xl md:text-[2rem] text-theme-primary tracking-wide mb-2"
                                        style={headingFont}
                                    />
                                    <RotatingTitle />
                                    <h2 className="section-heading mt-8 md:mt-10 leading-snug text-theme-primary" style={headingFont}>
                                        Building AI-native products, from prototype to production.
                                    </h2>
                                    <div className="mt-4 md:mt-5 text-theme-secondary text-[15px] md:text-lg leading-7 md:leading-[1.8] space-y-4 md:space-y-5">
                                        <p>
                                            I&apos;m Pratyaksh Krishnna, an <span className="text-theme-primary">AI engineer</span> focused on building
                                            intelligent systems that are{' '}
                                            <span className="text-theme-primary">useful beyond the demo stage</span>.
                                        </p>
                                        <p>
                                            My work spans <span className="text-theme-primary">RAG</span>,{' '}
                                            <span className="text-theme-primary">AI agents</span>,{' '}
                                            <span className="text-theme-primary">multi-agent workflows</span>, backend systems, and
                                            full-stack product development.
                                        </p>
                                        <p>
                                            I work across Python, TypeScript, Node.js, React, PostgreSQL, pgvector, LangChain, and
                                            LangGraph.
                                        </p>
                                        <p>
                                            <span className="text-theme-primary">Open to work</span>: Full-time, freelance, or collabs.{' '}
                                            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-theme-primary underline underline-offset-4 hover:text-theme-icon-hover">
                                                Let&apos;s talk.
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="order-first mx-auto w-[85%] sm:w-full lg:order-none lg:col-start-2 lg:row-start-1">
                                    <PhotoBooth photo={BOOTH_PHOTO} />
                                </div>
                                <div className="lg:col-start-2 lg:row-start-2">
                                    <div className="flex items-center justify-between gap-3">
                                        <a
                                            href={RESUME_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`group ${PILL_BUTTON}`}
                                        >
                                            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Resume
                                        </a>
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <a href="https://x.com/pratyaksh_k" target="_blank" rel="noopener noreferrer" className={SOCIAL_LINK} title="X/Twitter" aria-label="X/Twitter profile">
                                                <svg className="w-[18px] h-[18px] md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                            </a>
                                            <a href="https://www.linkedin.com/in/pratyaksh-krishnna/" target="_blank" rel="noopener noreferrer" className={SOCIAL_LINK} title="LinkedIn" aria-label="LinkedIn profile">
                                                <svg className="w-[18px] h-[18px] md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                            </a>
                                            <a href="https://github.com/pratyaksh-krishnna" target="_blank" rel="noopener noreferrer" className={SOCIAL_LINK} title="GitHub" aria-label="GitHub profile">
                                                <svg className="w-[18px] h-[18px] md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 md:mt-16">
                                <GitHubContributions username="pratyaksh-krishnna" />
                            </div>
                        </section>
                    </Row>

                    <section id="experience">
                        <SectionHeader title="Experience" />
                        <Row className="px-6 md:px-16 py-10 md:py-14">
                            <ExperienceTimeline items={experience} />
                        </Row>
                    </section>

                    <section id="projects">
                        <SectionHeader title="Projects" />
                        <Row className="px-6 md:px-16 py-10 md:py-14">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {projects.slice(0, 2).map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                            <ViewAllLink href="/portfolio/projects" />
                        </Row>
                    </section>

                    <section id="skills">
                        <SectionHeader title="Tech Stack" aside="( select tab to filter )" />
                        <Row className="px-6 md:px-16 py-10 md:py-14">
                            <SkillBadges />
                        </Row>
                    </section>

                    {blogs.length > 0 && (
                        <section id="blog">
                            <SectionHeader title="Blogs" />
                            <Row className="px-6 md:px-16 py-10 md:py-14">
                                <div className="space-y-4">
                                    {blogs.map((blog) => (
                                        <BlogCard key={blog.id} blog={blog} />
                                    ))}
                                </div>
                            </Row>
                        </section>
                    )}

                    <DotBand />
                    <Row className="px-6 md:px-16 py-16 md:py-24">
                        <figure className="text-center" style={quoteFont}>
                            <span aria-hidden className="block text-4xl md:text-5xl leading-none text-theme-faint">&ldquo;</span>
                            <blockquote className="mt-1 text-3xl md:text-[2.75rem] leading-tight italic text-theme-muted">
                                inside, i&apos;m infinite.
                            </blockquote>
                        </figure>
                    </Row>
                    <DotBand />
                </main>

                <footer>
                    <Row className="px-6 md:px-16 py-10 md:py-12 text-center">
                        <p className="text-sm md:text-base text-theme-secondary">
                            Designed &amp; Developed by <span className="font-semibold text-theme-primary">Pratyaksh Krishnna</span>
                        </p>
                        <p className="mt-2 text-xs md:text-sm text-theme-faint" suppressHydrationWarning>
                            &copy; {new Date().getFullYear()} All rights reserved.
                        </p>
                    </Row>
                </footer>
            </div>
        </SmoothScroll>
    );
}
