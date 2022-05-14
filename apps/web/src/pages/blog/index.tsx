import { GetStaticPropsResult, NextPage } from 'next';
import Link from 'next/link';
import fetcher from 'src/utils/fetcher';

import { Post } from '../../types/wordpress';

interface BlogRollProps {
    posts: Post[];
}

const BlogRoll: NextPage<BlogRollProps> = ({
    posts
}) => {
    return <>
        <ul>
            {posts.map(({ id, slug, title }) => <li key={`post-${id}`}>
                <Link href={`/blog/${slug}`}>{title}</Link>
            </li>)}
        </ul>
    </>;
};

export const getStaticProps = async (): Promise<GetStaticPropsResult<BlogRollProps>> => {
    const posts = await fetcher(`${process.env.WP_URL}/wp-json/headless/v1/posts`);
    return {
        props: {
            posts,
        },
    }
}

export default BlogRoll;
