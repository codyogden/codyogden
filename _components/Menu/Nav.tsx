import MenuLinkContext from 'contexts/MenuLinkContext';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import MenuList from './MenuList';
import MobileMenu from './MobileMenu';

export default function Nav() {
    const router = useRouter();

    // Mobile Menu
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }
    const isMobile = () => (width < 768);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    if(isMobile())
        return <MobileMenu />

    const listStyles = {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
    };
    return (
        <nav style={{ display: 'flex' }}>
            <MenuList listStyles={listStyles} itemStyles={{ padding: '1rem 1rem' }} linkStyles={{ textDecoration: 'none' }} />
        </nav>
    );
}
