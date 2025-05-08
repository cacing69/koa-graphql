import { z } from 'zod'

export const createPostPayload = z.object({
    title: z.string().min(6),
    content: z.string().min(20)
})

export type CreatePostPayload = z.infer<typeof createPostPayload>