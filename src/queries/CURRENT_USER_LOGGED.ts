import { gql } from '@apollo/client';

const CURRENT_USER_LOGGED = gql`
  query Query {
    getCurrentUser {
      id
      friends {
        id
        username
      }
      friendRequest {
        id
        username
      }
      username
    }
  }
`;

export default CURRENT_USER_LOGGED;
