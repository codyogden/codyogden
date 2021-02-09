import BlogFeed from '../../components/BlogFeed';
import { getAllPosts, getPostBySlug, getRecentPosts } from '../../lib/blog';

export default function BlogPost(props): any {
    if(!props.slug)
        return <BlogFeed posts={props.posts} />
    return <>
        <div dangerouslySetInnerHTML={{ __html: props.posts.html}}></div>
    </>
};

export async function getStaticProps({ params }) {
    if (!params.slug) {
        const posts = await getRecentPosts({ limit: 15 });
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
