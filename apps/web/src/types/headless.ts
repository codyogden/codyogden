export interface HeadlessResponse<P> {
    meta: {
        total: number;
        per_page: number;
    }
    data: P[];
}
