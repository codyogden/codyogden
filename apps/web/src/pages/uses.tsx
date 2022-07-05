import Layout from '@components/Layout';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRef, useState } from 'react';
import useOnScreen from 'src/hooks/useOnScreen';
import { HeadlessResponse } from 'src/types/headless';
import { UsesItem } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface PageProps {
    items: HeadlessResponse<UsesItem>;
}

const Page: NextPage<PageProps> = ({
    items,
}) => {
    const [_items, setItems] = useState<UsesItem[]>(items.data);
    const hasMoreItems = () => _items.length < items.meta.total;
    const [isLoading, setIsLoading] = useState(false);
    const loadMoreItems = async () => {
        setIsLoading(true);
        const moreItems = await fetcher(`/api/headless/uses?offset=${_items.length}&per_page=${items.meta.per_page}`);
        const allItems: UsesItem[] = [..._items, ...moreItems.data];
        setItems(allItems);
        setTimeout(() => setIsLoading(false), 500);
    };

    const targetLoadMore = useRef(null);
    const isOnScreen = useOnScreen(targetLoadMore);

    if (isOnScreen && hasMoreItems() && !isLoading)
        loadMoreItems();
    return <Layout>
        <Head>
            <title>Uses - Cody Ogden</title>
        </Head>
        <div css={{
            textAlign: 'center',
        }}>
            <h1 css={{ marginBottom: '0.5rem' }}>Uses</h1>
            <p css={{ marginTop: 0 }}>A gallery of the things I use.</p>
        </div>
        <ul
            css={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                listStyleType: 'none',
                gap: '1rem',
                margin: 0,
                padding: '2rem',
                boxSizing: 'border-box',
                ['@media screen and ( max-width: 1200px)']: {
                    gridTemplateColumns: '1fr 1fr 1fr',
                },
                ['@media screen and ( max-width: 950px)']: {
                    gridTemplateColumns: '1fr 1fr',
                },
                ['@media screen and ( max-width: 770px)']: {
                    gridTemplateColumns: '1fr',
                },
            }}
        >
            {_items?.map(({ id, title, fields }, index) => <li
                css={{
                    boxSizing: 'border-box',
                    backgroundColor: 'rgb(244, 244, 244)',
                    padding: '1rem',
                    transition: 'background-color 120ms linear',
                    borderRadius: 8,
                    [':hover']: {
                        backgroundColor: 'rgb(238, 238, 240)',
                        ['img']: {
                            marginTop: '-5px',
                        }
                    },
                    display: 'flex',
                    flexFlow: 'column',
                }}
            key={`uses-${id}-${index}`}>
                <div css={{
                    aspectRatio: '1 / 1',
                    }}>
                    {/* eslint-disable-next-line */}
                    <img
                        css={{
                            display: 'block',
                            margin: '0',
                            maxWidth: '100%',
                            position: 'relative',
                            transition: 'margin-top 200ms linear',
                            ['@media screen and ( max-width: 770px)']: {
                                position: 'static',
                            }
                        }}
                        src={fields.image.sizes.full}
                        alt={`${title} by ${fields.company}`}
                        loading='lazy'
                    />
                </div>
                <div>
                    <div css={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.4)', marginBottom: 4 }}>{fields.company}</div>
                    <div css={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 14,
                        color: 'rgba(0, 0, 0, 0.75)',
                    }}>
                        <div>{title}</div>
                        <div css={{
                            color: 'rgba(0, 0, 0, 0.5)' }}>{fields.price && `$${fields.price}`}</div>
                    </div>
                </div>
            </li>)}
        </ul>
        {(hasMoreItems()) && <div>
            <span css={{ display: 'block', height: '100px', }} ref={targetLoadMore}></span>
        </div>}
    </Layout>;
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
    const items = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/uses`);
    return {
        props: {
            items,
        }
    }
};

export default Page;
