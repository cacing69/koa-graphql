import { PaginatedResponse } from '@shared/types/paginated.response';
import { Post } from '../entities/post.entity';


export interface IPostRepository {
    insert(post: Post): Post;
    paginate(cursor: string, limit: number): PaginatedResponse<Post>;
    getById(id: string): Post | null;
}