import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import Animation from './Animation';

interface Props extends HTMLAttributes<HTMLDivElement> {
    callback?: () => void;
}

const Splash: FC<Props> = ({
    className,
    callback,
}) => {
    return <div
        css={{
            display: 'flex',
            justifyContent: 'center',
            flexFlow: 'column',
            alignItems: 'center',
            textAlign: 'center',
            userSelect: 'none',
        }}
        className={className}
    >
        <Animation callback={callback} aria-hidden />
        <p
            className='subtitle'
            css={{
                fontFamily: 'Indie Flower',
                fontSize: '2rem',
                margin: 0,
                marginTop: 4,
                animation: 'MakeThingsFadeIn 800ms linear forwards',
                animationDelay: '2100ms',
                opacity: 0,
            }}
        >
            {`I'm a Technical Account Manager a`} <Link href='https://vercel.com' passHref><a rel='noopener noreferrer'>Vercel</a></Link>.
        </p>
        <noscript>
            <style>{`
                p.subtitle {
                    animation-delay: 700ms;
                }
            `}</style>
        </noscript>
    </div>
};

export default Splash;