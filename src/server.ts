// import Koa from 'koa'
// import Router from 'koa-router';
// import bodyParser from 'koa-bodyparser'
// import { graphiqlPage } from './routes/graphiql';
// import { graphqlHttp } from './graphql/middleware';

// const app = new Koa()

// const router = new Router();

// // GraphQL Route
// router.post('/graphql', graphqlHttp);

// // GraphiQL UI
// router.get('/graphiql', graphiqlPage);

// app.use(bodyParser())
// app.use(router.routes());
// app.use(router.allowedMethods());

// app.listen(4000, () => {
//     console.log('🚀 GraphQL server running at http://localhost:4000/graphql')
// })

import app from './app';

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
});