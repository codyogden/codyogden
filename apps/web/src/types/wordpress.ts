export interface PostType {
    id: number;
}

export interface Post extends PostType {
    slug: string;
    title: string;
    content: string;
    date_gmt: string;
    date: string;
}

export interface Page extends PostType {}
export interface Photo extends PostType {}
