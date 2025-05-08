import 'reflect-metadata';
import Koa, { Context } from 'koa';
import koaCors from 'koa2-cors';
import koaHelmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import graphqlRouter from './interfaces/graphql/router';
import { authMiddleware } from './interfaces/http/middleware/auth';
import serve from 'koa-static';
import path from 'path';

import './shared/container';

const app = new Koa();

app.use(bodyParser());

const allowedOrigins = ["http://localhost:4200"];

app.use(koaCors({
    origin: (ctx: Context) => {
        const requestOrigin = ctx.request.header.origin || '';
        return allowedOrigins.includes(requestOrigin) ? requestOrigin : false;
    },
    allowMethods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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
