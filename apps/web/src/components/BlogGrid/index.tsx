import FormatDate from '@components/FormatDate';
import Link from 'next/link';
import { FC, HTMLAttributes, useRef, useState } from 'react';
import useOnScreen from 'src/hooks/useOnScreen';
import { HeadlessResponse } from 'src/types/headless';
import { Post } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface BlogGridProps extends HTMLAttributes<HTMLDivElement> {
    posts: HeadlessResponse<Post>;
    infiniteScroll?: boolean;
    columns?: number;
    columnsMobile?: number;
    FinalItem?: FC;
}

const BlogGrid: FC<BlogGridProps> = ({
    posts,
    infiniteScroll,
    columns = 3,
    columnsMobile = 1,
    FinalItem,
}) => {
    const [_posts, setPosts] = useState<Post[]>(posts.data);
    const hasMorePosts = () => _posts.length < posts.meta.total;
    const [isLoading, setIsLoading] = useState(false);
    const loadMorePosts = async () => {
        setIsLoading(true);
        const morePosts = await fetcher(`/api/headless/posts?offset=${_posts.length}&per_page=${posts.meta.per_page}`);
        const allPosts = [..._posts, ...morePosts.data];
        setPosts(allPosts);
        setTimeout(() => setIsLoading(false), 500);
    };

    const targetLoadMore = useRef(null);
    const isOnScreen = useOnScreen(targetLoadMore);

    if (isOnScreen && hasMorePosts() && !isLoading)
        loadMorePosts();

    return <>
        <ul
            css={{
                listStyleType: 'none',
                margin: '0 auto',
                padding: '1rem 0',
                boxSizing: 'border-box',
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                width: '100%',
                alignItems: 'stretch',
            }}
        >
            {_posts?.map((post, index) => {
                const { id, title, slug, featured_image, date_gmt, excerpt } = post;
                return <li
                key={`post-${id}-${index}`}>
                    <Link href={`/blog/${slug}`} passHref>
                        <a css={{
                            textDecoration: 'none',
                            display: 'flex',
                            flexFlow: 'column nowrap',
                            padding: '1rem 1rem',
                            margin: '0.5rem 0',
                            lineHeight: '1.5 !important',
                            transition: 'background-color 110ms linear',
                            [':hover']: {
                                backgroundColor: 'rgba(238,238,238, 0.65)',
                            }
                        }}>
                            <div css={{ order: 2, fontSize: '1.25rem' }}>{title}</div>
                            <FormatDate dateTime={date_gmt} css={{ order: 1, color: 'rgb(161, 161, 161)', marginBottom: 0, letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase', display: 'block', }} />
                            <p css={{ fontSize: '0.9rem', order: 3, margin: 0, marginTop: 0, color: '#000', }}>{excerpt}</p>
                        </a>
                    </Link>
                </li>;
            })}
            {FinalItem &&
                <li
                    css={{
                        gridColumn: `1 / ${(columns + 1)}`,
                        backgroundColor: 'pink',
                        ['@media screen and ( max-width: 90ch )']: {
                            gridColumn: 'auto',
                        },
                    }}
                >
                    <FinalItem />
                </li>}
        </ul>
        {(hasMorePosts() && infiniteScroll) && <div>
            more
            <span css={{ display: 'block', height: '100px', }} ref={targetLoadMore}></span>
        </div>}
    </>;
};

export default BlogGrid;
