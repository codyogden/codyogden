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
    perPage = 12,
    disableModal = false,
    columns = 3,
    columnsMobile = 3,
    FinalItem
}) => {
    const [_photos, setPhotos] = useState<Photo[]>(photos);
    const [hasMorePhotos, setHasMorePhotos] = useState(true);
    const loadMorePhotos = async () => {
        if (hasMorePhotos) {
            const morePhotos = await fetcher(`/api/headless/photos?offset=${_photos.length}&per_page=${perPage}`);
            const allPhotos = [..._photos, ...morePhotos.data];
            setPhotos(allPhotos);
            if (allPhotos.length === total) {
                setHasMorePhotos(false);
            }
        }
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

    useEffect(() => {
        if(isOnScreen) {
            loadMorePhotos();
        }
    }, [isOnScreen]);

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
                maxWidth: '100%',
                width: '90ch',
                ['@media screen and ( max-width: 100ch )']: {
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
                <Image
                    css={{
                        aspectRatio: '1 / 1',
                    }}
                    src={photo.sizes['co-gallery']}
                    height={photo.sizes['co-gallery-height']}
                    width={photo.sizes['co-gallery-width']}
                    alt={photo.alt}
                />
                </button>
            </li>)}
            {FinalItem && <li>{<FinalItem />}</li>}
        </ul>
        {/* Modal */}
        <Modal {...modal}>
            <div
                css={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {isModalImageLoading && <div css={{ backgroundColor: 'pink' }}>Loading...</div>}
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
        {(hasMorePhotos && infiniteScroll) && <div>
            <span ref={targetLoadMore}></span>
        </div>}
    </div>;
};

export default PhotoGrid;
