import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const SITE_URL = 'https://www.pratyakshworks.com';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: `${SITE_URL}/portfolio`, changeFrequency: 'monthly', priority: 1 },
        { url: `${SITE_URL}/portfolio/projects`, changeFrequency: 'monthly', priority: 0.8 },
        ...projects.map((project) => ({
            url: `${SITE_URL}/portfolio/projects/${project.id}`,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        })),
    ];
}
