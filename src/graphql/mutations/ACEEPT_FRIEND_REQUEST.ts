import { gql } from '@apollo/client';

const ACEEPT_FRIEND_REQUEST = gql`
  mutation Mutation($requestId: String) {
    acceptFriendRequest(requestId: $requestId) {
      status
      id
    }
  }
`;

export default ACEEPT_FRIEND_REQUEST;
