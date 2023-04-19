import { gql } from '@apollo/client';

const ALL_USERS = gql`
  query Query {
    allUsers {
      name
      username
      id
      friendRequest {
        id
        status
        from {
          id
          username
        }
        to {
          id
          username
        }
      }
    }
  }
`;

export default ALL_USERS;
