import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.css';

export const metadata: Metadata = {
    title: 'Uses - Cody Ogden',
    description: 'Things I use.',
};


const UsesPage = async () => {
    const { data, meta } = await (await fetch(`https://codyogden-60i2u8y0x-codyogden.vercel.app/api/uses`, { cache: 'no-cache' })).json();
    return <>
        <ul className={styles['uses-grid']}>
            {data.map(({ id, slug, name, company, price, image: { src, height, width, alt } }) => {
                return <li key={id}>
                    <div className={styles.card}>
                        <Link href={`/uses/${slug}`}>
                            <Image style={{
                                display: 'block',
                                margin: '32px auto 0 auto',
                            }} src={src} height={300} width={300} alt={alt ?? `${name} by ${company}`} />
                        </Link>
                        <div style={{
                            display: 'grid',
                            gridTemplateRows: '1fr 1fr',
                            gridTemplateColumns: '1fr 1fr',
                            marginTop: '1em',
                            gap: 4,
                            fontSize: 14,
                            fontWeight: 300,
                        }}>
                            <div className={styles.company} style={{
                                gridColumn: '1 / 3',
                                color: 'rgba(0,0,0,0.4)',
                            }}>
                                {(company.url) ? <Link href={company.url} target="_blank">{company.name}</Link> : company.name}{/*  · Carry */}
                            </div>
                            <div>{name}</div>
                            <div style={{
                                textAlign: 'right',
                                lineHeight: '16.8px',
                            }}>{(Math.floor(price / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0, })}</div>
                        </div>
                    </div>
                </li>
            })}
        </ul>
    </>;
};

export default UsesPage;
