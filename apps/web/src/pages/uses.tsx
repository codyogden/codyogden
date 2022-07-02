import Layout from '@components/Layout';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { HeadlessResponse } from 'src/types/headless';
import { UsesItem } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface PageProps {
    items: HeadlessResponse<UsesItem>;
}

const Page: NextPage<PageProps> = ({
    items,
}) => {
    return <Layout>
        <Head>
            <title>Uses - Cody Ogden</title>
        </Head>
        <div css={{
            textAlign: 'center',
        }}>
            <h1 css={{ marginBottom: '0.5rem' }}>Uses</h1>
            <p css={{ marginTop: 0 }}>A gallery of the things I use.</p>
        </div>
        <ul>
            {items?.data && items.data?.map(({ id, title }, index) => <li key={`uses-${id}-${index}`}>{title}</li>)}
        </ul>
    </Layout>;
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
    const items = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/uses`);
    return {
        props: {
            items,
        }
    }
};

export default Page;
