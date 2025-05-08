export const postTypeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type PaginatedPost {
    data: [Post!]!
    meta: PaginationMeta!
  }

  extend type Query {
    getPaginatedPosts(cursor: String, limit: Int): PaginatedPost!
    getPostById(id: ID!): Post
  }

  input CreatePostInput {
    title: String
    content: String
  }

  input UpdatePostInput {
    id: ID!
    title: String
    content: String
  }

  extend type Mutation {
    createPost(input: CreatePostInput): Post
    updatePostById(input: UpdatePostInput): Post
  }
`;