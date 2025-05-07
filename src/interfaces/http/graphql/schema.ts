import { buildSchema } from 'graphql';
import { userTypeDefs } from '../../../modules/user/user.schema';
import { postTypeDefs } from '../../../modules/post/post.schema';

export const schema = buildSchema(`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  ${userTypeDefs}
  ${postTypeDefs}
`);
