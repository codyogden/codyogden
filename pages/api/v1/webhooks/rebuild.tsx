import type { NextApiRequest, NextApiResponse } from 'next';
import { createApiClient } from 'dots-wrapper';

type Data = {
    status: number
}

type Error = {
    error: {
        code: Number
        message: String
    }
}

export default async (req: NextApiRequest, res: NextApiResponse<Data|Error>) => {
    const query = req.query;
    const dots = createApiClient({ token: process.env.DO_ACCESS_TOKEN });
    const { data: { deployment } } = await dots.app.createAppDeployment({
        app_id: process.env.DO_APP_ID,
        force_build: true,
    });
    if(process.env.NEXT_WEBHOOK_SECERT !== query.token)
        return res.status(401).json({
            error: {
                code: 401,
                message: 'Not Authorized',
            },
        });
    res.status(200).json({
        status: 200
    });
}
