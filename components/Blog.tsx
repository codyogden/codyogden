import BlogFeed from '@components/BlogFeed';
import Head from 'next/head';

export default function Blog({ posts }) {
    return (
        <>
            <Head>
                <title>Blog - Cody Ogden</title>
            </Head>
            <BlogFeed posts={posts} />
        </>
    );
}
