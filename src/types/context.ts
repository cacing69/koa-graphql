import { Context as KoaContext } from 'koa';

export interface GraphQLContext {
    koa: KoaContext;
    user?: {
        id: string;
        name: string;
    } | null;
}
