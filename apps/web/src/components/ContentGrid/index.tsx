import { FC, HTMLAttributes } from 'react';

const ContentGrid: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
    className
}) => {
    return <div>
        {children}
    </div>
};

export default ContentGrid;
