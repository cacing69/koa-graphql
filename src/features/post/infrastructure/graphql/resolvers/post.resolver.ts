import { container } from 'tsyringe';
import { PostService } from '../../../application/services/post.service';
import { GraphQLContext } from '../../../../../types/context';
import { CreatePostUseCase } from '../../../application/usecases/create-post.usecase';

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
