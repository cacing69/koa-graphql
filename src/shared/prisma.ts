import { PrismaClient } from '@shared/prisma/client';

const isProduction = false;

export const prisma = new PrismaClient({
    log: isProduction
        ? []
        : [{ level: 'query', emit: 'event' }]
});

if (!isProduction) {
    prisma.$on('query', (e: any) => {
        console.log(`\n[PRISMA QUERY LOG]`);
        console.log('Query\t\t:', e.query);
        console.log('Params\t\t:', e.params);
        console.log('Duration\t:', e.duration);
        console.log('-------------------------');
    });
}