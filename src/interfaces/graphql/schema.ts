import { buildSchema } from 'graphql';
import { userTypeDefs } from '../../features/user/user.schema';
import { postTypeDefs } from '../../features/post/infrastructure/graphql/schemas/post.schema';

export const schema = buildSchema(`
  type PaginationMeta {
    limit: String!
    nextCursor: String
  }

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  ${userTypeDefs}
  ${postTypeDefs}
`);
