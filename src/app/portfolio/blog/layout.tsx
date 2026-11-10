import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Writing by Pratyaksh Krishnna on AI engineering, RAG systems, agents, and building LLM products.',
    alternates: { canonical: '/portfolio/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return children;
}
