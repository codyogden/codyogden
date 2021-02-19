import MenuLinkContext from 'contexts/MenuLinkContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Nav = dynamic(import('@components/Menu/Nav'), { ssr: false });



const menuLinks = [
    {
        path: '/about',
        pathname: '/about',
        text: 'About',
        target: ''
    },
    // {
    //     path: '/blog',
    //     pathname: '/blog/[[...slug]]',
    //     text: 'Blog',
    //     target: ''
    // },
    // {
    //     path: '/projects',
    //     pathname: '/projects/[[...slug]]',
    //     text: 'Projects',
    //     target: ''
    // },
    {
        path: '/photos',
        pathname: '/photos',
        text: 'Photos',
        target: ''
    },
    {
        path: '/resume',
        pathname: '/resume',
        text: 'Resume',
        target: ''
    },
];

export default function Masthead() {
    const router = useRouter();

    return (
        <header className={(router.pathname === '/') ? 'home' : undefined}>
            <div className='home-link'>
                {(router.pathname !== '/') && <a href="/">Cody Ogden</a>}
            </div>
            <MenuLinkContext.Provider value={menuLinks}>
                <Nav />
            </MenuLinkContext.Provider>
            <style jsx>{`
                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    padding: 1rem 1rem 0.5rem 1rem;
                    box-sizing: border-box;
                }
                header.home {
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 9999;
                }
                .home-link {
                    box-sizing: border-box;
                    font-family: 'Indie Flower', sans-serif;
                    font-size: 1.5rem;
                }
                a {
                    text-decoration: none;
                }
                .home-link a {

                    color: currentColor;
                }
            `}</style>
        </header>
    );
}
