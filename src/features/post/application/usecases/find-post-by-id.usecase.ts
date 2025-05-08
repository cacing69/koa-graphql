import { injectable, inject } from 'tsyringe';
import { IPostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/entities/post.entity';
import { NotFound } from '../../../../shared/utils/error';
import { GraphQLContext } from '../../../../shared/types/context';

@injectable()
export class FindPostByIdUseCase {
    constructor(
        @inject("PostRepository") private postRepo: IPostRepository
    ) { }

    execute(args: { id: string; }, ctx?: GraphQLContext): Post {
        const post = this.postRepo.getById(args.id);

        if (!post) {
            throw new NotFound('Post not found');
        }
        return post;
    }
}