import { PostOrPage } from '@tryghost/content-api';

interface Props {
  posts: PostOrPage[]
  readMore?: Boolean
  description?: Boolean
  limit?: number
}

export default function BlogFeed({ posts, readMore, description }: Props) {
  return(
    <ul className="blogFeed">
      {posts.map((post, index) => <li key={index}><article>
        <a href={`/blog/${post.slug}`}>
          <img src={post.feature_image} alt={post.title}/>
          <div>
            <div>{post.title}</div>
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
        </a>
        {(description && post.meta_description) && <p>{post.meta_description}</p>}
      </article></li>)}
      {(readMore) && <li><a href="/blog">Read more</a></li>}
    </ul>
  );
};
