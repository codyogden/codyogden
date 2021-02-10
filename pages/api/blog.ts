import { defaultLimit, getPosts } from '@lib/blog';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await getPosts(+req.query.page, defaultLimit);
  return res.status(200).json({
    posts,
    meta: posts.meta
  });
};
