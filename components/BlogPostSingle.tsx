import Head from 'next/head';
import { useEffect } from 'react';

interface Tag {
    id: string
    name: string
    slug: string
}

interface Author {
    name: string
    twitter: string
}

interface BlogPostSingleProps {
    post: {
        authors: Array<Author>
        codeinjection_foot: string
        feature_image: null | string
        html: string
        meta_description: string
        meta_title: null | string
        og_description: null | string
        og_image: null | string
        og_title: null | string
        published_at: string
        slug: string
        tags: Tag[]
        title: string
        updated_at: string
        twitter_description: null | string
        twitter_image: null | string
        twitter_title: null | string
    }
}

const PostTagItem = ({id, name}: Tag) => {
    return (
        <li key={id}>
            <span>#</span>{name}
        <style jsx>{`
            li {
                box-sizing: border-box;
                padding: 0.25rem 0.5rem;
                margin: 0.25rem;
                background-color: #EDEDED;
                font-size: 0.8rem;
            }
            li span {
                margin-right: 1px;
            }
        `}</style>
        </li>
    );
};
const PostTags = ({ tags }) => {
    if(!tags.length)
        return <></>;
    return (
        <div>
            <ul>
                {tags.map((tag: Tag) => <PostTagItem {...tag} />)}
            </ul>
        <style jsx>{`
            div {
                display: flex;
                align-items: center;
            }
            ul {
                list-style-type: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-flow: row wrap;
            }
        `}</style>
        </div>
    )
};

export default function BlogPostSingle({ post }: BlogPostSingleProps) {
    useEffect(() => {
        const yts = document.querySelectorAll(`iframe[src^='https://www.youtube.com']`);
        yts.forEach((yt) => {
            const parent = yt.parentElement;
            const ytContainer = document.createElement('div');
            ytContainer.setAttribute('class', 'video-embed-container');
            ytContainer.appendChild(yt);
            parent.append(ytContainer);
        });
    }, []);
    return (
        <>
            <Head>
                <title>{post.title} - Cody Ogden</title>
                <meta name="description" content={post.meta_description} />
                <meta property="og:site_name" content="Cody Ogden" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.og_title ?? post.meta_title ?? post.title} />
                <meta property="og:description" content={post.og_description ?? post.meta_description }/>
                <meta property="og:url" content={`https://codyogden.com/blog/${post.slug}`} />
                <meta property="og:image" content={`https://codyogden.com/api/card?text=${post.title}`} />
                <meta property="article:published_time" content={post.published_at} />
                <meta property="article:modified_time" content={post.updated_at} />
                {post.tags.map((tag) => <meta property="article:tag" content={tag.name} key={tag.slug} />)}
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.twitter_title ?? post.meta_title ?? post.title} />
                <meta name="twitter:description" content={post.twitter_description ?? post.meta_description} />
                <meta name="twitter:url" content={`https://codyogden.com/blog/${post.slug}`} />
                <meta property="twitter:image" content={`https://codyogden.com/api/card?text=${post.title}`} />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content={post.authors[0].name} />
                {post.tags.length && <meta name="twitter:label2" content="Filed under" />}
                {post.tags.length && <meta name="twitter:data2" content={post.tags.reduce((prev, tag) => { prev.push(tag.name); return prev; }, []).join(', ')} />}
                <meta name="twitter:site" content={post.authors[0].twitter} />
                <meta name="twitter:creator" content={post.authors[0].twitter} />
            </Head>
            <main className="post-single">
            <article className="blog-post">
                <header>
                    <div>
                            <time className="published" dateTime={new Date(post.published_at).toLocaleString('en-CA', {
                                month: 'numeric',
                                day: 'numeric',
                                year: 'numeric'
                            })}>
                                {new Date(post.published_at).toLocaleString('en', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            
                        </time>
                    </div>
                    <h1>{post.title}</h1>
                    {post.feature_image && <img className="feature-image" src={post.feature_image} />}
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }}></section>
                <footer>
                    {/* <PostTags tags={post.tags} /> */}
                </footer>
            </article>
           {post.codeinjection_foot && <div dangerouslySetInnerHTML={{__html: post.codeinjection_foot}}></div>}
            </main>
        </>
    );
}
