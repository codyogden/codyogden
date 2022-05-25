import { FC } from 'react';

const Loading: FC = () => {
    return <div
        css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
        }}
    >
        Loading...
    </div>;
};

export default Loading;