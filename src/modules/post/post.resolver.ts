import { container } from 'tsyringe';
import { GraphQLContext } from '../../types/context';
import { PostService } from './post.service';
import { CreatePostUseCase } from './usecases/create-post.usecase';

const postService = new PostService();

export const postResolvers = {
    getPost: ({ id }: { id: string }) => {
        return postService.findById(id);
    },
    createPost: (
        args: { title: string; content: string }, context: GraphQLContext
    ) => {
        // console.log(context.user);

        // if (!context.user) {
        //     throw new Error('Unauthorized');
        // }

        // return postService.create(title, content);
        const useCase = container.resolve(CreatePostUseCase);
        return useCase.execute(args, context);
    }
};
