export enum MESSAGE_TYPE {
  Text = 'TEXT',
  File = 'FILE',
  Url = 'URL',
}

interface ChatMessage {
  id: string;
  type: MESSAGE_TYPE;
  message: string;
}
export interface ChatMessageProps {
  isMine: boolean;
  messages: ChatMessage[];
  avatarImage: string;
}
