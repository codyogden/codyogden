import FormatDate from '@components/FormatDate';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { HeadlessResponse } from 'src/types/headless';
import { Post } from 'src/types/wordpress';

interface BlogGridProps extends HTMLAttributes<HTMLDivElement> {
    posts: HeadlessResponse<Post>;
    columns?: number;
    columnsMobile?: number;
    FinalItem?: FC;
}

const BlogGrid: FC<BlogGridProps> = ({
    posts,
    columns = 3,
    columnsMobile = 1,
    FinalItem,
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
            {posts?.data?.map((post, index) => {
                const { id, title, slug, featured_image, date_gmt, excerpt } = post;
                return <li
                key={`post-${id}-${index}`}>
                    <Link href={`/blog/${slug}`} passHref>
                    <a
                        css={{
                            display: 'grid',
                            gridTemplateRows: '150px 1fr',
                            alignItems: 'stretch',
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#fff',
                            textDecoration: 'none',
                            color: 'currentColor',
                            borderRadius: '1px',
                            overflow: 'hidden',
                        }}
                        ><div
                            css={{
                                height: '150px',
                            }}
                        >
                            {featured_image && <>
                                {/* eslint-disable-next-line */}
                                    <img
                                        css={{
                                            display: 'block',
                                            width: '100%',
                                            objectFit: 'cover',
                                            height: '150px',
                                            userSelect: 'none',
                                            ['@media screen and ( max-width: 90ch )']: {
                                                height: '150px',
                                            },
                                        }}
                                        src={featured_image.sizes.medium}
                                        alt={featured_image.alt}
                                        aria-hidden
                                    />
                                </>}
                            </div>
                            <div
                                css={{
                                    boxSizing: 'border-box',
                                    padding: '1rem 1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid #eee',
                                    borderTop: 0,
                                }}
                            >
                                    
                                    <div
                                        css={{
                                            fontWeight: 'bold',
                                            fontSize: '1.25rem',
                                            marginTop: '0.25rem',
                                            order: 2,
                                            margin: '0.5rem 0',
                                        }}
                                    >
                                        {title}
                                    </div>
                                    <FormatDate css={{
                                        order: 1,
                                        display: 'block',
                                        fontSize: '0.75rem',
                                        color: 'rgb(161, 161, 161)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                    }} dateTime={date_gmt} />
                                <p
                                    css={{
                                            color: 'rgb(128, 128, 128)',
                                            order: 3,
                                            fontSize: '0.9rem',
                                            lineHeight: '1.45',
                                            margin: 0
                                        }}
                                    dangerouslySetInnerHTML={{ __html: excerpt?.substring(0, 145) }}
                                />
                            </div>
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
    </>;
};

export default BlogGrid;
