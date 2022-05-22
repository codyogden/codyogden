import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import useOutsideClick from 'src/hooks/useOutsideClick';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    viewable?: boolean;
    _hideModal: () => void;
}

const Modal: FC<ModalProps> = ({
    viewable,
    _hideModal,
    children,
    className,
}) => {
    const [showModal, setShowModal] = useState(viewable);
    const ref = useRef(null);
    useOutsideClick(ref, () => {
        if(showModal) {
            _hideModal();
        }
    });
    useEffect(() => {
        setShowModal(viewable);
    }, [viewable]);
    if(!showModal)
        return <></>;
    return <div
                className={className}
                css={!className && {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(4px)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
        <div ref={ref}>
            {children}
        </div>
    </div>;
};

export default Modal;
