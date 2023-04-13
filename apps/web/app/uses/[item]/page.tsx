interface PageParams {
    params: {
        slug: string;
    }
}

export default function Page({ params }: PageParams) {
    return <h1>My Page</h1>;
}
