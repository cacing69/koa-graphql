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

router.get('/graphiql', async (ctx: Context) => {
    ctx.type = 'text/html';
    ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>GraphiQL</title>
        <link rel="stylesheet" href="https://unpkg.com/graphiql/graphiql.min.css" />
      </head>
      <body style="margin: 0;">
        <div id="graphiql" style="height: 100vh;"></div>

        <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/graphiql/graphiql.min.js"></script>

        <script nonce="REPLACE_ME">
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
