import { GraphQLContext } from '../../types/context';
import { PostService } from './post.service';

const postService = new PostService();

export const postResolvers = {
    getPost: ({ id }: { id: string }) => {
        return postService.findById(id);
    },
    createPost: (
        { title, content }: { title: string; content: string },
        context: GraphQLContext
    ) => {
        console.log(context.user);

        if (!context.user) {
            throw new Error('Unauthorized');
        }

        return postService.create(title, content);
    }
};
