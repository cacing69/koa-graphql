import { PaginatedResponse } from '@shared/types/paginated.response';
import { Post } from '../entities/post.entity';


export interface IPostRepository {
    create(post: Post): Promise<Post>;
    paginate(cursor: string, limit: number): Promise<PaginatedResponse<Post>>;
    getById(id: string): Promise<Post | null>;
    updateById(id: string, data: Partial<Post>): Promise<Post | null>;
}