interface BlogFeedProps {
  posts: Array<any>
  readMore?: Boolean
  description?: Boolean
}

export default function BlogFeed({ posts, readMore, description }: BlogFeedProps) {
  return(
    <ul>
      {posts.map((post, index) => <li key={index}><article>
        <a href={`/blog/${post.slug}`}>{post.title}</a>
        {(description && post.meta_description) && <p>{post.meta_description}</p>}
      </article></li>)}
      {(readMore) && <li><a href="/blog">Read more</a></li>}
    </ul>
  );
};
