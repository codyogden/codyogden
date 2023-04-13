import Image from 'next/image';

const Page = async ({ params }) => {
    // console.log('API URL', `https://${process.env.VERCEL_URL}/api/uses/${params.item}`);
    const url = new URL(`/api/uses/${params.item}`, process.env.VERCEL_URL);
    console.log('url', url);
    const item = await (await fetch(url)).json();
    
    return <>
        <Image src={item.image.src} alt={item.image.alt ?? `${item.name} by ${item.company.name}`} width={item.image.width} height={item.image.height} />
    </>;
};

export default Page;
