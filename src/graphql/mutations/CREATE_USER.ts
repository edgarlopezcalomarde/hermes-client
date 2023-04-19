import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation Mutation($username: String, $name: String, $password: String) {
    createUser(username: $username, name: $name, password: $password) {
      id
      name
      username
    }
  }
`;

export default CREATE_USER;
