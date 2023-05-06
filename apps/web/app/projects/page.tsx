import type { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Projects - Cody Ogden',
    description: 'The things I make.',
};

const Page = () => {
    return <>
        <div style={{
            textAlign: 'center',
            margin: '2em 0',
        }}>
            <h1 style={{
                margin: 0,
            }}>Projects</h1>
            <p style={{
                margin: 0,
            }}>{metadata.description}</p>
        </div>
    </>
};
export default Page;
