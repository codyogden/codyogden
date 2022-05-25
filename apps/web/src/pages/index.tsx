import BlogGrid from '@components/BlogGrid';
import Layout from '@components/Layout';
import PhotoGrid from '@components/PhotoGrid';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Photo, Post } from 'src/types/wordpress';
import fetcher from 'src/utils/fetcher';

interface IndexPageProps {
    photos: {
        [key: string]: any;
        data: Photo[];
    };
    posts: Post[];
}

const IndexPage: NextPage<IndexPageProps> = ({
    photos,
    posts,
}) => {
    return <Layout>
        <section>
            <BlogGrid posts={posts} />
        </section>
        <section>
            <PhotoGrid
                total={photos.meta.total}
                photos={photos.data}
                FinalItem={() => <>
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
                </>}
            />
        </section>
    </Layout>;
};

export const getStaticProps: GetStaticProps = async () => {
    const posts = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/posts`);
    const photos = await fetcher(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/headless/v1/photos?offset=0&per_page=6`);
    return {
        props: {
            photos: photos,
            posts: posts,
        },
    }
};

export default IndexPage;
