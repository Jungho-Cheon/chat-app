import { nanoid } from '@reduxjs/toolkit';
import { ChatRoom } from '../../components/messageList/messageCardTypes';

export const testData: ChatRoom[] = [
  {
    id: nanoid(),
    username: 'Johnson Park',
    profileImage: 'assets/card-avatar-1.jpg',
    previewMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus perspiciatis fugit perferendis quod inventore deserunt natus? Temporibus, provident similique? Mollitia.',
    timeago: '1분',
    unreadCount: 1,
  },
  {
    id: nanoid(),
    username: 'Tom Anderson',
    profileImage: 'assets/card-avatar-2.jpg',
    previewMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus perspiciatis fugit perferendis quod inventore deserunt natus? Temporibus, provident similique? Mollitia.',
    timeago: '5분',
    unreadCount: 1,
  },
  {
    id: nanoid(),
    username: 'Anna',
    profileImage: 'assets/card-avatar-3.jpg',
    previewMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus perspiciatis fugit perferendis quod inventore deserunt natus? Temporibus, provident similique? Mollitia.',
  },
];
