import BlogGrid from '@components/BlogGrid';
import { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { HeadlessResponse } from 'src/types/headless';
import fetcher from 'src/utils/fetcher';

import { Post } from '../../types/wordpress';

interface BlogRollProps {
    posts: HeadlessResponse<Post>;
}

const BlogRoll: NextPage<BlogRollProps> = ({
    posts
}) => {
    return <>
        <Head>
            <title>Blog - Cody Ogden</title>
            <meta name="description" content="Cody Ogden's blog." />
        </Head>
        <BlogGrid
            posts={posts}
            columns={3}
            infiniteScroll
        />
    </>;
};

export const getStaticProps = async (): Promise<GetStaticPropsResult<BlogRollProps>> => {
    const posts: HeadlessResponse<Post> = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/posts?per_page=12`);
    return {
        props: {
            posts,
        },
    }
}

export default BlogRoll;
