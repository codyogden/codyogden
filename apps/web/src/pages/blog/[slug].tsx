import { GetStaticPaths, GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import { Post } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface BlogPostProps {
    post: Post;
}

const BlogPost: NextPage<BlogPostProps> = ({
    post
}) => {
    return <>
        <article>
            <header
            className='content'
            >
                <h1>{post.title}</h1>
                {/* eslint-disable-next-line */}
                {post.featured_image && <img
                    css={{
                        maxWidth: '100%',
                        display: 'block',
                    }}
                    src={post.featured_image.sizes.full}
                    alt={post.featured_image.alt}
                />}
            </header>
            <main
                className='content'
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    </>;
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
    const posts: Post[] = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/posts`);
    const paths = posts.reduce((p, c) => {
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
