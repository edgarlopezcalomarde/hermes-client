export interface FriendRequest {
  id: string;
  from: import('./user').IUser;
  to: import('./user').IUser;
  status: String;
}
