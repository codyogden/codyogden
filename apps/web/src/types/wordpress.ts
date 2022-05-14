export interface PostType {
    id: number;
    date_gmt: string;
    date: string;
}

export interface Post extends PostType {
    slug: string;
    title: string;
    content: string;

}

export interface Page extends PostType {
    slug: string;
    title: string;
    content: string;
}
export interface Photo extends PostType {}
