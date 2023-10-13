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
            <p>I’ve been crafting on the web since 2001, and it all started with a JavaScript program to help me cheat on math homework—fifth grade math is tough! I've held many hats in my career from individual contributor, tech lead, engineering manager, and even company leadership. These days I’m using my experience to design teams and processes which enable, support, and impact the experience of developer customers.</p>
            <p>It’s no secret: developers like talking to developers when they’re solving developer problems. It takes a team filled with technical aptitude, empathy, and excellent communication skills to deliver high value support experiences and build relationships with developer customers. And that’s exactly the kind of teams I assemble and lead with a mission to ensure developers have the best experience possible with my company’s products & technology.</p>
            <p>I currently work with the incredible people building the future of the web at <a href="https://vercel.com">Vercel</a>.</p>
            <p>Outside of work, you might know me as the groundskeeper of the <a href="https://killedbygoogle.com">Google Graveyard</a> where I research Google’s consumer product strategy and their ‘killer’ reputation.</p>
            <p>My dog, Olly, and I live in San Francisco, California.</p>
 </div>
    </div>;
}
