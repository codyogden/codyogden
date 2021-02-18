import Head from 'next/head';

interface BlogPostSingleProps {
    post: {
        title: string
        meta_description: string
        html: string
        updated_at: string
        codeinjection_foot: string
        published_at: string
    }
}

export default function BlogPostSingle({ post }: BlogPostSingleProps) {
    return (
        <>
            <Head>
                <title>{post.title} - Cody Ogden</title>
                <meta name="description" content={post.meta_description} />
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
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }}></section>
                <footer>
                    <div>
                    </div>
                </footer>
            </article>
           {post.codeinjection_foot && <div dangerouslySetInnerHTML={{__html: post.codeinjection_foot}}></div>}
            </main>
        </>
    );
}
