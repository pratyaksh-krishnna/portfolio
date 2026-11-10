'use client';

import FloatingNav from '@/components/FloatingNav';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import Link from 'next/link';

export default function ProjectsPage() {
    const headingFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace", fontWeight: 600 };
    const geistMonoFont = { fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace" };

    return (
        <div className="min-h-screen text-page-text overflow-x-clip relative z-[2]" style={geistMonoFont}>
            <FloatingNav />
            <main className="page-enter relative">

                <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                    <div className="mb-10">
                        <Link href="/portfolio#projects" className="text-theme-primary hover:text-theme-icon-hover transition-colors inline-flex items-center gap-2 group">
                            <svg className="w-4 h-4 back-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                            <span className="section-heading" style={headingFont}>Projects</span>
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
