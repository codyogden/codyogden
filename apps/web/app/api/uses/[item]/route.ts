export async function GET(request: Request) {
    const { data } = await (await fetch('http://localhost:3000/api/uses')).json();
    // @ts-ignore: Returning Response.json runtime error
    return Response.json(data.filter(({ slug }) => slug === new URL(request.url).searchParams.get('item'))[0] ?? { notFound: true });
}