import Head from 'next/head';
import SplashHeader from '@components/SplashHeader';
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
