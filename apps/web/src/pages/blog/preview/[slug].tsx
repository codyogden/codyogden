import { GetServerSideProps, GetServerSidePropsResult, GetStaticProps, GetStaticPropsResult } from 'next';
import fetcher from 'src/utils/fetcher';
import BlogPost, { BlogPostProps } from '../[slug]';

export const getServerSideProps: GetServerSideProps = async ({ params }): Promise<GetServerSidePropsResult<BlogPostProps>> => {
    console.log('gssp');
    const post = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/posts/${params.slug}?preview=true`);
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

export default BlogPost;
