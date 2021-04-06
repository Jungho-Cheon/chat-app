import { useEffect, useLayoutEffect, useReducer } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { getUserData } from '../../../features/auth/authSlice';
import ChatroomType, {
  ChatData,
  Message,
} from '../../../features/chatroom/chatroomTypes';
import { getLastElement } from '../../../utils/arrayUtils';
import { calcTimeAgo } from '../../../utils/time';
interface MessageData {
  chatroomAvatar: string;
  chatroomName: string;
  previewMessage: string;
  timeAgo: string;
  messageType: string;
}

import { MessageType } from './MessageCard';

type Action =
  | { type: 'INIT'; payload: MessageData }
  | {
      type: 'CHANGE_MESSAGE';
      payload: { previewMessage: string; messageType: string };
    }
  | { type: 'CHANGE_TIMEAGO'; payload: { timeAgo: string } };

const reducer = (state: MessageData, action: Action): MessageData => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        ...action.payload,
      };
    case 'CHANGE_MESSAGE':
      const { messageType, previewMessage } = action.payload;
      return {
        ...state,
        previewMessage,
        messageType,
      };
    case 'CHANGE_TIMEAGO':
      const { timeAgo } = action.payload;
      return {
        ...state,
        timeAgo,
      };
    default:
      return state;
  }
};
const useMessageCard = (chatroomId: string): MessageData => {
  const { email, friendData } = useSelector(getUserData);
  const chatroom: ChatroomType = useSelector(
    (state: RootStateOrAny) => state.chatroom.data[chatroomId]
  );
  const [messageData, dispatch] = useReducer(reducer, {
    chatroomAvatar: '',
    chatroomName: '',
    previewMessage: '',
    timeAgo: '',
    messageType: '',
  });
  const previewMessageLength = 40;
  let timeAgoTimer: NodeJS.Timeout;
  const getLastMessage = (chatMessages: ChatData[]) => {
    const lastChatMessage = getLastElement<ChatData>(chatMessages);
    if (lastChatMessage === undefined) return undefined;
    return getLastElement<Message>(lastChatMessage.messages);
  };
  useLayoutEffect(() => {
    if (chatroom === undefined) return;
    const opponentEmail = chatroom.participants.find(
      pEmail => pEmail !== email
    );
    if (!opponentEmail) return;
    if (friendData[opponentEmail]) {
      const data = friendData[opponentEmail];
      const lastMessage = getLastMessage(chatroom.chatMessages);
      let messageType, previewMessage, insertDate;
      if (lastMessage === undefined) {
        messageType = MessageType.TEXT;
        previewMessage = '';
        insertDate = '';
      } else {
        messageType = lastMessage.messageType;
        if (messageType === 'IMAGE') previewMessage = '사진';
        else
          previewMessage = lastMessage.message.substr(0, previewMessageLength);
        insertDate = lastMessage.insertDate || '';
      }

      dispatch({
        type: 'INIT',
        payload: {
          chatroomAvatar: data.avatarUrl,
          chatroomName: data.nickname,
          messageType,
          previewMessage,
          timeAgo: calcTimeAgo(insertDate),
        },
      });
    }
  }, [friendData]);

  useEffect(() => {
    const lastMessage = getLastMessage(chatroom.chatMessages);
    if (lastMessage === undefined) return;
    const changeTimaAgo = () =>
      dispatch({
        type: 'CHANGE_TIMEAGO',
        payload: {
          timeAgo: calcTimeAgo(lastMessage.insertDate || ''),
        },
      });
    dispatch({
      type: 'CHANGE_MESSAGE',
      payload: {
        messageType: lastMessage.messageType,
        previewMessage:
          lastMessage.messageType === 'IMAGE'
            ? '사진'
            : lastMessage.message.substr(0, previewMessageLength),
      },
    });
    changeTimaAgo();
    timeAgoTimer = setInterval(changeTimaAgo, 1000 * 60);
    return () => {
      clearInterval(timeAgoTimer);
    };
  }, [chatroom.chatMessages]);

  return messageData;
};

export default useMessageCard;
