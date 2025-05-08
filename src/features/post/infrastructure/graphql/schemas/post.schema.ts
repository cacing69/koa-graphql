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

  extend type Mutation {
    createPost(title: String!, content: String!): Post
  }
`;