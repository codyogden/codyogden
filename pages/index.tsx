import Head from 'next/head';
import SplashHeader from '@components/SplashHeader';
import BlogFeed from '@components/BlogFeed';
import { getRecentPosts } from '@lib/blog';
import { singletons } from '@lib/cockpit';

export default function Home({ posts, blurb }: any) {
  return (
    <>
      <Head>
        <title>Cody Ogden - Software Engineer</title>
      </Head>
      <SplashHeader />
      <section dangerouslySetInnerHTML={{__html: blurb}} />
      <BlogFeed posts={posts} readMore />
    </>
  )
}

export async function getStaticProps() {
  const { blurb } = await fetch(singletons('blurbabout')).then(result => result.json());
  return {
    props: {
      blurb,
      posts: await getRecentPosts({ limit: 4 }),
    },
  }
}
