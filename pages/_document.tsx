import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {

        const analytics = () => {
            if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined')
                return (<script async defer data-website-id="a4f8fe20-bd0b-4a43-887b-00659eee684e" src="https://analytics.bale.media/umami.js"></script>);
        }

        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    {analytics()}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
