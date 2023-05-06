import Image from 'next/image';

export async function generateMetadata({ params }) {
    const item = await (await fetch(`http://${process.env.VERCEL_URL}/api/uses/${params.item}`)).json();
    return {
        title: `${item.name} - Uses - Cody Ogden`,
        description: item.description,
    };
}

const Page = async ({ params }) => {
    const item = await (await fetch(`http://${process.env.VERCEL_URL}/api/uses/${params.item}`)).json();
    
    return <>
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
        }}>
            <div>
                <Image style={{ display: 'block', maxWidth: '100%', height: 'auto' }} src={item.image.src} alt={item.image.alt ?? `${item.name} by ${item.company.name}`} width={item.image.width} height={item.image.height} />
            </div>
            <div>
                <h1>{item.name}</h1>
                <div>{item.company.name}</div>
                <p>{item.description}</p>
            </div>
        </div>
    </>;
};

export default Page;
