import Layout from '@components/Layout';
import PhotoGrid from '@components/PhotoGrid';
import { collections, collectionsItem } from '@lib/cockpit';
import useToggle from 'hooks/useToggle';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { useEffect, useReducer, useState } from 'react';


export default function PhotosPage({ photos, limit, single }) {
    const [firstLoad, toggleFirstLoad] = useToggle(true);
    const [entries, updatePosts] = useState(photos.entries);
    const [isLoading, toggleLoading] = useToggle();
    const [willLoadMore, toggleWillLoadMore] = useToggle(true);
    const [skip, updateSkip] = useReducer((skip) => {
        if (isLoading)
            return skip;
        if (!willLoadMore)
            return skip;
        return skip + limit;
    }, 0);

    useEffect(() => {
        window.addEventListener('scroll', function () {
            if ((document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight) {
                updateSkip();
            }
        });
    }, []);

    const loadMorePosts = async () => {
        toggleLoading();
        const newPosts = await fetch(collections('photos', {
            'sort[_created]': -1,
            limit,
            skip,
            token: process.env.NEXT_PUBLIC_COCKPIT_PHOTOS_TOKEN,
        })).then((result) => result.json());
        updatePosts([...entries, ...newPosts.entries]);
        ([...entries, ...newPosts.entries].length >= newPosts.total) && toggleWillLoadMore();
        toggleLoading();
    };

    useEffect(() => {
        if (firstLoad)
            return toggleFirstLoad();
        if (!isLoading && willLoadMore)
            loadMorePosts();
    }, [skip]);

    return (
        <>
            <Layout>
                <Head>
                    <title>Photos - Cody Ogden</title>
                </Head>
                <PhotoGrid photos={entries} open={single.entries[0]} />
                <div className="auto-scroll-end">
                    <img src="/images/icons/camera.svg" alt="camera icon" />
                    {(!isLoading && willLoadMore) && <p>Scroll to Load More</p>}
                    {(isLoading && willLoadMore) && <p>Loading</p>}
                    {!willLoadMore && <>
                        <p>That's all, folks!</p>
                        <p><a href="#">Scroll to Top</a></p>
                    </>}
                </div>
                <style jsx>{`
                .auto-scroll-end {
                    text-align: center;
                    margin: 5rem 0 20rem 0;
                    font-family: 'Indie Flower', sans-serif;
                }
                .auto-scroll-end p {
                    margin-top: 0;
                    font-size: 2rem;
                }
                .auto-scroll-end a {
                    font-size: 1rem;
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
            </Layout>
        </>
    );
}

export async function getServerSideProps(ctx: NextPageContext) {
    console.log();
    const limit = 12;
    const photos = await (fetch(collections('photos', { limit, 'sort[_created]': -1 })).then(r => r.json()));
    let single = false;
    if (ctx.query.id) {
        single = await (fetch(collectionsItem('photos'), {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filter: {
                    _id: ctx.query.id[0]
                }
            })
        }).then(r => r.json()));
    }
    return {
        props: {
            photos,
            limit,
            single,
        }
    }
}
