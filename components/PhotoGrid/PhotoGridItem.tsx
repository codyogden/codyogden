import { photoURL } from '@lib/cockpit';

export const PhotoGridItem = ({ clickHandler, photo }) => {
    return (
        <li>
            <button onClick={() => clickHandler(photo)}>
                <figure>
                    <img src={photoURL(photo.photo.path)} alt={photo.alt} />
                    {photo.description && <figcaption>{photo.description}</figcaption>}
                </figure>
            </button>
            <style jsx>{`
                button {
                    background-color: transparent;
                    border: 0;
                    padding: 0;
                    display: block;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                }
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
                li {
                    margin: 0;
                    padding: 0;
                }
                li {
                    grid-column: auto / span 3;
                    grid-row: auto / span 3;
                }
                @media screen and ( min-width: 799px ) {
                    figure:hover figcaption {
                        opacity: 1;
                    }
                    li {
                        grid-column: auto / span 1;
                        grid-row: auto / span 1;
                    }
                    li:nth-child(6n+2) {
                        grid-column: auto / span 2;
                        grid-row: auto / span 2;
                    }
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
