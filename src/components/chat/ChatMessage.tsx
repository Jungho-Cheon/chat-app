import React from 'react';

// components
import UserAvatar from '../avatar/UserAvatar';

// types
import { ChatMessageProps, MESSAGE_TYPE } from './chatMessageType';

// styled-components
import {
  ChatMessageFlexDirection,
  ChatMessageContainer,
  Message,
} from '../../styles/chatMessage-styles';

const ChatMessage = ({
  isMine,
  type,
  message,
  avatarImage,
}: ChatMessageProps): JSX.Element => {
  return (
    <ChatMessageFlexDirection isMine={isMine}>
      <ChatMessageContainer type={type} isMine={isMine}>
        <Message type={type} isMine={isMine}>
          {type === MESSAGE_TYPE.File && <i className="fas fa-paperclip"></i>}
          <span>{message}</span>
        </Message>

        <UserAvatar avatarUrl={avatarImage} width="40px" />
      </ChatMessageContainer>
    </ChatMessageFlexDirection>
  );
};

export default ChatMessage;
