import type { Middleware } from 'koa';

export const graphiqlPage: Middleware = async (ctx) => {
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
};
