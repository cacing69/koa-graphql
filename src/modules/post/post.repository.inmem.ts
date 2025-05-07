import { injectable } from 'tsyringe';
import { IPostRepository } from './post.repository';
import { Post } from './post.entity';

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
