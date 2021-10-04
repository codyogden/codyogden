import Head from 'next/head';
import Masthead from './Masthead';

export default function Layout({children}) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Masthead />
            {children}
        </>
    );
}
