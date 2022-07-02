import FormatDate from '@components/FormatDate';
import Layout from '@components/Layout';
import SRT from '@components/SRT';
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { HeadlessResponse } from 'src/types/headless';
import { Post } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface BlogPostProps {
    post: Post;
}

const BlogPost: NextPage<BlogPostProps> = ({
    post
}) => {
    return <Layout>
        <Head>
            <title>{post.title} - Cody Ogden</title>
        </Head>
        <article css={{
            marginBottom: 500,
        }}>
            <header
                className='content'
            >
                <div
                    css={{
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        paddingTop: '10vh',
                    }}
                >
                    <h1 css={{
                        fontSize: '2rem',
                        margin: '0.5rem 0 1rem 0',
                        order: 2,
                    }}>{post.title}</h1>
                    <div css={{ order: 1 }}>
                        <SRT>Published on</SRT>
                        <FormatDate
                            css={{
                                fontSize: '0.75rem',
                                color: 'rgb(161, 161, 161)',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontWeight: 'lighter',
                            }}
                            dateTime={post.date_gmt}
                        />
                    </div>
                    {post.featured_image && <div css={{ order: 3 }}>
                        {/* eslint-disable-next-line */}
                        <img
                            css={{
                                maxWidth: '100%',
                                display: 'block',
                            }}
                            src={post.featured_image.sizes.full}
                            alt={post.featured_image.alt}
                        />
                    </div>}
                    
                </div>
            </header>
            <main
                className='content'
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    </Layout>;
};

export const getStaticProps: GetStaticProps = async ({ params }): Promise<GetStaticPropsResult<BlogPostProps>> => {
    const post = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/posts/${params.slug}`);
    if (!post.slug) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            post,
        }
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts: HeadlessResponse<Post> = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/posts`);
    const paths = posts.data?.reduce((p, c) => {
        p.push({
            params: {
                slug: c.slug,
            }
        })
        return p;
    }, []);
    return {
        paths,
        fallback: 'blocking',
    }
};

export default BlogPost;
