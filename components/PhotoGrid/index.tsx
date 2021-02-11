import { useState } from 'react';
import { Photo } from 'interfaces/cockpit';
import { PhotoGridItem } from './PhotoGridItem';
import { PhotoGridModal } from './PhotoGridModal';
import { photoURL } from '@lib/cockpit';

interface PhotoGridProps {
    photos: Array<Photo>
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
    const [modal, updateModal] = useState({
        active: false,
        photo: null,
    });

    const showModal = (photo) => {
        updateModal({
            active: true,
            photo
        })
    };

    const closeModal = () => {
        updateModal({
            active: false,
            photo: null
        });
    };
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
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                    margin: 0;
                    padding: 4px;;
                    box-sizing: border-box;
                    gap: 4px;
                }
                @media screen and ( max-width: 800px ) {
                    .photo-grid {
                        grid-template-columns: 1fr 1fr 1fr;
                    }
                }
            `}</style>
        </>
    );
}
