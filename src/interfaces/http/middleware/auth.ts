import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';

const JWT_SECRET = 'your_jwt_secret'; // Ganti dengan env var di produksi

export async function authMiddleware(ctx: Context, next: Next) {
    const authHeader = ctx.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            ctx.state.user = decoded;
        } catch (err: any) {
            console.warn('Invalid token:', err.message);
            ctx.state.user = null;
        }
    } else {
        ctx.state.user = null;
    }

    await next();
}
