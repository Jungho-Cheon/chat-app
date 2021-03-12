export interface ChatRoom {
  chatroomId: string;
  chatroomName: string;
  chatroomAvatar: string;
  previewMessage?: string;
  unreadCount?: number;
  timeago?: string;
}
