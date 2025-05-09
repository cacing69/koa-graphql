import { injectable, inject } from 'tsyringe';
import { IPostRepository } from '@/features/post/domain/repositories/post.repository';
import { Post } from '@/features/post/domain/entities/post.entity';
import { NotFound } from '@/shared/utils/error';
import { GraphQLContext } from '@/shared/types/context';

@injectable()
export class FindPostByIdUseCase {
    constructor(
        @inject("PostRepository") private postRepo: IPostRepository
    ) { }

    async execute(args: { id: string; }, ctx?: GraphQLContext): Promise<Post> {
        const post = await this.postRepo.getById(args.id);

        if (post === null) {
            throw new NotFound('Post not found');
        }
        return post;
    }
}