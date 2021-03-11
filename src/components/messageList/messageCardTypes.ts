export interface ChatRoom {
  id: string;
  username: string;
  profileImage: string;
  previewMessage?: string;
  unreadCount?: number;
  timeago?: string;
}
