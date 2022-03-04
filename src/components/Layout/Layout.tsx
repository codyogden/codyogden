import { FC, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Layout: FC<Props> = ({
    children,
}) => {
    return <>
    {children}
    </>
};

export default Layout;
