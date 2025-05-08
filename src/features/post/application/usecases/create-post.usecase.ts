import { injectable, inject } from 'tsyringe';
import { IPostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/entities/post.entity';
import { GraphQLContext } from '../../../../shared/types/context';

@injectable()
export class CreatePostUseCase {
    constructor(
        @inject("PostRepository") private postRepo: IPostRepository
    ) { }

    async execute(args: { title: string; content: string }, ctx?: GraphQLContext): Promise<Post> {

        // if (!ctx.user) {
        //     throw new Error('Forbidden');
        // }

        const post = new Post(Date.now().toString(), args.title, args.content);

        return this.postRepo.create(post);
    }
}
