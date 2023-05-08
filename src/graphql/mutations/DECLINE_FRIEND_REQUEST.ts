import { gql } from '@apollo/client';

const DECLINE_FRIEND_REQUEST = gql`
  mutation Mutation($requestId: String) {
    rejectFriendRequest(requestId: $requestId) {
      id
      status
    }
  }
`;

export default DECLINE_FRIEND_REQUEST;
