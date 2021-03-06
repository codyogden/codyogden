import Blog from '@components/Blog';
import BlogPostSingle from '@components/BlogPostSingle';
import Layout from '@components/Layout';
import { getAllPosts, getPostBySlug } from '@lib/blog';

export default function BlogPost(props): any {
    if(!props.slug)
        return <Layout><Blog posts={props.posts} /></Layout>;
    return <Layout><BlogPostSingle single={props.single} posts={props.posts} /></Layout>;
};

export async function getStaticProps({ params }) {
    const posts = await getAllPosts();
    if (!params.slug) {
        return {
            props: {
                slug: false,
                posts,
                single: false,
            }
        }
    }
    const single = await getPostBySlug(params.slug);
    return {
        props: {
            slug: params.slug,
            posts,
            single
        },
        revalidate: 3600
    };
}

export async function getStaticPaths() {
    const posts = await getAllPosts();
    const paths = posts.map((post) => {
        return {
            params: {
                slug: [post.slug],
            }
        }
    });
    return {
        paths: [
            {
                params: {
                    slug: false,
                }
            },
            ...paths
        ],
        fallback: false,
    }
}
