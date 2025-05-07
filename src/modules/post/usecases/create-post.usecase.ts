import { injectable, inject } from 'tsyringe';
import { IPostRepository } from '../post.repository';
import { Post } from '../post.entity';

@injectable()
export class CreatePostUseCase {
    constructor(
        @inject("PostRepository") private postRepo: IPostRepository
    ) { }

    execute(input: { title: string; content: string }, ctx: any): Post {
        if (!ctx.user) {
            throw new Error('Forbidden');
        }

        const post = new Post(Date.now().toString(), input.title, input.content);
        return this.postRepo.insert(post);
    }
}
