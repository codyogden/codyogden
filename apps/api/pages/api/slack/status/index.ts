import { NextApiHandler } from 'next';
import { WebClient } from '@slack/web-api';

const web = new WebClient(process.env.API__SLACK_WORK_SECRET);

const handler: NextApiHandler = async (req, res) => {
    const {
        token,
        emoji,
        text,
        expires,
    } = req.query;

    if (token === '') {
        return res.status(400).end();
    }

    if (token !== process.env.API__TOKEN) {
        return res.status(401).end();
    }

    if (!emoji && !text && !expires) {
        return res.status(400).end();
    }

    // await web.users.profile.set({
    //     profile: JSON.stringify({
    //         status_text: (text) || '',
    //         status_emoji: (emoji) ? `:${String(emoji)}:` : '',
    //         status_expiration: ((expires && Number(expires) && expires !== '0') && (emoji || text)) ? (Math.round(Date.now() / 1000)) + (Number(expires) * 60) : 0,
    //     }),
    // });
    // res.status(200).send('ok');
};

export default handler;
