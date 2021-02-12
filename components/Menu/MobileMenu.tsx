import MenuLinkContext from 'contexts/MenuLinkContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MenuList from './MenuList';
export default function MobileMenu() {
    const router = useRouter();
    const [showMenu, toggleMenu] = useState(false);

    const listStyles = {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    }
    const listItemStyles = {
        display: 'block',
        textAlign: 'right',
        padding: '1rem',
        boxSizing: 'border-box',
        fontSize: '1.5rem',
    };

    const linkStyles = {
        textDecoration: 'none',
    };

    return (
        <div>
            {!showMenu && <button className='menu-toggle open' onClick={() => toggleMenu(!showMenu)} aria-label="Open Main Menu">
                <img src="/images/icons/menu.svg" alt="menu icon" style={{ height: '1.5rem', width: '1.5rem' }} />
            </button>}
            {showMenu && <div className="mobile-menu-container">
                <MenuList listStyles={listStyles} itemStyles={listItemStyles} linkStyles={linkStyles} />
                <div className="close-container">
                    <button className="menu-toggle close" onClick={() => toggleMenu(!showMenu)} aria-label="Close Main Menu">
                        <img src="/images/icons/close.svg" alt="close icon" style={{ height: '1.5rem', width: '1.5rem' }} />
                    </button>
                </div>
            </div>}
            <style jsx>{`
                .mobile-menu-container {
                    position: fixed;
                    height: 100%;
                    width: 100%;
                    top: 0;
                    left: 0;
                    background-color: #fff;
                    z-index: 99999999;
                }
                .menu-toggle {
                    background-color: transparent;
                    border: 0;
                    padding: 0;
                    margin: 0;
                    display: inline-block;
                }
                .close-container {
                    text-align: right;
                    padding: 1.5rem 1rem 1rem 1rem;
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}
