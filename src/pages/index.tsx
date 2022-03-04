import { Layout, Splash } from '@components';
import { NextPage, NextPageContext } from 'next';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import Link from 'next/link';
import { format } from 'date-fns';

interface Props extends NextPageContext {
    content: string;
    posts: Array<any>;
}

const IndexPage: NextPage<Props> = ({
    content,
    posts,
}) => {
    return <Layout>
        <Splash
            css={{
                margin: '10rem 0 2rem 0',
                // height: '60vh',
            }}
        />
        <div
            className={'animated'}
            css={{
                animation: 'MakeThingsFadeIn 800ms linear forwards',
                animationDelay: '2500ms',
                opacity: 0,
            }}
        >
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
                animation: 'MakeThingsFadeIn 800ms linear forwards',
                animationDelay: '2500ms',
                opacity: 0,
                '*': {
                    gridColumn: '3/3',
                },
            }}
        >
            <h3 css={{ letterSpacing: '1px' }}>Writings:</h3>
            <ul css={{
                listStyleType: 'none',
                padding: 0,
                margin: '0 0 20rem 0',
            }}>
                {posts.map((post) => <li key={post.slug} css={{
                    margin: '1rem 0',
                    padding: '1rem 0',
                    borderBottom: '1px solid #eee',
                    ':first-of-type': {
                        marginTop: 0,
                        paddingTop: 0,
                    },
                }}>
                    <Link href={`/blog/${post.slug}`} passHref>
                        <a css={{
                            textDecoration: 'none',
                        }}>
                            <time css={{ display: 'block', fontSize: '0.75rem', color: '#808085', marginBottom: 4, }} dateTime={post.date_published}>{format(new Date(post.date_published), 'LLLL dd, yyyy')}</time>
                            <div css={{
                                display: 'inline',
                                fontSize: '1.25rem',
                            }}>{post.title}</div>
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
    </Layout>
};

interface BlogAttributes {
    title: string;
    date_published: string;
    image?: string;
    image_alt?: string;
    published: boolean;
}

interface BlogProps extends BlogAttributes {
    slug: string;
    content: string;
    published: boolean;
}

const getBlogPosts: () => Promise<BlogProps[]> = async () => {
    const paths = readdirSync(resolve('src', 'content', 'blog'));
    const files = [];
    for(let i = 0; i < paths.length; i++) {
        const { attributes, html } = await import(`src/content/blog/${paths[i]}`);
        files.push({ slug: paths[i].replace('.md', ''), ...attributes, content: html });
    }
    return files;
};

export const getStaticProps = async () => {
    const { html } = await import('../../README.md');

    const posts = (await getBlogPosts())
        .reduce((p, c): Partial<BlogProps>[] => {
            if(!c.published)
                return p;
            p.push({
                date_published: c.date_published,
                title: c.title,
                slug: c.slug,
            });
            return p;
        }, [])
        .sort((a: Partial<BlogProps>, b: Partial<BlogProps>) => {
            const a_date = new Date(a.date_published);
            const b_date = new Date(b.date_published);
            return (a_date > b_date) ? -1 : (b_date < a_date) ? 1 : 0;
        });

    return {
        props: {
            content: html.split('</h2>')[1].split('<!--START_WRITINGS-->')[0],
            posts,
        }
    }
};

export default IndexPage;
