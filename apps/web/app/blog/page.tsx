import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - Cody Ogden',
    description: `The things I write.`,
};

export default function Page() {
    return <div style={{
        fontWeight: 'normal',
        gridColumn: 3,
    }}>
        <div style={{
            textAlign: 'center',
            margin: '2em 0',
            gridColumn: 2,
        }}>
            <h1 style={{
                margin: 0,
            }}>Blog</h1>
            <p style={{
                margin: 0,
            }}>The things I write.</p>
        </div>
    </div>;
}
