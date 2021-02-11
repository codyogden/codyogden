import { photoURL } from '@lib/cockpit';
import { Photo } from 'interfaces/cockpit';

const PhotoGridItem = (photo: Photo) => {
    return (
        <li>
            <figure>
                <img src={photoURL(photo.photo.path)} alt={photo.alt} />
                {photo.description && <figcaption>{photo.description}</figcaption>}
            </figure>
            <style jsx>{`
                figure {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                figcaption {
                    background-color: rgba(0,0,0,0.6);
                    height: 100%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    opacity: 0;
                    transition: opacity 120ms linear;
                    box-sizing: border-box;
                    padding: 2rem;
                    text-align: center;
                    color: #ffffff;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                @media screen and ( min-width: 799px ) {
                    figure:hover figcaption {
                        opacity: 1;
                    }
                }
                li {
                    margin: 0;
                    padding: 0;
                }
                li:nth-child(6n+2) {
                    grid-column: auto / span 2;
                    grid-row: auto / span 2;
                }
                img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    display: block;
                }
            `}</style>
        </li>
    );
};

interface PhotoGridProps {
    photos: Array<Photo>
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
    return (
        <>
            <ul className="photo-grid">
                {photos.map((photo: Photo) => <PhotoGridItem {...photo} key={photo._id} />)}
            </ul>
            <style jsx>{`
                .photo-grid {
                    list-style-type: none;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                    margin: 0;
                    padding: 4px;;
                    box-sizing: border-box;
                    gap: 4px;
                    margin:  0 0 10rem 0;
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
