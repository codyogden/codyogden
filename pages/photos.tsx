import Layout from '@components/Layout';
import PhotoGrid from '@components/PhotoGrid';
import { collections } from '@lib/cockpit';
import { useState } from 'react';

export default function PhotosPage({ photos, limit }) {
    const [page, incrementPage] = useState(1);
    const [isLoading, updateLoading] = useState(false);
    const [entries, updatePosts] = useState(photos.entries);
    const [loadButtonDisabled, disableButton] = useState(false);

    const loadMorePosts = async () => {
        updateLoading(true);
        const newPosts = await fetch(collections('photos', { limit, skip: page * limit, token: process.env.NEXT_PUBLIC_COCKPIT_PHOTOS_TOKEN })).then(results => results.json());
        updatePosts([
            ...entries,
            ...newPosts.entries
        ]);
        if ([...entries, ...newPosts.entries].length < newPosts.total) {
            incrementPage(page+1);
            updateLoading(false);
        } else {
            disableButton(true);
        }
    };
    return (
        <Layout>
            <PhotoGrid photos={entries} />
            {!loadButtonDisabled && (entries.length < photos.total) && <button onClick={loadMorePosts} disabled={loadButtonDisabled || isLoading}>
                {(isLoading) ? 'Loading': 'Load More'}    
            </button>}
        </Layout>
    );
}

PhotosPage.getInitialProps = async () => {
    const limit = 12;
    const photos = await (fetch(collections('photos', { limit })).then(r => r.json()));
    return {
            photos,
            limit
    }
}
