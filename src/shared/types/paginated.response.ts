export type PaginatedResponse<T> = {
    results: T[] | null;
    pagination: {
        limit: number;
        nextCursor: string | null;
    };
};