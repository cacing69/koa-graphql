import { container } from 'tsyringe';
import { GraphQLContext } from '@shared/types/context';
import { CreatePostUseCase } from '@features/post/application/usecases/create-post.usecase';
import { FindPostByIdUseCase } from '@features/post/application/usecases/find-post-by-id.usecase';
import { PaginatePostUseCase } from '@features/post/application/usecases/paginate-post.usecase';
import { createPostPayload } from '@features/post/application/payloads/create-post.payload';
import { validateInput } from '@shared/utils/validate-input';


export const postResolvers = {
    getPaginatePosts: (
        args: { cursor: string; limit: number }, context: GraphQLContext
    ) => {
        const useCase = container.resolve(PaginatePostUseCase);
        return useCase.execute(args, context);
    },
    getPostById: (
        args: { id: string }, context: GraphQLContext
    ) => {
        const useCase = container.resolve(FindPostByIdUseCase);
        return useCase.execute(args, context);
    },
    createPost: (
        args: { title: string; content: string }, context: GraphQLContext
    ) => {
        validateInput(createPostPayload, args);

        const useCase = container.resolve(CreatePostUseCase);
        return useCase.execute(args, context);
    }
};
