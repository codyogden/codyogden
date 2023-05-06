import type { Metadata } from 'next'
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Cody Ogden',
    description: 'Cody Ogden',
};


export default function Page() {
    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr minmax(min(65ch, 100%), 1fr) 1fr 1fr',
    }}><div style={{
        fontWeight: 'normal',
        marginTop: '6em',
        gridColumn: 3,        
    }}>
        <div style={{
            lineHeight: 1.45,
 }}>
            <div style={{
                display: 'inline',
            }}>I'm <h1 style={{
                display: 'inline',
                fontSize: 'inherit',
                fontWeight: 'inherit',
            }}>Cody Ogden</h1>.</div> <p style={{ display: 'inline' }}> I like to do internet things with internet people.
            </p>
            <p>I've been crafting on the web since 2001, and it all started with a JavaScript program to help me cheat on math homework--fifth grade math is tough! I've held many hats in my career: individual contributor, technical lead, engineering manager, and company leadership. I've been lucky to work with companies like General Mills, Target, Best Buy, Rolex, and Charter Communications where I lead scalable, maintainable technology solutions that impact their business, people, and customers.</p>
            <p>You might know me as the groundskeeper at the <a href="https://killedbygoogle.com">Google graveyard</a> where I research Google's consumer product strategy and their 'killer' reputation.</p>
            <p>My dog, Olly, and I live in San Francisco, California.</p>
        </div>
        <ul style={{
            listStyleType: 'none',
            padding: 0,
            margin: 0,
            display: 'flex'
        }}>
                {[
                    {
                        id: 3,
                        href: 'https://bsky.app/profile/codyogden.bsky.social',
                        label: 'blsky'
                    },
                    {
                        id: 0,
                        href: 'https://twitter.com/codyogden',
                        label: 'twitter',
                    },
                    {
                        id: 1,
                        href: 'https://linkedin.com/in/codyogden',
                        label: 'linkedin',
                    },
                    {
                        id: 2,
                        href: 'https://instagram.com/codyogden',
                        label: 'instagram'
                    }
            ].map(({ id, href, label }) => <li style={{
                marginRight: 8,
            }} key={id}>
                <Link href={href} rel="me">
                    {label}
                </Link>
            </li>)}
            </ul>
    </div></div>;
}
