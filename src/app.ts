import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import graphqlRouter from './interfaces/http/graphql/router';
import { authMiddleware } from './middleware/auth';

const app = new Koa();

app.use(bodyParser());

app.use(authMiddleware);

app.use(graphqlRouter.routes()).use(graphqlRouter.allowedMethods());

export default app;
