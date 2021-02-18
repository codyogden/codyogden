import Head from 'next/head';

interface Tag {
    id: string
    name: string
}

interface BlogPostSingleProps {
    post: {
        title: string
        meta_description: string
        html: string
        updated_at: string
        codeinjection_foot: string
        published_at: string
        tags: Tag[]
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
    console.log(post);
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
                    <PostTags tags={post.tags} />
                </footer>
            </article>
           {post.codeinjection_foot && <div dangerouslySetInnerHTML={{__html: post.codeinjection_foot}}></div>}
            </main>
        </>
    );
}
