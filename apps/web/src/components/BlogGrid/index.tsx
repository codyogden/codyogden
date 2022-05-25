import FormatDate from '@components/FormatDate';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { Post } from 'src/types/wordpress';

interface BlogGridProps extends HTMLAttributes<HTMLDivElement> {
    posts: Post[];
    columns?: number;
    columnsMobile?: number;
}

const BlogGrid: FC<BlogGridProps> = ({
    posts,
    columns = 3,
    columnsMobile = 1,
}) => {
    return <>
        <ul
            css={{
                listStyleType: 'none',
                margin: '0 auto',
                padding: '1rem',
                boxSizing: 'border-box',
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                width: '90ch',
                maxWidth: '100%',
                alignItems: 'stretch',
                gap: '1.5rem',
                ['@media screen and ( max-width: 90ch )']: {
                    gap: '0.75rem',
                    gridTemplateColumns: `repeat(${columnsMobile}, 1fr)`,
                },
            }}
        >
            {posts.map((post, index) => {
                const { id, title, slug, featured_image, date_gmt } = post;
                return <li
                key={`post-${id}-${index}`}>
                    <Link href={`/blog/${slug}`} passHref>
                    <a
                        css={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'pink',
                        }}
                    >
                        {featured_image && <div
                            css={{

                            }}
                        >
                            <img
                                css={{
                                    display: 'block',
                                    width: '100%',
                                    objectFit: 'cover',
                                    height: '75px',
                                    userSelect: 'none',
                                    ['@media screen and ( max-width: 90ch )']: {
                                        height: '150px',
                                    },
                                }}
                                src={featured_image.sizes.medium}
                                alt={featured_image.alt}
                                aria-hidden
                            />
                        </div>}
                        {title}
                        <FormatDate dateTime={date_gmt}/>
                        </a>
                    </Link>
                </li>;
            })}
            <li
                css={{
                    gridColumn: '1 / 4',
                    backgroundColor: 'pink',
                    ['@media screen and ( max-width: 90ch )']: {
                        gridColumn: 'auto',
                    },
                }}
            >
                <Link href='/blog' passHref>
                    <a
                        css={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'center',
                            padding: '1rem 0',
                        }}
                    >
                        More Blog Posts
                    </a>
                </Link>
            </li>
        </ul>
    </>;
};

export default BlogGrid;
