import BlogPostSingle from '_components/BlogPostSingle';
import Layout from '_components/Layout';
import { getAllPosts, getPostBySlug } from '@lib/blog';
import { PostOrPage } from '@tryghost/content-api';

export default function BlogPost(props): any {
    return <Layout><BlogPostSingle single={props.single} posts={props.posts} /></Layout>;
};

export async function getStaticProps({ params }) {
    const posts: PostOrPage[] = await getAllPosts();
    const single: PostOrPage = await getPostBySlug(params.slug);
    return {
        props: {
            slug: params.slug,
            posts,
            single
        },
        revalidate: 30
    };
}


export async function getStaticPaths() {
    const posts: PostOrPage[] = await getAllPosts();
    const paths = posts.map((post) => {
        return {
            params: {
                slug: [post.slug],
            }
        }
    });
    return {
        paths,
        fallback: 'blocking',
    }
}
