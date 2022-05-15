import { MutableRefObject, Ref, useEffect } from 'react';

const useOutsideClick = (ref: MutableRefObject<any>, callback: (e) => void) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback(e);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
};

export default useOutsideClick;
