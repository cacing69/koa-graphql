export const postTypeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  extend type Query {
    getPaginatedPosts(page: Int, limit: Int): [Post!]!
    getPostById(id: ID!): Post
  }

  extend type Mutation {
    createPost(title: String!, content: String!): Post
  }
`;
