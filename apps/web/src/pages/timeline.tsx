import Layout from '@components/Layout';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

interface PageProps { }

const Page: NextPage<PageProps> = () => {
    return <Layout>
        <Head>
            <title>Uses - Cody Ogden</title>
        </Head>
        <div css={{
            textAlign: 'center',
        }}>
            <h1 css={{ marginBottom: '0.5rem' }}>Timeline</h1>
            <p css={{ marginTop: 0 }}>The journey of my life.</p>
        </div>
    </Layout>;
};

export default Page;
