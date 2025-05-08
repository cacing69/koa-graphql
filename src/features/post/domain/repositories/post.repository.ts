import { Post } from '../entities/post.entity';


export interface IPostRepository {
    insert(post: Post): Post;
    paginate(page: number, limit: number): Post[];
    getById(id: string): Post | null;
}