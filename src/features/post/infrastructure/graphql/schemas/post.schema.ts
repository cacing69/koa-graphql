export const postTypeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  extend type Query {
    getPost(id: ID!): Post
  }

  extend type Mutation {
    createPost(title: String!, content: String!): Post
  }
`;
