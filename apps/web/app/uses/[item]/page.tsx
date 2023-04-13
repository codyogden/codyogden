import Image from 'next/image';

const Page = async ({ params }) => {
    // console.log('API URL', `https://${process.env.VERCEL_URL}/api/uses/${params.item}`);
    console.log(await (await fetch(`https://codyogden-git-next-codyogden.vercel.app/api/uses/${params.item}`)).json());
    
    return <>
        {/* <Image src={item.image.src} alt={item.image.alt ?? `${item.name} by ${item.company.name}`} width={item.image.width} height={item.image.height} /> */}
    </>;
};

export default Page;
