import { photoURL } from '@lib/cockpit';

export const PhotoGridModal = ({ closeHandler, active, photo }) => {
    const activeClass = (active) ? 'active' : '';

    const closeModal = (e) => {
        e.target.classList.contains('photo-modal-container') && closeHandler()
    };
    return (<>
        {active && <>
            <div className={['photo-modal-container', activeClass].join(' ')} onClick={closeModal}>
                <div className="photo-modal">
                    <img src={photoURL(photo.photo.path)} />
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
                background-color: rgba(0,0,0,0.6);
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
                transition: opacity 200ms linear;
            }
            @media screen and (orientation:portrait) {
                .photo-modal {
                    background-color: #fff;
                    height: 80vw;
                    width: 80vw;
                }
            }

            @media screen and (orientation:landscape) {
                .photo-modal {
                    background-color: #fff;
                    height: 80vh;
                    width: 80vh;
                }
            }
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                display: block;
            }
        `}</style>
    </>);
};
