export const userTypeDefs = `
  type User {
    id: ID!
    name: String!
  }


  extend type Query {
    getUser(id: ID!): User
  }
`;
