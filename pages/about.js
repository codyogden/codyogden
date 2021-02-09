import Head from 'next/head';
import { getRecentPosts } from '../lib/blog';

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Cody Ogden - About</title>
      </Head>
      <section>
        <p>I've been crafting on the web since 2001, and it all started with a JavaScript program to help me cheat on math homework--fifth grade math is tough! Even though I have spent twenty years self-learning and developing on the web, in 2016 I joined a coding bootcamp primarily to network with and learn how to collaborate with a team of engineers.</p>
      </section>
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      blog: await getRecentPosts(),
    },
  }
}
