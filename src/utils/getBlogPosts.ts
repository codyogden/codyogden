import { readdirSync } from 'fs';
import { resolve } from 'path';

export interface BlogAttributes {
    title: string;
    date_published: string;
    image?: string;
    image_alt?: string;
    published: boolean;
    meta: {
        description: string;
    }
}

export interface BlogProps extends BlogAttributes {
    slug: string;
    content: string;
    published: boolean;
}

const getBlogPosts: () => Promise<BlogProps[]> = async () => {
    const paths = readdirSync(resolve('src', 'content', 'blog'));
    const files = [];
    for (let i = 0; i < paths.length; i++) {
        const { attributes, html } = await import(`src/content/blog/${paths[i]}`);
        files.push({ slug: paths[i].replace('.md', ''), ...attributes, content: html });
    }

    return files.filter((i) => i.published);
};

export default getBlogPosts;
