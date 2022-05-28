import BlogGrid from '@components/BlogGrid';
import ContentGrid from '@components/ContentGrid';
import Layout from '@components/Layout';
import PhotoGrid from '@components/PhotoGrid';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { HeadlessResponse } from 'src/types/headless';
import { Photo, Post } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface IndexPageProps {
    photos: HeadlessResponse<Photo>;
    posts: HeadlessResponse<Post>;
}

const IndexPage: NextPage<IndexPageProps> = ({
    photos,
    posts,
}) => {
    return <Layout>
        <ContentGrid>
            <section className='alignwide'>
                <h2>Blog</h2>
                <BlogGrid
                    columns={3}
                    posts={posts}
                    FinalItem={() => (posts.meta.total > posts.data.length) ? <>
                        <Link href='/blog' passHref>
                            <a
                                css={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'center',
                                    padding: '1rem 0',
                                }}
                            >
                                More Blog Posts
                            </a>
                        </Link>
                    </> : null}
                />
            </section>
            <section>
                <h2>Photos</h2>
                <PhotoGrid
                    total={photos.meta.total}
                    photos={photos.data}
                    FinalItem={() => (photos.meta.total > 3) ? <>
                        <Link href="/photos" passHref>
                            <a
                                css={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'center',
                                    padding: '1rem 0',
                                }}
                            >
                                More Photos
                            </a>
                        </Link>
                    </> : null}
                />
            </section>
        </ContentGrid>
    </Layout>;
};

export const getStaticProps: GetStaticProps = async () => {
    const posts: HeadlessResponse<Post> = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/posts?per_page=3`);
    const photos = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/photos?offset=0&per_page=6`);
    return {
        props: {
            photos: photos,
            posts: posts,
        },
    }
};

export default IndexPage;
