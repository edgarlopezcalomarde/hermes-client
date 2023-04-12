import { gql } from '@apollo/client';

export const LOG_IN = gql`
mutation Mutation($username: String, $password: String) {
    login(username: $username, password: $password) {
        id
        name
        token
        username
            
    }
}
`;

