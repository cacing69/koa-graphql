export const userTypeDefs = `
  type User {
    id: ID!
    name: String!
  }


  extend type Query {
    getUserById(id: ID!): User
  }
`;
