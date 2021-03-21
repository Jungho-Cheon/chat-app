export interface SignUpProps {
  email: string;
  nickname: string;
  password: string;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface FriendData {
  email: string;
  nickname: string;
  avatarUrl: string;
  description: string;
  isLoggin: boolean;
}

export interface UserData {
  email: string;
  nickname: string;
  avatarUrl: string;
  friendData: Record<string, FriendData>;
  chatroomIds: string[];
}

export interface SignInResponse {
  statusCode: number;
  message: string;
  userData: UserData;
  accessToken: string;
}

export enum SignUpState {
  IDLE,
  SUCCESS,
  FAILED,
}

export enum SignInState {
  IDLE,
  SUCCESS,
  EMAIL_INVALID,
  PASSWORD_INVALID,
}
