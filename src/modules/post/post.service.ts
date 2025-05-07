import { randomUUID } from 'crypto';

export class PostService {
    private posts = [
        { id: '1', title: 'First Post', content: 'Hello world!' },
        { id: '2', title: 'Second Post', content: 'Another one.' }
    ];

    findById(id: string) {
        return this.posts.find((post) => post.id === id) || null;
    }

    create(title: string, content: string) {
        const newPost = {
            id: randomUUID(),
            title,
            content,
        };
        this.posts.push(newPost);
        return newPost;
    }
}
