export enum MESSAGE_TYPE {
  Text = 'TEXT',
  File = 'FILE',
  Url = 'URL',
}

export interface ChatMessageProps {
  isMine: boolean;
  type: MESSAGE_TYPE;
  message: string;
  avatarImage: string;
}
