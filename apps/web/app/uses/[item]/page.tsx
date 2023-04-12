import Image from 'next/image';

const Page = async ({ params }) => {
    const item = await (await fetch(`http://localhost:3000/api/uses/${params.item}`, { cache: 'no-cache' })).json();
    return <>
        <Image src={item.image.src} alt={item.image.alt ?? `${item.name} by ${item.company.name}`} width={item.image.width} height={item.image.height} />
    </>;
};

export default Page;
