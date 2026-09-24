import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const views = await kv.incr('portfolio_views');
        return NextResponse.json({ views });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to increment views', views: 0 }, 
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const views = await kv.get('portfolio_views') || 0;
        return NextResponse.json({ views });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to get views', views: 0 }, 
            { status: 500 }
        );
    }
}
