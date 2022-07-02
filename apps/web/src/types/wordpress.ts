export interface PostType {
    id: number;
    date_gmt: string;
    date: string;
    fields?: {
        [key: string]: any;
    }
}

export interface Post extends PostType {
    slug: string;
    title: string;
    content: string;
    featured_image: Photo | null;
    excerpt: string;
}

export interface Page extends PostType {
    slug: string;
    title: string;
    content: string;
}

export interface Photo extends PostType {
    title: string;
    alt: string;
    sizes: {
        [key:string]: string;
        full: string;
        'full-width': string;
        'full-height': string;
    }
}

export interface UsesItem extends PostType {
    title: string;
}
