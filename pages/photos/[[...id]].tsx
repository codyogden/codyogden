import Layout from '_components/Layout';
import PhotoGrid from '_components/PhotoGrid';
import { collections, collectionsItem, photoURL } from '@lib/cockpit';
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
    }, 12);

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
        toggleFirstLoad();
        loadMorePosts();
    }, [skip]);

    return (
        <>
            <Layout>
                <Head>
                    <title>Photos - Cody Ogden</title>
                    {single && <>
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:site" content="@codyogden" />
                        <meta name="twitter:creator" content="@codyogden"></meta>
                        <meta name="twitter:title" content={single.entries[0].description} />
                        <meta name="twitter:description" content={single.entries[0].alt} />
                        <meta name="twitter:image:src" content={photoURL(single.entries[0].photo.path)} />
                        <meta name="twitter:image:alt" content={single.entries[0].alt} />
                        <meta name="twitter:image" content={photoURL(single.entries[0].photo.path)} />
                        <meta property="og:title" content={single.entries[0].description} />
                        <meta property="og:url" content={`https://codyogden.com/photos/${single.entries[0]._id}`} />
                        <meta property="og:description" content={single.entries[0].alt} />
                        <meta property="og:image" content={photoURL(single.entries[0].photo.path)} />
                        <meta property="og:image:alt" content={photoURL(single.entries[0].photo.path)} />
                    </>}
                </Head>
                <PhotoGrid photos={entries} open={(single.entries?.length) ? single.entries[0] : false} />
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

export async function getStaticProps({ params }) {
    const limit = 12;
    const photos = await (fetch(collections('photos', { limit, 'sort[_created]': -1 })).then(r => r.json()));
    let single = false;
    if (params.id) {
        single = await (fetch(collectionsItem('photos'), {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filter: {
                    _id: params.id[0]
                }
            })
        }).then(r => r.json()));
    }
    return {
        props: {
            photos,
            limit,
            single,
        },
        revalidate: 10,
    }
}

export async function getStaticPaths() {
    const photos = await fetch(collections('photos', { limit: -1 })).then(r => r.json());
    const paths = photos.entries.reduce((paths, photo) => {
        const newPath = {
            params: {
                id: [photo._id],
            }
        };
        paths.push(newPath);
        return paths;
    }, []);
    return {
        paths: [
            {
                params: {
                    id: false,
                }
            },
            ...paths
        ],
        fallback: 'blocking'
    }
}
