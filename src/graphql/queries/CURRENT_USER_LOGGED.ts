import { gql } from '@apollo/client';

const CURRENT_USER_LOGGED = gql`
  query Query {
    getCurrentUser {
      friends {
        id
        username
        avatarImg
      }
      id
      username
      name
      avatarImg
      friendRequest {
        id
        to {
          id
          username
        }
        status
        from {
          id
          username
        }
      }
    }
  }
`;

export default CURRENT_USER_LOGGED;
