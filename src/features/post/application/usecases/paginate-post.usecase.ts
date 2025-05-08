import { injectable, inject } from 'tsyringe';
import { IPostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/entities/post.entity';
import { GraphQLContext } from '../../../../shared/types/context';

@injectable()
export class PaginatePostUseCase {
    constructor(
        @inject("PostRepository") private postRepo: IPostRepository
    ) { }

    execute(args: { page: number; limit: number }, ctx?: GraphQLContext): Post[] {

        const page = args.page ?? 1;
        const limit = args.limit ?? 10;

        return this.postRepo.paginate(page, limit);
    }
}