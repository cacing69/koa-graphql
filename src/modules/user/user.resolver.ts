import { UserService } from './user.service';

const userService = new UserService();

export const userResolvers = {
    getUser: ({ id }: { id: string }) => {
        return userService.findById(id);
    },
};
