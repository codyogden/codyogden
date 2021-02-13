import Layout from '@components/Layout';
import { singletons } from '@lib/cockpit';
import Head from 'next/head';

export default function AboutPage({ blurb }) {
    return (
        <Layout>
            <Head>
                <title>{blurb.title} - Cody Ogden</title>
            </Head>
            <section className="fw">
                <h2>{blurb.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: blurb.html }}></div>
            </section>
            <style jsx>{`
                .fw {
                display: grid;
                grid-template-columns: 1fr min(65ch, 90%) 1fr;
                padding: 2.5rem 0;
                }
                .fw > * {
                grid-column: 2;
                }
                .fw {
                line-height: 1.45;
                }
                h2 {
                margin: 0;
                }
            `}</style>
        </Layout>
    );
}

export async function getStaticProps() {
    const blurb = await fetch(singletons('blurbabout')).then(result => result.json());
    return {
        props: {
            blurb,
        },
        revalidate: 3600
    }
}
