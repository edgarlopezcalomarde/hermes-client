import { gql } from '@apollo/client';

const UPDATE_USER = gql`
  mutation Mutation(
    $updateUserId: String
    $name: String
    $username: String
    $avatar: String
  ) {
    updateUser(
      id: $updateUserId
      name: $name
      username: $username
      avatar: $avatar
    ) {
      avatarImg
      name
      username
      id
    }
  }
`;

export default UPDATE_USER;
