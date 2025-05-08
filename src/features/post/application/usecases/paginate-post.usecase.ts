import { injectable, inject } from 'tsyringe';
import { IPostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/entities/post.entity';
import { GraphQLContext } from '../../../../shared/types/context';
import { PaginatedResponse } from '../../../../shared/types/paginated.response';

@injectable()
export class PaginatePostUseCase {
    constructor(
        @inject("PostRepository") private postRepo: IPostRepository
    ) { }

    async execute(args: { cursor: string; limit: number }, ctx?: GraphQLContext): Promise<PaginatedResponse<Post>> {

        const cursor = args.cursor;
        const limit = args.limit ?? 10;

        return this.postRepo.paginate(cursor, limit);
    }
}