import { container } from 'tsyringe';
import { IPostRepository } from './domain/repositories/post.repository';
import { PostService } from './application/services/post.service';
import { InMemoryPostRepository } from './infrastructure/graphql/persistence/post.repository.inmem';

// Register Dependency
export const registerPostDependencies = () => {
    container.register<IPostRepository>('PostRepository', {
        useClass: InMemoryPostRepository,
    });

    container.register<PostService>('PostService', {
        useClass: PostService,
    });
};
