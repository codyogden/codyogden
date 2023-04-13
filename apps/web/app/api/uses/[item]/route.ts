export async function GET(request: Request, { params }) {
    const url = new URL(request.url);
    const { data } = await (await fetch(`${url.protocol}//${url.hostname}${(url.port === '3000') ? `:${url.port}` : ''}/api/uses`)).json();
    // @ts-ignore: Returning Response.json runtime error
    return Response.json(data.filter(({ slug }) => slug === params.item)[0] ?? { notFound: true });

}