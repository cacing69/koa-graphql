import { container } from 'tsyringe';
import { registerPostDependencies } from '@features/post/post.container';
import { prisma } from './prisma';

registerPostDependencies();



container.registerInstance('PrismaClient', prisma);

export { container };