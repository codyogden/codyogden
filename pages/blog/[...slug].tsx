import BlogPostSingle from '@components/BlogPostSingle';
import Layout from '@components/Layout';
import { getAllPosts, getPostBySlug } from '@lib/blog';

export default function BlogPost(props): any {
    return <Layout><BlogPostSingle single={props.single} posts={props.posts} /></Layout>;
};

export async function getStaticProps({ params }) {
    const posts = await getAllPosts();
    const single = await getPostBySlug(params.slug);
    return {
        props: {
            slug: params.slug,
            posts,
            single
        },
        revalidate: 600
    };
}
