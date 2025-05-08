import { ZodSchema } from 'zod';
import { InputError } from './error';

export function validateInput<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new InputError(result.error.format());
    }
    return result.data;
}