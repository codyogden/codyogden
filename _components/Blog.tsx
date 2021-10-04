import BlogFeed from '_components/BlogFeed';
import Head from 'next/head';
import { PostOrPage } from '@tryghost/content-api';

interface Props {
    posts: PostOrPage[]
}

export default function Blog({ posts }: Props) {
    return (
        <>
            <Head>
                <title>Blog - Cody Ogden</title>
            </Head>
            <BlogFeed posts={posts} />
        </>
    );
}
