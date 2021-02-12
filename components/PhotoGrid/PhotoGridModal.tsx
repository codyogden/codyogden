import { photoURL } from '@lib/cockpit';
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
                -webkit-backdrop-filter: blur(12px);
                backdrop-filter: blur(8px);
                display: none;
                justify-content: center;
                align-items: center;
                opacity: 0;
            }
            .photo-modal-container.active {
                opacity: 1;
                display: flex;
                width: 100%;
                height: 100%;
                transition: opacity 300ms linear;
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
