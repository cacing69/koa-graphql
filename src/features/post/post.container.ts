import { container } from 'tsyringe';
import { IPostRepository } from './domain/repositories/post.repository';
import { CreatePostUseCase } from './application/usecases/create-post.usecase';
import { FindPostByIdUseCase } from './application/usecases/find-post-by-id.usecase';
import { PaginatePostUseCase } from './application/usecases/paginate-post.usecase';
import { InMemoryPostRepositoryImpl } from './infrastructure/repositories/inmemory.post.repository.impl';
import { UpdatePostByIdUseCase } from './application/usecases/update-post-by-id.usecase';

// Register Dependency
export const registerPostDependencies = () => {
    container.register<IPostRepository>('PostRepository', {
        useClass: InMemoryPostRepositoryImpl,
    });

    container.register<CreatePostUseCase>(CreatePostUseCase, {
        useClass: CreatePostUseCase,
    });

    container.register<FindPostByIdUseCase>(FindPostByIdUseCase, {
        useClass: FindPostByIdUseCase,
    });

    container.register<PaginatePostUseCase>(PaginatePostUseCase, {
        useClass: PaginatePostUseCase,
    });

    container.register<UpdatePostByIdUseCase>(UpdatePostByIdUseCase, {
        useClass: UpdatePostByIdUseCase,
    });
};
