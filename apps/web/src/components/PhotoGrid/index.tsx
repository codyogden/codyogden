import Loading from '@components/Loading';
import Modal from '@components/Modal';
import { useModal } from '@components/Modal/useModal';
import Image from 'next/image';
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import useOnScreen from 'src/hooks/useOnScreen';
import { Photo } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface PhotoGridProps extends HTMLAttributes<HTMLDivElement> {
    photos: Photo[];
    total?: number;
    perPage?: number;
    infiniteScroll?: boolean;
    disableModal?: boolean;
    columns?: number;
    columnsMobile?: number;
    FinalItem?: FC;
}

const PhotoGrid: FC<PhotoGridProps> = ({
    photos,
    infiniteScroll = false,
    total,
    perPage,
    disableModal = false,
    columns = 3,
    columnsMobile = 3,
    FinalItem
}) => {
    const [_photos, setPhotos] = useState<Photo[]>(photos);
    const hasMorePhotos = () => _photos.length < total;
    const [isLoading, setIsLoading] = useState(false);
    const loadMorePhotos = async () => {
        setIsLoading(true);
        const morePhotos = await fetcher(`/api/headless/photos?offset=${_photos.length}&per_page=${perPage}`);
        const allPhotos = [..._photos, ...morePhotos.data];
        setPhotos(allPhotos);
        setIsLoading(false);
    };

    const { modal, showModal } = useModal();
    const [ modalImage, setModalImage ] = useState<Photo | null>(null);
    const [ isModalImageLoading, setIsModalImageLoading ] = useState(true);
    const iamgeModalClickHandler = (photo: Photo) => {
        setIsModalImageLoading(true);
        setModalImage(photo);
        showModal();
    };

    const targetLoadMore = useRef(null);
    const isOnScreen = useOnScreen(targetLoadMore);

    if (isOnScreen && hasMorePhotos() && !isLoading)
        loadMorePhotos();

    return <div>
        {/* Photo Grid */}
        <ul
            css={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: '1.5rem',
                margin: '0 auto',
                padding: '1rem',
                boxSizing: 'border-box',
                listStyleType: 'none',
                width: '90ch',
                maxWidth: '100%',
                ['@media screen and ( max-width: 100ch )']: {
                    gap: '0.75rem',
                    gridTemplateColumns: `repeat(${columnsMobile}, 1fr)`,
                },
                ['img']: {
                    display: 'block',
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                },
            }}
        >
            {_photos?.map((photo, index) => <li key={`photo-${photo.id}-${index}`}>
                <button
                    css={{
                        backgroundColor: 'transparent',
                        border: 0,
                        padding: 0,
                        display: 'block',
                        margin: 0,
                        cursor: (disableModal) ? 'default' : 'pointer',
                        fontSize: 0,
                    }}
                    onClick={() => iamgeModalClickHandler(photo)}
                    disabled={disableModal}
                >
                {/* eslint-disable-next-line */}
                <img
                    css={{
                        aspectRatio: '1 / 1',
                        maxWidth: '100%',
                        height: 'auto',
                    }}
                    src={photo.sizes['co-gallery']}
                    height={photo.sizes['co-gallery-height']}
                    width={photo.sizes['co-gallery-width']}
                    alt={photo.alt}
                    loading='lazy'
                />
                </button>
            </li>)}
            {FinalItem && <li
                css={{
                    gridColumn: '1 / 4',
                }}
            >{<FinalItem />}</li>}
        </ul>
        {/* Modal */}
        <Modal {...modal}>
            <div
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                }}
            >
                {isModalImageLoading && <Loading />}
                {/* eslint-disable-next-line */}
                <img
                    src={modalImage?.sizes.full}
                    alt={modalImage?.alt}
                    css={{
                        maxWidth: '80vw',
                        maxHeight: '80vh',
                        display: (isModalImageLoading) ? 'none' : 'block',
                    }}
                    onLoad={() => setIsModalImageLoading(false)}
                />
            </div>
        </Modal>
        {isLoading && <div css={{ height: '300px' }}>
            <Loading />
        </div>}
        {(hasMorePhotos() && infiniteScroll) && <div>
            <span css={{ display: 'block', height: '100px', }} ref={targetLoadMore}></span>
        </div>}
        <br/>
    </div>;
};

export default PhotoGrid;
