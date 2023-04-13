export async function GET(request: Request) {
    console.log('VERCEL_URL', process.env.VERCEL_URL);
    const { data } = await (await fetch(`${process.env.VERCEL_URL}/api/uses`)).json();
    // @ts-ignore: Returning Response.json runtime error
    return Response.json(data.filter(({ slug }) => slug === new URL(request.url).searchParams.get('item'))[0] ?? { notFound: true });
}