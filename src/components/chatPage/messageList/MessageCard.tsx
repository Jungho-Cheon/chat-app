import React, { useLayoutEffect, useReducer, useState } from 'react';

// components
import UserAvatar from '../avatar/UserAvatar';

// styled component
import {
  MessageCardContainer,
  MessagePreviewContainer,
  MessageUser,
  MessagePreview,
  MessageInfoContainer,
  TimeAgo,
  UnreadCount,
  MessageCardAvatar,
} from '../../../styles/chatStyles/MessageList-styles/messageCard-styles';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  changeChatroom,
  checkOutChatroom,
  checkReadMessages,
  getCurrentChatroomId,
} from '../../../features/chatroom/chatroomSlice';
import ChatroomType from '../../../features/chatroom/chatroomTypes';

// hooks
import useMessageCard from './useMessageCard';

export interface MessageCardProps {
  email: string;
  chatroomId: string;
  unreadCount: number;
}

export const MessageType = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
};

const MessageCard: React.FunctionComponent<MessageCardProps> = ({
  chatroomId,
  unreadCount,
  email,
}: MessageCardProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentChatroomId = useSelector(getCurrentChatroomId);
  const {
    chatroomAvatar,
    chatroomName,
    messageType,
    previewMessage,
    timeAgo,
  } = useMessageCard(chatroomId);
  const selectChatRoom = (e: React.MouseEvent) => {
    e.preventDefault();
    if (unreadCount > 0) {
      dispatch(checkOutChatroom({ chatroomId, email }));
      dispatch(checkReadMessages({ chatroomId, email }));
    }
    dispatch(changeChatroom(chatroomId));
  };

  const getPreviewMessage = (message: string): string =>
    message.length > 30 ? message.substring(0, 30) + '...' : message;

  return (
    <MessageCardContainer
      unread={false}
      isSelected={chatroomId === currentChatroomId}
      onClick={selectChatRoom}
    >
      <MessageCardAvatar>
        <UserAvatar avatarUrl={chatroomAvatar} width="50px" />
      </MessageCardAvatar>
      <MessagePreviewContainer>
        <MessageUser> {chatroomName} </MessageUser>
        <MessagePreview>
          {messageType === MessageType.IMAGE
            ? '사진'
            : getPreviewMessage(previewMessage)}
        </MessagePreview>
      </MessagePreviewContainer>
      <MessageInfoContainer>
        <TimeAgo>{timeAgo}</TimeAgo>
        <UnreadCount isUnread={unreadCount !== 0}>
          {unreadCount !== 0 && <p>{unreadCount.toString()}</p>}
        </UnreadCount>
      </MessageInfoContainer>
    </MessageCardContainer>
  );
};

export default MessageCard;
