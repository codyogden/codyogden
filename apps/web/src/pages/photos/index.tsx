import Layout from '@components/Layout';
import Modal from '@components/Modal';
import { useModal } from '@components/Modal/useModal';
import PhotoGrid from '@components/PhotoGrid';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FC, useState } from 'react';
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
    const perPage = 12;
    const photos = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/photos?offset=${offset}&perPage=9`);
    return {
        props: {
            photos: photos.data,
            total: photos.meta.total,
            perPage,
        }
    }
};

export default PhotosPage;