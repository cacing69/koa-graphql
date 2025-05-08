export class UserService {
    private users = [
        { id: '1', name: 'Ibnul' },
        { id: '2', name: 'Rahmat' }
    ];

    findById(id: string) {
        return this.users.find((user) => user.id === id) || null;
    }
}
