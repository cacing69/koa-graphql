import { Post } from './post.entity';

export interface IPostRepository {
    insert(post: Post): Post;
    findById(id: string): Post | null;
}
