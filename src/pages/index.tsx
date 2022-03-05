import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import Head from 'next/head';
import getBlogPosts, { BlogProps } from 'src/utils/getBlogPosts';

interface Props extends NextPageContext {
    content: string;
    header: string;
    posts: Array<any>;
}

const IndexPage: NextPage<Props> = ({
    content,
    header,
    posts,
}) => {
    return <>
        <Head>
            <title>Cody Ogden</title>
        </Head>
        <div
            css={{
                fontFamily: 'Indie Flower',
                textAlign: 'center',
                marginTop: '10rem',
                'h1': {
                    fontSize: '4.25rem',
                },
                'span': {
                    display: 'block',
                    marginTop: 16,
                    fontSize: '1.5rem',
                },
                ['@media screen and (max-width: 800px)']: {
                    marginTop: '5rem',
                    'h1': {
                        fontSize: '3rem',
                    }
                },
                ['@media screen and (min-width: 800px)']: {
                    'br': {
                        display: 'none',
                    }
                },
            }}
            dangerouslySetInnerHTML={{ __html: header }}
        />
        <div>
            <div
                css={{
                    display: 'grid',
                    margin: 0,
                    gridTemplateColumns: '1fr 1fr min(65ch,95%) 1fr 1fr',
                    '*': {
                        gridColumn: '3/3',
                    },
                    'p': {
                        lineHeight: 2,
                        margin: '0.5rem 0',
                        fontSize: '0.9rem',
                        letterSpacing: '1px',
                    },
                    ['@media screen and (max-width: 800px)']: {
                        'p': {
                            fontSize: '1rem',
                            letterSpacing: 0,
                        }
                    },
                }}
                dangerouslySetInnerHTML={{ __html: content }}
                />
        </div>
        <div
            className='animated'
            css={{
                display: 'grid',
                margin: '0 0',
                gridTemplateColumns: '1fr 1fr min(65ch,95%) 1fr 1fr',
                '*': {
                    gridColumn: '3/3',
                },
            }}
        >
            <h3 css={{ letterSpacing: '1px' }}>Writings:</h3>
            <ul css={{
                listStyleType: 'none',
                padding: 0,
                margin: '0 auto 20rem auto',
                maxWidth: '75%',
                ['@media screen and (max-width: 800px)']: {
                    maxWidth: '100%',
                },
            }}>
                {posts.map((post) => <li key={post.slug} css={{
                    margin: 0,
                    padding: 0,
                    borderBottom: '1px solid #eee',
                    ':first-of-type': {
                        marginTop: 0,
                        paddingTop: 0,
                    },
                }}>
                    <Link href={`/blog/${post.slug}`} passHref>
                        <a css={{
                            textDecoration: 'none',
                            display: 'block',
                            padding: '1rem',
                            margin: '1rem',
                            borderRadius: 4,
                            transition: 'background-color 110ms linear',
                            ':hover': {
                                backgroundColor: 'rgba(238,238,238, 0.65)'
                            },
                        }}>
                            <time css={{ display: 'block', fontSize: '0.75rem', color: '#808085', marginBottom: 4, }} dateTime={post.date_published}>{format(new Date(post.date_published), 'LLLL dd, yyyy')}</time>
                            <div css={{
                                display: 'inline',
                                fontSize: '1.25rem',
                            }}>{post.title}</div>
                            <p css={{
                                color: '#737377',
                                fontSize: '0.8rem',
                                marginTop: 4
                            }}>{post.description}</p>
                        </a>
                    </Link>
                </li>)}
            </ul>
        </div>
        <noscript>
            <style>{`
                div.animated {
                    animation-delay: 1200ms;
                }
            `}</style>
        </noscript>
    </>
};

export const getStaticProps = async () => {
    const { html } = await import('../../README.md');

    const posts = (await getBlogPosts())
        .map(({
            date_published,
            title,
            slug,
            meta: { description },
        }) => ({
            date_published,
            title,
            slug,
            description,
        }))
        .sort((a: Partial<BlogProps>, b: Partial<BlogProps>) => {
            const a_date = new Date(a.date_published);
            const b_date = new Date(b.date_published);
            return (a_date > b_date) ? -1 : (b_date < a_date) ? 1 : 0;
        });

    return {
        props: {
            header: html.split('</h1>')[0],
            content: html.split('</h1>')[1].split('<!--START_WRITINGS-->')[0],
            posts,
        }
    }
};

export default IndexPage;
