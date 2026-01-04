export const metadata = {
    title: 'Cody Ogden',
    description: 'I like to do internet things with internet people.',
}

export default function Page() {
    return <div style={{
        fontWeight: 'normal',
        display: 'grid',
        gridTemplateColumns: '1fr minmax(min(65ch, 100%), 1fr) 1fr',
        marginTop: '6em',
    }}>
        <div style={{
            gridColumn: 2,
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
            <p>I’ve been crafting on the web since 2001, and it all started with a JavaScript program to help me cheat on math homework—fifth grade math is tough! Since then, I’ve worn many hats—individual contributor, tech lead, engineering manager, and company leadership—and each role has sharpened how I build and lead technical teams that work directly with developer customers.</p>
            <p>These days, I focus on creating high-impact teams that combine technical depth, empathy, and crisp communication to help developers succeed. I believe developer problems are best solved by other developers—and it takes a rare kind of team to meet them where they are, speak their language, and drive real outcomes.</p>
            <p>My work centers around designing and scaling these teams with intention: aligning them to business goals, empowering them to navigate ambiguity, and ensuring they help customers ship their best work using the technology we build.</p>
            <p>I currently work with the incredible people building the future of the web at <a href="https://clerk.com">Clerk</a>. Previously, I was at <a href="https://vercel.com">Vercel</a>.</p>
            <p>Outside of work, you might know me as the groundskeeper of the <a href="https://killedbygoogle.com">Google Graveyard</a> where I research Google’s consumer product strategy and their ‘killer’ reputation.</p>
            <p>My dog, Olly, and I live in San Francisco, California.</p>
 </div>
    </div>;
}
