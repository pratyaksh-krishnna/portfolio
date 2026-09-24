export interface Blog {
    id: string;
    title: string;
    url: string;
    date: string;
    claps: number;
    tags: string[];
}

export const blogs: Blog[] = [];
