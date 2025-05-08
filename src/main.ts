import 'reflect-metadata';
import Koa, { Context } from 'koa';
// import koaCors from 'koa2-cors';
import koaHelmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import graphqlRouter from './interfaces/graphql/router';
import { authMiddleware } from './interfaces/http/middleware/auth';
import serve from 'koa-static';
import path from 'path';

import './shared/container';
import cors from '@koa/cors';

const app = new Koa();

app.use(cors({
    // origin: (ctx : Context) => {
    //     // const allowedOrigins = ['https://studio.apollographql.com'];
    //     // const requestOrigin = ctx.request.header.origin || '';
    //     // if (allowedOrigins.includes(requestOrigin)) {
    //     //     return requestOrigin;
    //     // }
    //     return '*'; // disallow everything else
    // },
    origin: "*",
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(async (ctx, next) => {
    if (ctx.method === 'OPTIONS') {
        ctx.status = 204;
        return;
    }
    await next();
});

// app.use(koaHelmet());

app.use(bodyParser());

app.use(authMiddleware);

app.use(graphqlRouter.routes()).use(graphqlRouter.allowedMethods());



app.use(serve(path.join(__dirname, '../public'))); // Sesuaikan dengan lokasi `graphiql.html`

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
