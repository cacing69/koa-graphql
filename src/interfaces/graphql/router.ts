import Router from 'koa-router';
import { graphql } from 'graphql';
import { schema } from './schema';
import { userResolvers } from '../../features/user/user.resolver';
import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import { postResolvers } from '../../features/post/infrastructure/graphql/resolvers/post.resolver';

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

// router.options('/graphql', async (ctx: Context) => {
//   ctx.status = 204;
//   return;
// });

router.get('/graphiql', async (ctx: Context) => {
  // ctx.set('Content-Security-Policy', "script-src 'self' https://unpkg.com 'nonce-asd'; style-src 'self' https://unpkg.com 'unsafe-inline'; object-src 'none'");

    ctx.type = 'text/html';
    ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>GraphiQL</title>
        <link href="https://unpkg.com/graphiql@2.0.11/graphiql.min.css" rel="stylesheet" />
      </head>
      <body style="margin: 0;">
        <div id="graphiql" style="height: 100vh;"></div>

        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/graphiql@2.0.11/graphiql.min.js"></script>

        <script>
          const graphQLFetcher = graphQLParams =>
            fetch('/graphql', {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(graphQLParams),
              credentials: 'same-origin',
            }).then(response => response.json());

          ReactDOM.render(
            React.createElement(GraphiQL, { fetcher: graphQLFetcher }),
            document.getElementById('graphiql'),
          );
        </script>
      </body>
    </html>
  `;
});

router.post('/login', async (ctx: Context) => {
    const { name } = ctx.request.body as { name: string };
    const token = jwt.sign({ id: '123', name }, 'your_jwt_secret', { expiresIn: '1h' });
    ctx.body = { token };
});

export default router;
