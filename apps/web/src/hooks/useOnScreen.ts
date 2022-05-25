import { useEffect, useState } from 'react';

export default function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        if(ref.current) {
            const observer = new IntersectionObserver(
                ([entry]) => setIntersecting(entry.isIntersecting)
            );

            observer.observe(ref.current);
            // Remove the observer as soon as the component is unmounted
            return () => observer.disconnect();
        }
    }, [ref]);

    return isIntersecting
}
