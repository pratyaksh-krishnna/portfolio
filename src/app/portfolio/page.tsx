'use client';

import AgeCounter from '@/components/AgeCounter';
import BlogCard from '@/components/BlogCard';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import FlipName from '@/components/FlipName';
import GitHubContributions from '@/components/GitHubContributions';
import PhotoBooth from '@/components/PhotoBooth';
import ProjectCard from '@/components/ProjectCard';
import RotatingTitle from '@/components/RotatingTitle';
import SkillBadges from '@/components/SkillBadges';
import SmoothScroll from '@/components/SmoothScroll';
import StatusBar, { StealthPill } from '@/components/StatusBar';
import ThemeToggle from '@/components/ThemeToggle';
import VisitorCounter from '@/components/VisitorCounter';
import { blogs } from '@/data/blogs';
import { experience } from '@/data/experience';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';

const CALENDLY_URL = 'https://calendly.com/pratyaksh-krish/30min';
const RESUME_URL = '/resume.pdf';
const BOOTH_PHOTOS = [
    { src: '/images/booth/dublin.webp', alt: 'Pratyaksh on a street lit with holiday lights at night', position: '50% 60%', zoom: 1.3, focus: '45% 62%' },
    { src: '/images/booth/mountains.webp', alt: 'Pratyaksh standing on a rock above green hills', position: '50% 62%', thumbPosition: '50% 0%' },
    { src: '/images/booth/valley.webp', alt: 'Pratyaksh looking out over a mountain valley', position: '50% 62%' },
];
const PILL_BUTTON = 'inline-flex items-center gap-2 rounded-full border border-white/25 hover:border-white/50 bg-black/35 hover:bg-black/50 px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base text-white/80 hover:text-white shadow-[0_0_14px_rgba(255,255,255,0.22)] hover:shadow-[0_0_22px_rgba(255,255,255,0.4)] transition';

function Row({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className="border-b border-white/15">
            <div className={`plus-marks max-w-6xl mx-auto border-x border-white/15 bg-page/80 md:bg-page/95 ${className}`}>{children}</div>
        </div>
    );
}

function Band({ className = 'h-12 md:h-16', children }: { className?: string; children?: ReactNode }) {
    return (
        <div className="border-b border-white/15">
            <div className={`plus-marks max-w-6xl mx-auto border-x border-white/15 ${className}`}>{children}</div>
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
            <div className="min-h-screen text-page-text overflow-x-clip relative z-[2]" style={geistMonoFont}>
                <div aria-hidden className="fixed inset-0 -z-10 bg-cover bg-center will-change-transform" style={{ backgroundImage: 'url(/images/background-ocean.webp)' }} />
                <main
                    className="relative transition-all duration-700 ease-out"
                    style={{
                        filter: isLoaded ? 'none' : 'blur(20px)',
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? 'none' : 'scale(1.02)',
                    }}
                >
                    {/* Phones skip the status band; the Stealth pill moves into the hero row instead. */}
                    <div className="hidden md:block">
                        <Band className="h-28">
                            <StatusBar />
                        </Band>
                    </div>

                    <Row className="px-6 md:px-16 pt-20 pb-12 md:pt-24 md:pb-20">
                        <div className="absolute top-5 left-6 md:hidden">
                            <StealthPill />
                        </div>
                        <div className="absolute top-5 right-6 md:top-7 md:right-16 flex items-center gap-3">
                            <VisitorCounter />
                            <ThemeToggle />
                        </div>
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
                                    <AgeCounter />
                                    <h2 className="mt-8 md:mt-10 text-xl md:text-[1.6rem] leading-snug text-theme-primary tracking-tight" style={headingFont}>
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
                                <div className="order-first lg:order-none lg:col-start-2 lg:row-start-1">
                                    <PhotoBooth photos={BOOTH_PHOTOS} />
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
                                        <div className="flex items-center gap-4 md:gap-5 text-theme-muted">
                                            <a href="https://x.com/pratyaksh_k" target="_blank" rel="noopener noreferrer" className="hover:text-theme-icon-hover transition-colors" title="X/Twitter">
                                                <svg className="w-[18px] h-[18px] md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                            </a>
                                            <a href="https://www.linkedin.com/in/pratyaksh-krishnna/" target="_blank" rel="noopener noreferrer" className="hover:text-theme-icon-hover transition-colors" title="LinkedIn">
                                                <svg className="w-[18px] h-[18px] md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                            </a>
                                            <a href="https://github.com/pratyaksh-krishnna" target="_blank" rel="noopener noreferrer" className="hover:text-theme-icon-hover transition-colors" title="GitHub">
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

                    <Band />

                    <Row className="px-6 md:px-16 py-12 md:py-16">
                        <section id="experience">
                            <h2 className="text-2xl md:text-4xl mb-8 md:mb-12 tracking-wide" style={headingFont}>Experience</h2>
                            <ExperienceTimeline items={experience} />
                        </section>
                    </Row>

                    <Band />

                    <Row className="px-6 md:px-16 py-12 md:py-16">
                        <h2 className="text-2xl md:text-4xl mb-8 md:mb-12 tracking-wide" style={headingFont}>Skills</h2>
                        <SkillBadges />
                    </Row>

                    <Band />

                    <Row className="px-6 md:px-16 py-12 md:py-16">
                        <section id="projects">
                            <h2 className="text-2xl md:text-4xl mb-8 md:mb-12 tracking-wide" style={headingFont}>Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {projects.slice(0, 2).map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                            <ViewAllLink href="/portfolio/projects" />
                        </section>
                    </Row>

                    {blogs.length > 0 && (
                        <>
                            <Band />

                            <Row className="px-6 md:px-16 py-12 md:py-16">
                                <section id="blog">
                                    <h2 className="text-2xl md:text-4xl mb-8 md:mb-12 tracking-wide" style={headingFont}>Blogs</h2>
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
                                className="w-full h-56 md:h-80 object-cover object-center opacity-60"
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
