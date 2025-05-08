import { z } from 'zod'

export const updatePostPayload = z.object({
    title: z.string().optional(),
    content: z.string().optional()
})

export type UpdatePostPayload = z.infer<typeof updatePostPayload>
