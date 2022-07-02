import BlogGrid from '@components/BlogGrid';
import FormatDate from '@components/FormatDate';
import Layout from '@components/Layout';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { HeadlessResponse } from 'src/types/headless';
import { Photo, Post } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface IndexPageProps {
    posts: HeadlessResponse<Post>;
}

const IndexPage: NextPage<IndexPageProps> = ({
    posts,
}) => {
    return <Layout>
        <Head>
            <title>Cody Ogden</title>
        </Head>
        <div className='content'>
            <BlogGrid infiniteScroll columns={1} posts={posts} />
        </div>
    </Layout>;
};

export const getStaticProps: GetStaticProps = async () => {
    const posts: HeadlessResponse<Post> = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/posts?per_page=40`);
    return {
        props: {
            posts: posts,
        },
    }
};

export default IndexPage;
