import { injectable, inject } from 'tsyringe';
import { IPostRepository } from '@/features/post/domain/repositories/post.repository';
import { Post } from '@/features/post/domain/entities/post.entity';
import { NotFound } from '@/shared/utils/error';
import { GraphQLContext } from '@/shared/types/context';

@injectable()
export class UpdatePostByIdUseCase {
    constructor(
        @inject("PostRepository") private postRepo: IPostRepository
    ) { }

    async execute(args: { id: string; title: string, content: string }, ctx?: GraphQLContext): Promise<Post | null> {
        const post = await this.postRepo.updateById(args.id, args);

        if (post === null) {
            throw new NotFound('Post not found');
        }

        return post;
    }
}