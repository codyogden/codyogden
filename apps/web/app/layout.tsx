import Link from 'next/link';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head />
            <body style={{
                fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
            }}>
                <header style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                }}>
                    <div>
                        <Link href="/">@codyogden</Link>
                    </div>
                    <nav>
                        <ul style={{
                            listStyleType: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                            {[
                                {
                                    id: 0,
                                    href: '/blog',
                                    target: null,
                                    text: 'blog',
                                },
                                {
                                    id: 1,
                                    href: '/uses',
                                    target: null,
                                    text: 'uses'
                                },
                                {
                                    id: 2,
                                    href: '/projects',
                                    target: null,
                                    text: 'projects'
                                },
                                {
                                    id: 3,
                                    href: '/work',
                                    target: null,
                                    text: 'work'
                                },
                                // {
                                //     id: 4,
                                //     href: 'https://twitter.com/codyogden',
                                //     target: '_blank',
                                //     text: 'twitter'
                                // },
                                // {
                                //     id: 5,
                                //     href: 'https://linkedin.com/in/codyogden',
                                //     target: '_blank',
                                //     text: 'linkedin'
                                // },
                            ].map(({ id, href, target, text }) => <li key={id} style={{ padding: '0 4px' }}>
                                <Link href={href} target={target}>{text}</Link>
                            </li>)}
                        </ul>
                    </nav>
                </header>
                <div>
                    {children}
                </div>
            </body>
        </html>
    );
}
