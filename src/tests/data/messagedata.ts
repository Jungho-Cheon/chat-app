import { nanoid } from '@reduxjs/toolkit';
import {
  ChatMessageProps,
  MESSAGE_TYPE,
} from '../../components/chat/chatMessageType';

export const messages: ChatMessageProps[] = [
  {
    avatarImage: 'assets/card-avatar-1.jpg',
    isMine: false,
    messages: [
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: 'hello this is test message',
      },
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: `hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. `,
      },
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: `hello this is test message. 
        hello this is test message. 
        hello this is test message. 
        hello this is test message. 
        hello this is test message. 
        hello this is test message. 
        hello this is test message. `,
      },
    ],
  },
  {
    avatarImage: 'assets/antonio.jpg',
    isMine: true,
    messages: [
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: `hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. `,
      },
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: `hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. `,
      },
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: `hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. 
          hello this is test message. `,
      },
    ],
  },
  {
    avatarImage: 'assets/card-avatar-1.jpg',
    isMine: false,
    messages: [
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: 'hello',
      },
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: 'hello',
      },
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: 'hello',
      },
    ],
  },
  {
    avatarImage: 'assets/antonio.jpg',
    isMine: true,
    messages: [
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: 'hello',
      },
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: 'hello',
      },
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: 'hello',
      },
    ],
  },
  {
    avatarImage: 'assets/card-avatar-1.jpg',
    isMine: false,
    messages: [
      {
        id: nanoid(),
        type: MESSAGE_TYPE.Text,
        message: 'hello',
      },
      {
        id: nanoid(),
        type: MESSAGE_TYPE.File,
        message: 'file1.txt',
      },
      {
        id: nanoid(),
        type: MESSAGE_TYPE.File,
        message: 'file2.txt',
      },
    ],
  },
];
