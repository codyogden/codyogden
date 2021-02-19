import { useEffect, useState } from 'react';
import { Photo } from 'interfaces/cockpit';
import { PhotoGridItem } from './PhotoGridItem';
import { PhotoGridModal } from './PhotoGridModal';
import { useRouter } from 'next/router';

interface PhotoGridProps {
    photos: Array<Photo>
}

export default function PhotoGrid({ open, photos }: PhotoGridProps) {
    const router = useRouter();
    const [modal, updateModal] = useState({
        active: false,
        photo: null,
    });

    const showModal = (photo) => {
        updateModal({
            active: true,
            photo
        });
        router.replace(`/photos/[...id]`, `/photos/${photo._id}`, { shallow: true });
    };

    const closeModal = () => {
        updateModal({
            active: false,
            photo: null
        });
        router.replace(`/photos/[...id]`, `/photos/`, { shallow: true });
    };

    useEffect(() => {
        if (open)
            showModal(open);
    },[]);

    return (
        <>
            <ul className="photo-grid">
                {photos.map((photo: Photo) => <PhotoGridItem clickHandler={showModal} photo={photo} key={photo._id} />)}
            </ul>
            <PhotoGridModal {...modal} closeHandler={closeModal} />
            <style jsx>{`
                .photo-grid {
                    list-style-type: none;
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    margin: 0;
                    padding: 4px;;
                    box-sizing: border-box;
                    gap: 4px;
                }
            `}</style>
        </>
    );
}
