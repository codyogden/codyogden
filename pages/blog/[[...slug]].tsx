import Blog from '@components/Blog';
import BlogPostSingle from '@components/BlogPostSingle';
import { getAllPosts, getPostBySlug } from '@lib/blog';

export default function BlogPost(props): any {
    if(!props.slug)
        return <Blog posts={props.posts} />;
    return <BlogPostSingle post={props.posts} />
};

export async function getStaticProps({ params }) {
    if (!params.slug) {
        const posts = await getAllPosts();
        return {
            props: {
                slug: false,
                posts,
            }
        }
    }
    const posts = await getPostBySlug(params.slug);
    return {
        props: {
            slug: params.slug,
            posts
        }
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
