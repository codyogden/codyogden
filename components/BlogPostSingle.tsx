import Head from 'next/head';

interface BlogPostSingleProps {
    post: {
        title: string
        meta_description: string
        html: string
        updated_at: string
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
                    <h2>{post.title}</h2>
                    {new Date(post.updated_at).toLocaleString('en', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }}></section>
            </article>
            </main>
            <style jsx>{`
                main {
                    display: grid;
                    grid-template-columns: 1fr min(65ch, 95%) 1fr;
                }
                article.blog-post {
                    grid-column: 2 / 3;
                }
            `}</style>
        </>
    );
}
