import Head from 'next/head';
import { useEffect } from 'react';
import BlogFeed from './BlogFeed';
import { PostOrPage } from '@tryghost/content-api';

interface Props {
    single: PostOrPage
    posts: PostOrPage[]
}

export default function BlogPostSingle({ single, posts }: Props) {
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
                <title>{single.title} - Cody Ogden</title>
                <meta name="description" content={single.meta_description} />
                <meta property="og:site_name" content="Cody Ogden" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={single.og_title ?? single.meta_title ?? single.title} />
                <meta property="og:description" content={single.og_description ?? single.meta_description }/>
                <meta property="og:url" content={`https://codyogden.com/blog/${single.slug}`} />
                {(single.og_image || single.feature_image) && <meta property="og:image" content={single.og_image ?? single.feature_image} />}
                <meta property="article:published_time" content={single.published_at} />
                <meta property="article:modified_time" content={single.updated_at} />
                {single.tags.map((tag) => <meta property="article:tag" content={tag.name} key={tag.slug} />)}
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={single.twitter_title ?? single.meta_title ?? single.title} />
                <meta name="twitter:description" content={single.twitter_description ?? single.meta_description} />
                <meta name="twitter:url" content={`https://codyogden.com/blog/${single.slug}`} />
                {(single.twitter_image || single.feature_image ) && <meta property="twitter:image" content={single.twitter_image ?? single.feature_image} />}
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content={single.authors[0].name} />
                {single.tags.length && <meta name="twitter:label2" content="Filed under" />}
                {single.tags.length && <meta name="twitter:data2" content={single.tags.reduce((prev, tag) => { prev.push(tag.name); return prev; }, []).join(', ')} />}
                <meta name="twitter:site" content={single.authors[0].twitter} />
                <meta name="twitter:creator" content={single.authors[0].twitter} />
            </Head>
            <main className="post-single">
            <article className="blog-post">
                <header>
                    <div>
                            <time className="published" dateTime={new Date(single.published_at).toLocaleString('en-CA', {
                                month: 'numeric',
                                day: 'numeric',
                                year: 'numeric'
                            })}>
                                {new Date(single.published_at).toLocaleString('en', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            
                        </time>
                    </div>
                    <h1>{single.title}</h1>
                    {single.feature_image && <img className="feature-image" src={single.feature_image} />}
                </header>
                <section dangerouslySetInnerHTML={{ __html: single.html }}></section>
                <footer>
                    {/* <PostTags tags={single.tags} /> */}
                </footer>
            </article>
            {single.codeinjection_foot && <div dangerouslySetInnerHTML={{__html: single.codeinjection_foot}}></div>}
            <div>
                <BlogFeed posts={posts} />
            </div>
            </main>
        </>
    );
}
