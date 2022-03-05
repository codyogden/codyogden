import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Layout: FC<Props> = ({
    children,
}) => {
    return <>
    <header>
        <Link href="/" passHref>
            <a css={{
                color: 'currentcolor',
                textDecoration: 'none',
            }}>
                <span
                    css={{
                        display: 'block',
                        fontFamily: 'Indie Flower',
                        fontSize: '1.5rem',
                        padding: '4px 0 0 1rem',
                    }}
                >Cody Ogden</span>
            </a>
        </Link>
    </header>
    {children}
    </>
};

export default Layout;
