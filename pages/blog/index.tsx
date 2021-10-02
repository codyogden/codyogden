import Blog from '@components/Blog';
import Layout from '@components/Layout';
import { getAllPosts } from '@lib/blog';

export default function BlogPost(props): any {
    return <Layout><Blog posts={props.posts} /></Layout>;
};

export async function getStaticProps({ params }) {
    const posts = await getAllPosts();
    return {
        props: {
            slug: false,
            posts,
            single: false,
        },
        revalidate: 600
    }
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
