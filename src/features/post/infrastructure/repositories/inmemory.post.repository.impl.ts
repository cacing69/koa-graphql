import { injectable } from 'tsyringe';
import { Post } from '../../domain/entities/post.entity';
import { IPostRepository } from '../../domain/repositories/post.repository';
import { PaginatedResponse } from '../../../../shared/types/paginated.response';

@injectable()
export class InMemoryPostRepositoryImpl implements IPostRepository {
    private posts: Post[] = [
        { id: '1', title: 'Belajar TypeScript', content: 'TypeScript adalah superset dari JavaScript yang menambahkan type system.' },
        { id: '2', title: 'Pemrograman Koa.js', content: 'Koa.js adalah framework web modern dan minimalis untuk Node.js.' },
        { id: '3', title: 'GraphQL Dasar', content: 'GraphQL memungkinkan client untuk meminta data secara fleksibel.' },
        { id: '4', title: 'Clean Architecture', content: 'Clean Architecture memisahkan concern dan membuat kode lebih maintainable.' },
        { id: '5', title: 'Dependency Injection di Node.js', content: 'Menggunakan InversifyJS untuk manajemen dependency injection.' }
    ];

    insert(post: Post): Post {
        this.posts.push(post);
        return post;
    }

    paginate(cursor: string, limit: number): PaginatedResponse<Post> {
        // const startIndex = (page - 1) * limit;
        // const endIndex = startIndex + limit;

        return {
            results: this.posts,
            pagination: {
                limit: limit,
                nextCursor: `1`,
            }
        };
    }

    getById(id: string): Post | null {
        return this.posts.find(p => p.id === id) || null;
    }

    updateById(id: string, data: Partial<Post>): Post | null {
        const postIndex = this.posts.findIndex(p => p.id === id);

        if (postIndex === -1) {
            return null; // Post not found
        }

        const updatedPost = { ...this.posts[postIndex], ...data };

        this.posts[postIndex] = updatedPost;

        return updatedPost;
    }
}
