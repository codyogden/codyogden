import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="shortcut icon" href="#" type="image/x-icon" />
                <link href={`https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap`} rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
