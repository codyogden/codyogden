import Layout from '@components/Layout';
import PhotoGrid from '@components/PhotoGrid';
import { collections } from '@lib/cockpit';
import Head from 'next/head';
import { useEffect, useState } from 'react';


export default function PhotosPage({ photos, limit }) {
    const [page, incrementPage] = useState(1);
    const [isLoading, updateLoading] = useState(false);
    const [entries, updatePosts] = useState(photos.entries);
    const [loadButtonDisabled, disableButton] = useState(false);

    const loadMorePosts = async () => {
        updateLoading(true);
        const newPosts = await fetch(collections('photos', { 'sort[_created]': -1, limit, skip: page * limit, token: process.env.NEXT_PUBLIC_COCKPIT_PHOTOS_TOKEN })).then(results => results.json());
        updatePosts([
            ...entries,
            ...newPosts.entries
        ]);
        if ([...entries, ...newPosts.entries].length < newPosts.total) {
            incrementPage(page+1);
            updateLoading(false);
        } else {
            disableButton(true);
            updateLoading(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', function () {
            if ((document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight) {
                console.log("you're at the bottom of the page");
                // Show loading spinner and make fetch request to api
                loadMorePosts();
            }
        });
    }, []);

    return (
        <>
        <Layout>
            <Head>
                <title>Photos - Cody Ogden</title>
            </Head>
            <PhotoGrid photos={entries} />
            <div className="auto-scroll-end">
                <img src="/images/icons/camera.svg" alt="camera icon" />
                {(isLoading && !loadButtonDisabled) && <p>Loading</p>}
                {loadButtonDisabled && <>
                    <p>That's all, folks!</p>
                    <p><a href="#">Scroll to Top</a></p>
                </>}
                
            </div>
            <style jsx>{`
                .auto-scroll-end {
                    text-align: center;
                    margin: 10rem 0 20rem 0;
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
