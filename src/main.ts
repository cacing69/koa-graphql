import 'reflect-metadata';
import Koa from 'koa';
import koaCors from 'koa2-cors';
import koaHelmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import graphqlRouter from './interfaces/http/graphql/router';
import { authMiddleware } from './middleware/auth';
import serve from 'koa-static';
import path from 'path';

import './container';

const app = new Koa();

app.use(bodyParser());

app.use(koaCors({
    origin: '*',
    allowMethods: ['HEAD', 'GET', 'PATCH', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));

// app.use(koaHelmet());

app.use(authMiddleware);

app.use(graphqlRouter.routes()).use(graphqlRouter.allowedMethods());



app.use(serve(path.join(__dirname, '../public'))); // Sesuaikan dengan lokasi `graphiql.html`

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
