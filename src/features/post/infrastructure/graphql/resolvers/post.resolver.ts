import { container } from 'tsyringe';
import { GraphQLContext } from '@/shared/types/context';
import { CreatePostUseCase } from '@/features/post/application/usecases/create-post.usecase';
import { FindPostByIdUseCase } from '@/features/post/application/usecases/find-post-by-id.usecase';
import { PaginatePostUseCase } from '@/features/post/application/usecases/paginate-post.usecase';
import { createPostPayload } from '@/features/post/application/payloads/create-post.payload';
import { validateInput } from '@/shared/utils/validate-input';
import { updatePostPayload } from '@/features/post/application/payloads/update-post.payload';
import { UpdatePostByIdUseCase } from '@/features/post/application/usecases/update-post-by-id.usecase';


export const postResolvers = {
    getPaginatedPosts: (
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
        args: { input: { title: string; content: string } }, context: GraphQLContext
    ) => {
        validateInput(createPostPayload, args?.input);

        const useCase = container.resolve(CreatePostUseCase);
        return useCase.execute(args?.input, context);
    },
    updatePostById: (
        args: { input: { id: string, title: string; content: string } }, context: GraphQLContext
    ) => {
        validateInput(updatePostPayload, args?.input);

        const useCase = container.resolve(UpdatePostByIdUseCase);
        return useCase.execute(args?.input, context);
    }
};
