import { photoURL } from '@lib/cockpit';
import Head from 'next/head';
import { useState } from 'react';

export const PhotoGridModal = ({ closeHandler, active, photo }) => {
    const [isLoaded, updateLoading] = useState(false);
    const activeClass = (active) ? 'active' : '';

    const closeModal = (e) => {
        if(e.target.classList.contains('photo-modal-container')) {
            closeHandler();
            updateLoading(false);
        }
    };
    return (<>
        {active && <>
            <Head>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@codyogden" />
                <meta name="twitter:creator" content="@codyogden"></meta>
                <meta name="twitter:title" content={photo.description} />
                <meta name="twitter:description" content={photo.alt} />
                <meta name="twitter:image:src" content={photoURL(photo.photo.path)} />
                <meta property="og:title" content={photo.description} />
                <meta property="og:url" content={`https://codyogden.com/photos/${photo._id}`} />
                <meta property="og:description" content={photo.alt} />
                <meta property="og:image" content={photoURL(photo.photo.path)} />
            </Head>
            <div className={['photo-modal-container', activeClass].join(' ')} onClick={closeModal}>
                <div className="photo-modal">
                    <figure>
                        <img src={photoURL(photo.photo.path)} style={!isLoaded ? { opacity: 0 }: { opacity: 1 }} onLoad={() => updateLoading(true)} />
                        <figcaption className="modal-caption">{photo.description}</figcaption>
                    </figure>
                </div>
            </div>
        </>}
        <style jsx>{`
            .photo-modal-container {
                position: fixed;
                top: 0;
                right: 0;
                width: 100%;
                height: 100%;
                display: none;
                justify-content: center;
                align-items: center;
                opacity: 0;
                background-color: rgba(255, 255, 255, .4);
            }
            .photo-modal-container.active {
                opacity: 1;
                display: flex;
                width: 100%;
                height: 100%;
                transition: opacity 300ms linear;
            }
            .photo-modal figure {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }

            @supports ((-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))) {
                .photo-modal-container {
                    background-color: transparent;
                    -webkit-backdrop-filter: blur(12px);
                    backdrop-filter: blur(12px);
                }
            }
            .modal-caption {
                text-align: center;
                background-color: rgba(0,0,0,0.3);
                padding: 0.5rem 0;
                margin-top: 0.25rem;
                font-size: 0.9rem;
                color: #fff;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            @media screen and (orientation:portrait) {
                .photo-modal {
                    height: 80vw;
                    width: 80vw;
                }
            }

            @media screen and (orientation:landscape) {
                .photo-modal {
                    height: 80vh;
                    width: 80vh;
                }
            }
            @media screen and ( min-width: 800px ) {
                .modal-caption {
                    display: none;
                }
            }
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                display: block;
                transition: opacity 200ms linear;
            }
        `}</style>
    </>);
};
