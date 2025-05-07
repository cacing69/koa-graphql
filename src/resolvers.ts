// import { users, User, Post } from './data'
// import { createUserSchema } from './validators/user'
// import { InputError, NotFound } from './utils/error'

// export const rootValue = {
//     hello: ({ name }: {name : string}) => `Hello ${name} from GraphQL!`,
//     greet: ({ name }: { name: string }) => `Hi, ${name}!`,

//     users: () => users,
//     user: ({ id }: { id: string }) => {
//         const foundUser = users.find(user => user.id === id)
//         if (!foundUser) {
//             throw new NotFound(`User with id "${id}" not found`)
//         }
//         return foundUser
//     },

//     createUser: ({ name, email }: { name: string; email: string }) => {
//         // Validasi input
//         const result = createUserSchema.safeParse({ name, email })

//         if (!result.success) {
//             const issues = result.error.issues.map(issue => issue.message).join(', ')
//             throw new InputError(`Validation failed: ${issues}`)
//         }

//         const { name: validName, email: validEmail } = result.data

//         // Cek duplikat email
//         const exists = users.find(u => u.email === validEmail)

//         if (exists) {
//             throw new InputError('Email already exists')
//         }

//         const newUser: User = {
//             id: String(users.length + 1),
//             name: validName,
//             email: validEmail,
//             posts: []
//         }
//         users.push(newUser)
//         return newUser
//     },

//     createPost: ({ userId, title, content }: { userId: string, title: string, content: string }) => {
//         const foundUser = users.find(user => user.id === userId)
//         if (!foundUser) {
//             throw new InputError(`User with id "${userId}" not found`)
//         }

//         const newPost: Post = {
//             id: String(foundUser.posts.length + 1),
//             title,
//             content,
//             userId
//         }

//         foundUser.posts.push(newPost)
//         return newPost
//     }
// }
