import { useState } from 'react';
import { ModalProps } from '.';

interface UseModalResult {
    modal: ModalProps;
    hideModal: (cb?: () => void) => void;
    showModal: (cb?: () => void) => void;
}

export const useModal = (): UseModalResult => {
    const [modal, setModal] = useState({
        viewable: false,
    });
    const _hideModal = () => {
        setModal({
            ...modal,
            viewable: false,
        });
    };
    const _showModal = () => {
        setModal({
            ...modal,
            viewable: true,
        });
    };
    return {
        modal: {
            ...modal,
            _hideModal,
        },
        hideModal: (cb = () => false) => {
            _hideModal();
            cb();
        },
        showModal: (cb = () => false) => {
            _showModal();
            cb();
        },
    }
};
