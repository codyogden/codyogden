import { Layout } from '@components';
import { GetStaticPaths, GetStaticProps, NextPage, NextPageContext } from 'next';
import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'date-fns';
import {default as parseMarkdown} from 'front-matter-markdown';
import Head from 'next/head';
import Image from 'next/image';

interface Props extends NextPageContext {
    slug: string;
    title: string;
    image: string;
    image_alt: string;
    content: string;
    date_published: string;
    meta: any;
}

const BlogPost: NextPage<Props> = ({
    slug,
    title,
    image,
    image_alt,
    content,
    date_published,
    meta,
}) => {
    return <Layout>
        <Head>
            <title>{title} - Cody Ogden</title>
            <meta name="description" content={meta.description} />
            <meta property="og:site_name" content="Cody Ogden" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:url" content={`https://codyogden.com/blog/${slug}`} />
            <meta property="og:image" content={`https://codyogden.com${image}`} />
            <meta property="article:published_time" content={new Date(date_published).toString()} />
            <meta property="article:modified_time" content={new Date(date_published).toString()} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:url" content={`https://codyogden.com/blog/${slug}`} />
            <meta property="twitter:image" content={`https://codyogden.com${image}`} />
            <meta name="twitter:label1" content="Written by" />
            <meta name="twitter:data1" content="Cody Ogden" />
            <meta name="twitter:site" content="@codyogden" />
            <meta name="twitter:creator" content="@codyogden" />
        </Head>
        <article className='blog-post'>
            <header>
                <div>
                    <time
                        css={{
                            color: '#a1a1a7',
                            fontFamily: 'Inter,-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,Ubuntu,roboto,noto,segoe ui,arial,sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: 2,
                            fontSize: '.77778rem',
                            lineHeight: 1.5,
                            marginBottom: 0,
                        }}
                        dateTime={date_published}
                    >{format(new Date(date_published), 'LLLL dd, yyyy', {})}</time>
                </div>
                <h1
                    css={{
                        fontSize: '2.25rem',
                        margin: '1rem 0',
                        marginTop: 4,
                    }}
                >{title}</h1>
            <div>
                <Image
                    className='feature-image'
                    src={image}
                    alt={image_alt}
                    height='auto'
                    width='100%'
                />
            </div>
            </header>
            <section dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    </Layout>;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const files = readdirSync(resolve('src', 'content', 'blog'));
    const paths = files.map((file) => {
        return {
            file,
            attributes: parseMarkdown(readFileSync(resolve('src', 'content', 'blog', file)).toString()),
        };
    })
        .reduce((p, { file, attributes }) => {
            if (!attributes.published)
                return p;
            p.push({
                params: {
                    slug: file.replace('.md', ''),
                }
            });
            return p;
        }, []);
    return {
        paths,
        fallback: false,
    }
};

export const getStaticProps: GetStaticProps = async ({ params: { slug }}) => {
    const things = await import(`@content/blog/${slug}.md`);
    return {
        props: {
            slug,
            ...things.attributes,
            content: things.html,
        },
    }
};

export default BlogPost;
