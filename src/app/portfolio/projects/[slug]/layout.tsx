import type { Metadata } from 'next';
import { projects } from '@/data/projects';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);
    if (!project) return {};

    return {
        title: { absolute: `${project.title} | Pratyaksh Krishnna` },
        description: project.description,
        alternates: { canonical: `/portfolio/projects/${project.id}` },
    };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    return children;
}
