import { container } from 'tsyringe';
import { registerPostDependencies } from '../features/post/post.container';

registerPostDependencies();

export { container };