import { Post } from '../entities/post.entity';


export interface IPostRepository {
    insert(post: Post): Post;
    findById(id: string): Post | null;
}
