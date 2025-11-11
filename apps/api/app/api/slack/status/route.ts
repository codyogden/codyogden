import { NextRequest } from 'next/server';
import { WebClient } from '@slack/web-api';

const web = new WebClient(process.env.API__SLACK_WORK_SECRET);

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const emoji = searchParams.get('emoji');
    const text = searchParams.get('text');
    const expires = searchParams.get('expires');

    if (token === '') {
        return new Response(null, { status: 400 });
    }

    if (token !== process.env.API__TOKEN) {
        return new Response(null, { status: 401 });
    }

    if (!emoji && !text && !expires) {
        return new Response(null, { status: 400 });
    }

    await web.users.profile.set({
        profile: JSON.stringify({
            status_text: (text) || '',
            status_emoji: (emoji) ? `:${String(emoji)}:` : '',
            status_expiration: ((expires && Number(expires) && expires !== '0') && (emoji || text)) ? (Math.round(Date.now() / 1000)) + (Number(expires) * 60) : 0,
        }),
    });
    return new Response('ok', { status: 200 });
}

