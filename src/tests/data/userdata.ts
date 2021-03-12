import { nanoid } from '@reduxjs/toolkit';
import { ChatRoom } from '../../components/messageList/messageCardTypes';

export const testData: ChatRoom[] = [
  {
    chatroomId: 'ChatRoom1',
    chatroomName: 'Johnson Park',
    chatroomAvatar: 'assets/card-avatar-1.jpg',
    previewMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus perspiciatis fugit perferendis quod inventore deserunt natus? Temporibus, provident similique? Mollitia.',
    timeago: '1분',
    unreadCount: 1,
  },
  {
    chatroomId: 'ChatRoom2',
    chatroomName: 'Tom Anderson',
    chatroomAvatar: 'assets/card-avatar-2.jpg',
    previewMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus perspiciatis fugit perferendis quod inventore deserunt natus? Temporibus, provident similique? Mollitia.',
    timeago: '5분',
    unreadCount: 1,
  },
  {
    chatroomId: 'ChatRoom3',
    chatroomName: 'Anna',
    chatroomAvatar: 'assets/card-avatar-3.jpg',
    previewMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus perspiciatis fugit perferendis quod inventore deserunt natus? Temporibus, provident similique? Mollitia.',
  },
];
