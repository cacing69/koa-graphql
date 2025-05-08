import { injectable } from 'tsyringe';
import { Post } from '../../domain/entities/post.entity';
import { IPostRepository } from '../../domain/repositories/post.repository';

@injectable()
export class InMemoryPostRepositoryImpl implements IPostRepository {
    private posts: Post[] = [
        new Post('1', 'Belajar TypeScript', 'TypeScript adalah superset dari JavaScript yang menambahkan type system.'),
        new Post('2', 'Pemrograman Koa.js', 'Koa.js adalah framework web modern dan minimalis untuk Node.js.'),
        new Post('3', 'GraphQL Dasar', 'GraphQL memungkinkan client untuk meminta data secara fleksibel.'),
        new Post('4', 'Clean Architecture', 'Clean Architecture memisahkan concern dan membuat kode lebih maintainable.'),
        new Post('5', 'Dependency Injection di Node.js', 'Menggunakan InversifyJS untuk manajemen dependency injection.'),
    ];

    insert(post: Post): Post {
        this.posts.push(post);
        return post;
    }

    paginate(page?: number, limit?: number): Post[] {
        return this.posts;
    }

    getById(id: string): Post | null {
        return this.posts.find(p => p.id === id) || null;
    }
}
