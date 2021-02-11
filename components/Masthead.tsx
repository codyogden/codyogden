import { useRouter } from 'next/router';
const menuLinks = [
    {
        path: '/about',
        pathname: '/about',
        text: 'About',
        target: ''
    },
    {
        path: '/projects',
        pathname: '/projects/[[...slug]]',
        text: 'Projects',
        target: ''
    },
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
    {
        path: '/blog',
        pathname: '/blog/[[...slug]]',
        text: 'Blog',
        target: ''
    }
];
export default function Masthead() {
    const router = useRouter();
    return (
        <header className={(router.pathname === '/') && 'home'}>
            <div className='home-link'>
                {(router.pathname !== '/') && <a href="/">Cody Ogden</a>}
            </div>
            <nav>
                <ul>
                    {menuLinks.map((link) => <li key={link.path}>
                        <a href={link.path} className={(router.pathname === link.pathname) && 'current'} target={link.target}>{link.text}</a>
                    </li>)}
                </ul>
            </nav>
            <style jsx>{`
                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                header.home {
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 9999;
                }
                .home-link {
                    box-sizing: border-box;
                    padding: 0 1rem;
                    font-family: 'Indie Flower', sans-serif;
                    font-size: 1.5rem;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    align-items: center;
                }
                ul li {
                    padding: 1rem 1rem;
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
