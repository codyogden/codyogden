import Layout from '@components/Layout';
import PhotoGrid from '@components/PhotoGrid';
import { collections } from '@lib/cockpit';
import useToggle from 'hooks/useToggle';
import Head from 'next/head';
import { useEffect, useReducer, useState } from 'react';


export default function PhotosPage({ photos, limit }) {
    const [firstLoad, toggleFirstLoad] = useToggle(true);
    const [entries, updatePosts] = useState(photos.entries);
    const [willLoadMore, toggleWillLoadMore] = useToggle(true);
    const [isLoading, toggleLoading] = useToggle();
    const [skip, updateSkip] = useReducer((skip) => {
        if(!isLoading)
            return (skip + 12);
        return skip;
    }, 0);

    const loadMorePosts = async () => {
        toggleLoading();
        const newPosts = await fetch(collections('photos', { 'sort[_created]': -1, limit, skip, token: process.env.NEXT_PUBLIC_COCKPIT_PHOTOS_TOKEN })).then(results => results.json());
        updatePosts([
            ...entries,
            ...newPosts.entries
        ]);
        ([...entries, ...newPosts.entries].length >= newPosts.total) && toggleWillLoadMore();
        setTimeout(toggleLoading, 2000);
    };

    useEffect(() => {
        window.addEventListener('scroll', function () {
            if ((document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight) {
                updateSkip();
            }
        });
    }, []);

    useEffect(() => {
        if(firstLoad)
            return toggleFirstLoad();
        if(willLoadMore && !isLoading)
            loadMorePosts();
    }, [skip]);

    return (
        <>
        <Layout>
            <Head>
                <title>Photos - Cody Ogden</title>
            </Head>
            <PhotoGrid photos={entries} />
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

PhotosPage.getInitialProps = async () => {
    const limit = 12;
    const photos = await (fetch(collections('photos', { limit, 'sort[_created]': -1 })).then(r => r.json()));
    return {
        photos,
        limit
    }
}
