import { z } from 'zod'

export const createPostPayload = z.object({
    title: z.string().min(100),
    content: z.string().email()
})

export type CreatePostPayload = z.infer<typeof createPostPayload>
