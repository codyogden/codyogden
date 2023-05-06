interface UsesCompany {
    id: string;
    name: string;
    url?: string;
}

interface UsesImage {
    height: number;
    width: number;
    src: string;
    alt?: string;
}

interface UsesProduct {
    id: number | string;
    slug: string;
    name: string;
    company: UsesCompany;
    price: number;
    image: UsesImage;
    description: string;
}

export async function GET() {
    const data: Array<UsesProduct> = [
        {
            id: 1,
            slug: 'mac-studio',
            name: 'Mac Studio',
            description: '',
            company: {
                id: '1',
                name: 'Apple',
                url: 'https://apple.com',
            },
            price: 199900,
            image: {
                height: 1000,
                width: 1000,
                src: `${process.env.ASSETS_URL}/uses/mac-studio.png`,
                alt: 'Mac Studio'
            }
        },
        {
            id: 2,
            slug: 'fidget-cube',
            name: 'Fidget Cube',
            description: '',
            company: {
                id: '2',
                name: 'Antsy Labs',
                url: 'https://www.antsylabs.com',
            },
            price: 2500,
            image: {
                height: 1000,
                width: 1000,
                src: `${process.env.ASSETS_URL}/uses/fidget-cube.png`,
            }
        },
        {
            id: 3,
            slug: 'homepod',
            name: 'HomePod',
            description: 'The HomePod a is a smart speaker.',
            company: {
                id: '1',
                name: 'Apple',
                url: 'https://apple.com',
            },
            price: 29900,
            image: {
                height: 1000,
                width: 1000,
                src: `${process.env.ASSETS_URL}/uses/homepod.png`,
            }
        },
        {
            id: 4,
            slug: 'airpods-pro',
            name: 'AirPods Pro',
            description: '',
            company: {
                id: '1',
                name: 'Apple',
                url: 'https://apple.com',
            },
            price: 24900,
            image: {
                height: 1000,
                width: 1000,
                src: `${process.env.ASSETS_URL}/uses/apple-airpods-pro.png`,
            }
        },
        {
            id: 5,
            slug: 'airpods-max',
            name: 'AirPods Max',
            description: '',
            company: {
                id: '1',
                name: 'Apple',
                url: 'https://apple.com',
            },
            price: 54900,
            image: {
                height: 1000,
                width: 1000,
                src: `${process.env.ASSETS_URL}/uses/airpods-max.png`,
            }
        },
        {
            id: 6,
            slug: 'apple-airtag',
            name: 'AirTag',
            description: '',
            company: {
                id: '1',
                name: 'Apple',
                url: 'https://apple.com',
            },
            price: 2900,
            image: {
                height: 1000,
                width: 1000,
                src: `${process.env.ASSETS_URL}/uses/apple-airtag.png`,
            }
        },
        {
            id: 7,
            slug: 'august-and-opal-laptop-sleeve',
            name: 'Laptop Sleeve',
            description: '',
            company: {
                id: '3',
                name: 'August + Opal',
            },
            price: 4900,
            image: {
                height: 1000,
                width: 1000,
                src: `${process.env.ASSETS_URL}/uses/august-and-opal-laptop-sleeve.png`,
            }
        },
        {
            id: 8,
            slug: 'brother-printer',
            name: 'HL-L2370DW',
            description: '',
            company: {
                id: '4',
                name: 'Brother',
                url: 'https://brother.com'
            },
            price: 15900,
            image: {
                height: 1000,
                width: 1000,
                src: `${process.env.ASSETS_URL}/uses/brother-HL-L2370DW.png`,
            }
        },
        {
            id: 9,
            slug: 'everyman-grafton-pen',
            name: 'Grafton Pen',
            description: '',
            company: {
                id: '5',
                name: 'Everyman',
                url: 'https://everyman.co'
            },
            price: 15900,
            image: {
                height: 1000,
                width: 1000,
                src: `${process.env.ASSETS_URL}/uses/everyman-grafton-pen.png`,
            }
        },
        {
            id: 10,
            slug: 'jcrt-chore-coat',
            name: 'Chore Coat',
            description: '',
            company: {
                id: '6',
                name: 'JCRT',
                url: 'https://jc-rt.com'
            },
            price: 24500,
            image: {
                height: 1000,
                width: 1000,
                src: `${process.env.ASSETS_URL}/uses/jcrt-chore-coat.png`,
            }
        }
    ];
    // @ts-ignore: Returning Response.json runtime error
    return Response.json({
        data,
        meta: {
            total: data.length,
        }
    });
}
