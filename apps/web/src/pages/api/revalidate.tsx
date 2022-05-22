import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check for secret to confirm this is a valid request
    if (req.query.token !== process.env.ISR_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        let result = await res.unstable_revalidate(String(req.query.path));
        return res.json({ revalidated: true });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        console.log('req.query.path', req.query.path);
        console.log(err);
        return res.status(500).send('Error revalidating');
    }
}
