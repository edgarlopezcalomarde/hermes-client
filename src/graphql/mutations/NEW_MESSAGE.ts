import { gql } from '@apollo/client';

const NEW_MESSAGE = gql`
  mutation Mutation(
    $text: String
    $receiver: String
    $sender: String
    $image: String
  ) {
    newMessage(
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

export default NEW_MESSAGE;
