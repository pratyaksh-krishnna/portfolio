export interface Experience {
    id: string;
    company: string;
    role: string;
    type: 'Full-time' | 'Internship' | 'Freelance' | 'Contract';
    location: string;
    start: string;
    end: string | 'Present';
    logo?: string;
    highlights: string[];
    tags: string[];
}

export const experience: Experience[] = [
    {
        id: 'stealth',
        company: 'Stealth Mode',
        role: 'AI Engineer',
        type: 'Full-time',
        location: 'Remote',
        start: '2026-08',
        end: 'Present',
        highlights: [],
        tags: [],
    },
    {
        id: 'hoonartek',
        company: 'Hoonartek',
        role: 'Software Engineer Intern',
        type: 'Internship',
        location: 'Remote',
        start: '2026-06',
        end: '2026-07',
        highlights: [
            'Shipped a natural-language analytics agent on BigQuery Conversational Analytics for logistics client XpressBees, so business users could query profitability and lane performance without writing SQL.',
            'Built an event-driven ingestion pipeline (GCS → Eventarc → Cloud Run → BigQuery) that auto-loads 6 monthly parquet feeds, with per-file logging and error-folder routing.',
            'Scoped the agent to 4 purpose-built semantic views and wrote guardrails that block PII exposure, hallucination and out-of-scope answers.',
            'Enforced IAM role-based access and Cloud Logging across the pipeline, and authored the end-to-end SOP now used by the client’s teams.',
        ],
        tags: ['GCP', 'BigQuery', 'Cloud Run', 'Eventarc', 'SQL', 'LLM guardrails'],
    },
];
