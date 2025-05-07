import Router from 'koa-router';
import { graphql } from 'graphql';
import { schema } from './schema';
import { userResolvers } from '../../../modules/user/user.resolver';
import { Context } from 'koa';
import { postResolvers } from '../../../modules/post/post.resolver';
import jwt from 'jsonwebtoken';

const router = new Router();

const mergedResolvers = {
    ...userResolvers,
    ...postResolvers,
};

router.post('/graphql', async (ctx: Context) => {
    const { query, variables, operationName } = ctx.request.body as {
        query: string;
        variables?: Record<string, any>;
        operationName?: string;
    };

    const result = await graphql({
        schema,
        source: query,
        rootValue: mergedResolvers,
        contextValue: { koa: ctx, user: ctx?.state },
        variableValues: variables,
        operationName,
    });

    ctx.body = result;
});

router.post('/login', async (ctx) => {
    const { name } = ctx.request.body as { name: string };
    const token = jwt.sign({ id: '123', name }, 'your_jwt_secret', { expiresIn: '1h' });
    ctx.body = { token };
});

export default router;
