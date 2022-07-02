import Layout from '@components/Layout';
import PhotoGrid from '@components/PhotoGrid';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Photo } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface PhotosPageProps {
    photos: Photo[];
    perPage: number;
    total: number;
}

const PhotosPage: NextPage<PhotosPageProps> = ({
    photos,
    perPage,
    total,
}) => {
    return <Layout>
        <Head>
            <title>Photos - Cody Ogden</title>
        </Head>
        <div css={{
            textAlign: 'center',
        }}>
            <h1 css={{ marginBottom: '0.5rem' }}>Photos</h1>
            <p css={{ marginTop: 0 }}>Snapshots from here and there.</p>
        </div>
        <PhotoGrid
            photos={photos}
            perPage={perPage}
            total={total}
            infiniteScroll
        />
    </Layout>
};

export const getStaticProps: GetStaticProps = async () => {
    const offset = 0;
    const perPage = 9;
    const photos = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/photos?offset=${offset}&per_page=15`);
    return {
        props: {
            photos: photos.data,
            total: photos.meta.total,
            perPage,
        }
    }
};

export default PhotosPage;