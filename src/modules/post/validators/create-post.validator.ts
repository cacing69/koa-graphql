import { z } from 'zod'

export const createPostValidator = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address')
})

export type CreatePostValidator = z.infer<typeof createPostValidator>
