import { useState } from 'react';
import BlogFeed from '@components/BlogFeed';

export default function Blog({ thePosts }) {
    const [page, incrementPage] = useState(2);
    const [isLoading, updateLoading] = useState(false);
    const [posts, updatePosts] = useState(thePosts);
    const [loadButtonDisabled, disableButton] = useState(false);

    const loadMorePosts = async () => {
        const params = new URLSearchParams({
            page: `${page}`
        }).toString();
        updateLoading(true);
        const newPosts = await fetch('/api/blog?' + params).then(results => results.json());
        updatePosts([
            ...posts,
            ...newPosts.posts
        ]);
        if (newPosts.meta.pagination.next) {
            incrementPage(newPosts.meta.pagination.next);
            updateLoading(false);
        } else {
            disableButton(true);
        }
    };

    return (
        <>
            <BlogFeed posts={posts} />
            {!loadButtonDisabled && <button onClick={loadMorePosts} disabled={loadButtonDisabled || isLoading}>
                {(isLoading) ? 'Loading': 'Load More'}    
            </button>}
        </>
    );
}
