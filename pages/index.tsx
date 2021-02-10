import Head from 'next/head';
import SplashHeader from '@components/SplashHeader';
import BlogFeed from '@components/BlogFeed';
import { getRecentPosts } from '@lib/blog';

export default function Home({ posts }: any) {
  return (
    <>
      <Head>
        <title>Cody Ogden - Front End Software Engineer</title>
      </Head>
      <SplashHeader />
      <section>
        Where you can find me.
      </section>
      <BlogFeed posts={posts} readMore />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: await getRecentPosts({ limit: 4 }),
    },
  }
}
