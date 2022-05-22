import Layout from '@components/Layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Page } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface PageProps {
    page: Page;
}

const Page: NextPage<PageProps> = ({
    page,
}) => {
    return <Layout>
        <Head>
            <title>{page.title} - Cody Ogden</title>
        </Head>
        <h1>{page.title}</h1>
        <main dangerouslySetInnerHTML={{ __html: page.content }} />
    </Layout>;
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
    const slug = params.path.at(-1);
    const page: Page = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/pages/${slug}`);
    if(!page.id) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            page,
        }
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/pages`);
    return {
        paths,
        fallback: 'blocking',
    }
};

export default Page;
