import { createClient, type VercelKV } from '@vercel/kv';
import { NextResponse } from 'next/server';

const KEY = 'portfolio_views';

function findEnv(suffixes: string[]) {
    const name = Object.keys(process.env).find((key) => suffixes.some((suffix) => key.endsWith(suffix)));
    return name ? process.env[name] : undefined;
}

let client: VercelKV | null = null;

function getClient() {
    if (client) return client;
    const url = findEnv(['KV_REST_API_URL', 'REDIS_REST_URL']);
    const token = findEnv(['KV_REST_API_TOKEN', 'REDIS_REST_TOKEN']);
    if (!url || !token) return null;
    client = createClient({ url, token });
    return client;
}

function notConfigured() {
    return NextResponse.json(
        { error: 'View counter storage is not configured: missing REST URL or token env vars', views: 0 },
        { status: 503 }
    );
}

export async function POST() {
    const kv = getClient();
    if (!kv) return notConfigured();
    try {
        const views = await kv.incr(KEY);
        return NextResponse.json({ views });
    } catch (error) {
        console.error('Failed to increment views:', error);
        return NextResponse.json({ error: 'Failed to increment views', views: 0 }, { status: 500 });
    }
}

export async function GET() {
    const kv = getClient();
    if (!kv) return notConfigured();
    try {
        const views = (await kv.get<number>(KEY)) ?? 0;
        return NextResponse.json({ views });
    } catch (error) {
        console.error('Failed to get views:', error);
        return NextResponse.json({ error: 'Failed to get views', views: 0 }, { status: 500 });
    }
}
