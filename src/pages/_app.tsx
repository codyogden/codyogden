import '../assets/styles/global.scss';
import Script from 'next/script';


export default function MyApp({ Component, pageProps }) {
    return <>
        <Script
            async
            defer
            data-website-id="a4f8fe20-bd0b-4a43-887b-00659eee684e"
            src="https://analytics.bale.media/umami.js"
        />
        <Component {...pageProps} />
    </>
}
