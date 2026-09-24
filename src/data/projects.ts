import { Project } from '@/components/ProjectCard';

export const projects: Project[] = [
    {
        id: 'multi-modal-rag',
        title: 'multi-modal rag',
        description: 'An agentic RAG system that answers questions grounded in both text and images. Multi-query retrieval over vector search, async document ingestion with background workers, web search fallback, and RAGAS-based evaluation to keep hallucinations in check.',
        techStack: ['Next.js', 'Python', 'FastAPI', 'LangChain', 'Supabase', 'Redis', 'Celery', 'AWS S3'],
        status: 'Live',
        githubUrl: 'https://github.com/pratyaksh-krishnna/MULTI-MODAL-RAG',
        liveUrl: 'https://multi-modal-rag-pratyaksh.vercel.app',
        image: 'https://ik.imagekit.io/5wegcvcxp/Resume-Multi-modal-rag/Local-Architecture.png',
    },
    {
        id: 'reclaim',
        title: 'reclaim',
        description: 'A bounded multi-agent system for revenue recovery. It detects failed subscription payments and overdue invoices, diagnoses the cause, picks an intervention, executes it within strict policy limits, and proves real recovery against a randomized 10% holdout. Agents reason; deterministic code controls money.',
        techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'BullMQ', 'Claude'],
        status: 'Open Source',
        githubUrl: 'https://github.com/pratyaksh-krishnna/RECLAIM',
        image: 'https://github.com/user-attachments/assets/16a4b926-55ce-41ed-9eb0-d608b18ae4e4',
    },
    {
        id: 'class-recording-rag',
        title: 'class recording rag',
        description: 'A retrieval-augmented chat interface for class recordings. Ask a question and get an answer backed by timestamped transcript chunks you can jump straight back to.',
        techStack: ['Bun', 'React', 'TypeScript', 'Express', 'PostgreSQL', 'pgvector', 'Drizzle', 'OpenAI'],
        status: 'Open Source',
        githubUrl: 'https://github.com/pratyaksh-krishnna/class-recording-rag',
    },
    {
        id: 'notebook-llm',
        title: 'notebook llm',
        description: 'A NotebookLM-style research workspace. Organise documents and web pages into workspaces, chat with them through grounded, streaming answers, and turn your sources into study material.',
        techStack: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'Vercel AI SDK', 'Firecrawl'],
        status: 'Open Source',
        githubUrl: 'https://github.com/pratyaksh-krishnna/NOTEBOOK-LLM',
    },
    {
        id: 'ai-pitch-deck',
        title: 'ai pitch deck',
        description: 'An AI tool that turns a startup idea into a ready-to-present pitch deck. Currently in development.',
        techStack: [],
        status: 'In Progress',
        image: '/images/projects/in-progress.png',
    },
];
