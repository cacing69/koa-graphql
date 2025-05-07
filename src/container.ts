import { container } from 'tsyringe';
import { IPostRepository } from './modules/post/post.repository';
import { InMemoryPostRepository } from './modules/post/post.repository.inmem';

container.register<IPostRepository>("PostRepository", {
    useClass: InMemoryPostRepository,
});
