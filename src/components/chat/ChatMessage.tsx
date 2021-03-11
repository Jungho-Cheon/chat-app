import React from 'react';

// components
import UserAvatar from '../avatar/UserAvatar';

// types
import { ChatMessageProps, MESSAGE_TYPE } from './chatMessageType';

// styled-components
import {
  ChatMessageFlexDirection,
  ChatMessageContainer,
  MessageContainer,
  Message,
} from '../../styles/chatMessage-styles';

const ChatMessage = ({
  isMine,
  messages,
  avatarImage,
}: ChatMessageProps): JSX.Element => {
  return (
    <ChatMessageFlexDirection isMine={isMine}>
      <ChatMessageContainer isMine={isMine}>
        <MessageContainer>
          {messages.map(message => (
            <Message type={message.type} isMine={isMine} key={message.id}>
              {message.type === MESSAGE_TYPE.File && (
                <i className="fas fa-paperclip"></i>
              )}
              <span>{message.message}</span>
            </Message>
          ))}
        </MessageContainer>

        <UserAvatar avatarUrl={avatarImage} width="40px" />
      </ChatMessageContainer>
    </ChatMessageFlexDirection>
  );
};

export default ChatMessage;
