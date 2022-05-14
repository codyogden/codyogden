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
        <h1>{post.title}</h1>
        <main dangerouslySetInnerHTML={{ __html: post.content }} />
    </>;
};

export const getStaticProps: GetStaticProps = async ({ params }): Promise<GetStaticPropsResult<BlogPostProps>> => {
    const post = await fetcher(`${process.env.WP_URL}/wp-json/headless/v1/posts/${params.slug}`);
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
    const posts: Post[] = await fetcher(`${process.env.WP_URL}/wp-json/headless/v1/posts`);
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
