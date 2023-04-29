export interface IMessage {
  id?: string;
  sender: string;
  receiver: string;
  text: string;
  read: boolean;
  image: string;
  createdAt: string;
}
