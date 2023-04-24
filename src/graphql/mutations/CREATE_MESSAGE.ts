import { gql } from '@apollo/client';

const CREATE_MESSAGE = gql`
  mutation Mutation(
    $text: String
    $receiver: String
    $sender: String
    $image: String
  ) {
    createMessage(
      text: $text
      receiver: $receiver
      sender: $sender
      image: $image
    ) {
      createdAt
      id
      read
      receiver
      text
      sender
      image
    }
  }
`;

export default CREATE_MESSAGE;
