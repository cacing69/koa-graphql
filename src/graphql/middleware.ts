// import { rootValue } from './../resolvers';
// // src/graphql/middleware.ts
// import { graphql } from 'graphql';
// import type { Middleware } from 'koa';
// import { schema } from '../schema';
// import { Context } from 'koa';

// export const graphqlHttp: Middleware = async (ctx: Context) => {
//     const { query, variables, operationName } = ctx.request.body as { query: string; variables?: Record<string, any>; operationName?: string };

//     const result = await graphql({
//         schema,
//         source: query,
//         variableValues: variables,
//         rootValue,
//         operationName,
//         contextValue: {}, // bisa isi user, db, dll
//     });

//     ctx.body = result;
// };
