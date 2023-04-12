const Page = async ({ params }) => {
    const { title, content } = await (await fetch('http://localhost:3000/api/blog', { cache: 'no-cache' })).json();

    return <>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
};
export default Page;
