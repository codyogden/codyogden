import Layout from '@components/Layout';
import Modal from '@components/Modal';
import { useModal } from '@components/Modal/useModal';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Photo } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface PhotosPageProps {
    photos: Photo[];
}

const PhotosPage: NextPage<PhotosPageProps> = ({
    photos
}) => {
    const { modal, showModal } = useModal();
    const [modalImage, setModalImage] = useState<Photo|null>(null);
    const showHandler = () => {
        showModal();
    };
    return <Layout>
        <Head>
            <title>Photos - Cody Ogden</title>
        </Head>
        <ul css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            margin: '0 auto',
            padding: '1rem',
            boxSizing: 'border-box',
            listStyleType: 'none',
            maxWidth: '100%',
            width: '90ch',
            ['img']: {
                display: 'block',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
            }
        }}>
            {photos?.map((photo) => <li
                key={`photo-${photo.id}`}
                css={{
                    fontSize: '0px',
                }}
            >
                <button
                    css={{
                        backgroundColor: 'transparent',
                        border: 0,
                        padding: 0,
                        display: 'block',
                        margin: 0,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setModalImage(photo);
                        showHandler();
                    }}
                >
                    <Image
                        css={{
                            aspectRatio: '1/1',
                        }}
                        quality={100}
                        src={photo.sizes.medium}
                        height={photo.sizes['medium-width']}
                        width={photo.sizes['medium-width']}
                        alt={photo.alt}
                    />
                </button>
            </li>)}
        </ul>
        <Modal {...modal}>
            <div
                css={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* eslint-disable-next-line */}
                <img
                    src={modalImage?.sizes.full}
                    alt={modalImage?.alt}
                    css={{
                        maxWidth: '80vw',
                        maxHeight: '80vh',
                    }}
                />
            </div>
        </Modal>
    </Layout>
};

export const getStaticProps: GetStaticProps = async () => {
    const photos = await fetcher(`${process.env.WP_URL}/wp-json/headless/v1/photos`);
    return {
        props: {
            photos,
        }
    }
};

export default PhotosPage;