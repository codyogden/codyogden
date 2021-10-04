import Blog from '_components/Blog';
import Layout from '_components/Layout';
import { getAllPosts } from '@lib/blog';
import { PostOrPage } from '@tryghost/content-api';

export default function BlogPost(props): any {
    return <Layout><Blog posts={props.posts} /></Layout>;
};

export async function getStaticProps({ params }) {
    const posts: PostOrPage[] = await getAllPosts();
    return {
        props: {
            slug: false,
            posts,
            single: false,
        },
        revalidate: 30
    }
}
