import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'AI and full-stack projects by Pratyaksh Krishnna — RAG systems, multi-agent workflows, and LLM products.',
    alternates: { canonical: '/portfolio/projects' },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
