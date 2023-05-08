import { gql } from '@apollo/client';

const REGISTER = gql`
  mutation Mutation($username: String, $name: String, $password: String) {
    register(username: $username, name: $name, password: $password) {
      id
      name
      username
    }
  }
`;

export default REGISTER;
