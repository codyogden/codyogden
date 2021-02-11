import Head from 'next/head';
import SplashHeader from '@components/SplashHeader';
import BlogFeed from '@components/BlogFeed';
import { getRecentPosts } from '@lib/blog';
import { collections, singletons } from '@lib/cockpit';
import PhotoGrid from '@components/PhotoGrid';
import Layout from '@components/Layout';

export default function Home({ posts, photos }: any) {
  return (
    <Layout>
      <Head>
        <title>Cody Ogden - Software Engineer</title>
      </Head>
      <SplashHeader />
    </Layout>
  )
}

export async function getStaticProps() {
  const photos = await (fetch(collections('photos')).then(r => r.json()));
  return {
    props: {
      posts: await getRecentPosts({ limit: 4 }),
      photos: photos.entries,
    },
  }
}
