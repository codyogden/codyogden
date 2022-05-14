import { FC, HTMLAttributes } from 'react';

const Layout: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
}) => {
    return <>
        <header>

        </header>
        <main>{children}</main>
        <footer>
            
        </footer>
    </>;
};

export default Layout;
