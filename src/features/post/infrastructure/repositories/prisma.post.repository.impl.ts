import { inject, injectable } from 'tsyringe';
import { Post } from '@/features/post/domain/entities/post.entity';
import { IPostRepository } from '@/features/post/domain/repositories/post.repository';
import { PaginatedResponse } from '@/shared/types/paginated.response';
import { PrismaClient } from '@/shared/prisma/client';
import { InternalServerError, NotFound } from '@/shared/utils/error';

@injectable()
export class PrismaPostRepositoryImpl implements IPostRepository {
    constructor(
        @inject('PrismaClient') private prisma: PrismaClient
    ) { }
    async paginate(cursor: string, limit: number): Promise<PaginatedResponse<Post>> {
        try {
            // Define pagination logic with Prisma
            const posts = await this.prisma.post.findMany({
                take: limit,
                skip: cursor ? 1 : 0,  // Skip the cursor if provided
                cursor: cursor ? { id: cursor } : undefined, // Cursor is based on 'id' in this example
            });

            // Create a paginated response
            const nextCursor = posts.length === limit ? posts[posts.length - 1].id : null;

            return {
                results: posts.map(p => new Post(p.id, p.title, p.content)),
                pagination: {
                    nextCursor,
                    limit,
                },
            };
        } catch (error) {
            console.error('[PostRepository] Failed to paginate posts:', error);
            throw new InternalServerError('Failed to paginate posts', "4");
        }
    }

    async getById(id: string): Promise<Post | null> {
        try {
            const post = await this.prisma.post.findUnique({
                where: { id }
            });

            if (!post) {
                throw new NotFound(`Post with id ${id} not found`);
            }

            return new Post(post.id, post.title, post.content);
        } catch (error) {
            console.error('[PostRepository] Failed to get post by ID:', error);
            throw new InternalServerError('Failed to get post by ID', "5");
        }
    }

    async updateById(id: string, data: Partial<Post>): Promise<Post | null> {
        try {
            const post = await this.prisma.post.update({
                where: { id },
                data: {
                    ...data, // Only the fields that are present in 'data' will be updated
                }
            });

            return new Post(post.id, post.title, post.content);
        } catch (error) {
            console.error('[PostRepository] Failed to update post:', error);
            throw new InternalServerError('Failed to update post', "6");
        }
    }

    async create(post: Post): Promise<Post> {
        try {
            const created = await this.prisma.post.create({
                data: {
                    title: post.title,
                    content: post.content,
                }
            });

            return new Post(created.id, created.title, created.content);
        } catch (error) {
            console.error('[PostRepository] Failed to create post:', error);
            throw new InternalServerError('Failed to create post', "3");
        }
    }
}