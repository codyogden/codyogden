import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, HTMLAttributes } from 'react';

const Layout: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
}) => {
    const { pathname } = useRouter();
    return <>
        <header css={{
            display: 'flex',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            padding: '8px 12px',
            fontSize: '0.8rem',
        }}>
            {(pathname === '/') ? <h1 css={{ fontSize: 'inherit', margin: 0, fontWeight: 'inherit', }}>
                <Link href='/' passHref><a>Cody Ogden</a></Link>
            </h1> : <div>
                <Link href='/' passHref><a>Cody Ogden</a></Link>
            </div>}
            <nav>
                <ul css={{
                    listStyleType: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    ['li:not(:last-of-type):after']: {
                        display: 'inline-block',
                        content: '"-"',
                        padding: '0 0.25rem'
                    },
                }}>
                    <li>
                        <Link href='/about' passHref><a>bio</a></Link>
                    </li>
                    <li>
                        <Link href='/photos' passHref><a>photos</a></Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main>{children}</main>
        <footer>
            
        </footer>
    </>;
};

export default Layout;
