export type PaginatedResponse<T> = {
    data: T[] | null;
    meta: {
        limit: number;
        nextCursor: string | null;
    };
};