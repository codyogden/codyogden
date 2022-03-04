import { Layout } from '@components';
import { GetStaticPaths, GetStaticProps, NextPage, NextPageContext } from 'next';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { format } from 'date-fns';

interface Props extends NextPageContext {
    title: string;
    image: string;
    image_alt: string;
    content: string;
    date_published: string;
}

const BlogPost: NextPage<Props> = ({
    title,
    image,
    image_alt,
    content,
    date_published,
}) => {
    console.log(date_published.split('T')[0]);
    return <Layout>
        <article
            // css={{
            //     // maxWidth: '65ch',
            //     margin: '5.5rem auto',
            //     display: 'grid',
            //     gridTemplateColumns: '1fr 1fr min(65ch,95%) 1fr 1fr',
            //     '*': {
            //         gridColumn: '3/3',
            //     },
            //     '* img': {
            //         maxWidth: '100%',
            //     },
            // }}
            className='blog-post'
        >
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
                {/* eslint-disable-next-line */}
                <img
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
    const paths = readdirSync(resolve('src', 'content', 'blog')).map((i) => ({
        params: {
            slug: i.replace('.md', ''),
        }
    }));
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
