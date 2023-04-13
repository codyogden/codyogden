export async function GET(request: Request, { params }) {
    const { data } = await (await fetch(`https://${process.env.VERCEL_URL}/api/uses`)).json();
    // @ts-ignore: Returning Response.json runtime error
    return Response.json(data.filter(({ slug }) => slug === params.item)[0] ?? { notFound: true });
}