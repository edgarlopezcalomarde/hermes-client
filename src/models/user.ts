import { Chat } from './chat';
import { FriendRequest } from './friendrequest';

export interface IUser {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  chats: [Chat];
  friends: [IUser];
  friendRequest: [FriendRequest];
  avatarImg: String;
}
