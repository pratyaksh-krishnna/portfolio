'use client';

import ProjectCard from '@/components/ProjectCard';
import ThemeToggle from '@/components/ThemeToggle';
import { projects } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectsPage() {
    const headingFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace", fontWeight: 600 };
    const geistMonoFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" };

    return (
        <div className="min-h-screen text-page-text overflow-x-clip relative z-[2]" style={geistMonoFont}>
            <nav className="page-enter fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <div
                    className="flex items-center gap-8 px-6 py-3 rounded-xl"
                    style={{
                        background: 'var(--theme-nav-bg)',
                        backdropFilter: 'blur(32px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(32px) saturate(150%)',
                        border: '1px solid var(--theme-nav-border)',
                        boxShadow: 'var(--theme-nav-shadow)',
                    }}
                >
                    <Link href="/portfolio" className="hover:scale-105 transition-transform shrink-0">
                        <Image src="/images/avatar.jpg" alt="Avatar" width={32} height={32} className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-sm object-cover cursor-pointer" />
                    </Link>
                    <Link href="/portfolio/projects" className="text-sm text-theme-secondary hover:text-theme-primary transition-colors">
                        projects
                    </Link>
                    <ThemeToggle />
                </div>
            </nav>
            <main className="page-enter relative">

                <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                    <div className="mb-10">
                        <Link href="/portfolio#projects" className="text-theme-primary hover:text-theme-icon-hover transition-colors inline-flex items-center gap-2 group">
                            <svg className="w-4 h-4 back-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                            <span className="text-2xl tracking-wider" style={headingFont}>Projects</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} compact />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
