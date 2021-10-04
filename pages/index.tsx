import Head from 'next/head';
import SplashHeader from '_components/SplashHeader';
import Layout from '_components/Layout';

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
