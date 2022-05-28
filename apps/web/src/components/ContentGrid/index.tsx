import { FC, HTMLAttributes } from 'react';

const ContentGrid: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
}) => {
    return <div
        css={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr min(90ch, 95%) 1fr 1fr',
            ['& > *']: {
                gridColumn: '3',
                ['&.alignwide']: {
                    gridColumn: '2 / 5',
                },
                ['&.alignfull']: {
                    gridColumn: '1 / 6',
                },
            }
        }}
    >
        {children}
    </div>
};

export default ContentGrid;
