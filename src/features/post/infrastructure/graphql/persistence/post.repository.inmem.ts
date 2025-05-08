import { injectable } from 'tsyringe';
import { Post } from '../../../domain/entities/post.entity';
import { IPostRepository } from '../../../domain/repositories/post.repository';

@injectable()
export class InMemoryPostRepository implements IPostRepository {
    private posts: Post[] = [];

    insert(post: Post): Post {
        this.posts.push(post);
        return post;
    }

    findById(id: string): Post | null {
        return this.posts.find(p => p.id === id) || null;
    }
}
