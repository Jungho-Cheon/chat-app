export interface ChatroomRequest {
  chatroomId: string;
}
export interface UrlData {
  url: string;
  title: string;
  description: string;
  image: string;
}
export interface Message {
  messageId: string;
  message: string;
  messageType: string;
  urlData?: UrlData;
  fileUrl?: string;
  readUsers: string[];
  insertDate?: string;
}

export interface ChatData {
  email: string;
  messages: Message[];
}

export interface Participant {
  email: string;
  nickname: string;
  avatarUrl: string;
  description: string;
}
export enum FETCH_CHATROOM_STATUS {
  IDLE,
  PENDING,
  COMPLETED,
}

export interface ChatRoomState {
  status: FETCH_CHATROOM_STATUS;
  currentChatroomId: string;
  socketId: string;
  data: Record<string, ChatroomType>;
}

export interface SendMessageProps {
  chatroomId: string;
  email: string; // 보낸 사람
  userEmail?: string;
  message: Message;
  insertDate?: string;
}

export interface CheckReadMessageProps {
  chatroomId: string;
  email: string;
  messageId: string;
}

export interface CompleteMessageProps {
  insertDate: string;
  chatroomId: string;
  messageId: string;
  newMessageId: string;
}

// Async Thunk Props
export interface ReadCheckChatroomProps {
  chatroomId: string;
  email: string;
}

export interface RequestNextMessagePageProps {
  chatroomId: string;
  page: number;
}
// server response
export interface UploadFileResponse {
  chatroomId: string;
  email: string;
  fileUrl: string;
}

export interface MediaPreviewResponse {
  mediaPreviews: MediaPreviewType[];
}

export interface MediaPreviewType {
  mediaId: string;
  email: string;
  fileUrl: string;
  insertDate: string;
}

export default interface ChatroomType {
  chatroomId: string;
  unreadCount: number;
  totalMessages: number;
  currentPage: number;
  participants: string[];
  chatMessages: ChatData[];
  lastMessageDate: string;
  mediaPreviews: MediaPreviewType[];
}
