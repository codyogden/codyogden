interface BlogFeedProps {
  posts: Array<any>
  readMore?: Boolean
}

export default function BlogFeed({ posts, readMore }: BlogFeedProps) {
  return(
    <ul>
      {posts.map((post, index) => <li key={index}><article>
        <a href={`/blog/${post.slug}`}>{post.title}</a>
        <p>{post.meta_description}</p>
      </article></li>)}
      {(readMore) && <li><a href="/blog">Read more on my blog</a></li>}
    </ul>
  );
};
