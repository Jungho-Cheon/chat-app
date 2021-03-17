import React, { useEffect } from 'react';

// components
import UserAvatar from '../avatar/UserAvatar';

// styled-components
import {
  ChatMessageFlexDirection,
  ChatMessageContainer,
  MessageContainer,
  Message,
} from '../../../styles/chatStyles/chatMessage-styles';
import { useSelector } from 'react-redux';
import { getUserData, UserData } from '../../../features/auth/authSlice';

import {
  ChatData,
  Participant,
} from '../../../features/chatroom/chatroomTypes';

interface ChatMessageProps {
  chatMessage: ChatData;
  participants: Participant[];
}

const ChatMessage: React.FunctionComponent<ChatMessageProps> = ({
  chatMessage,
  participants,
}: ChatMessageProps): JSX.Element => {
  const { email, messages } = chatMessage;
  const userData = useSelector(getUserData);
  const isMine = email === userData.email;
  const targetUser: Participant = participants.filter(
    user => user.email !== userData.email
  )[0];

  return (
    <ChatMessageFlexDirection isMine={isMine}>
      <ChatMessageContainer isMine={isMine}>
        <MessageContainer isMine={isMine}>
          {messages.map(message => (
            <Message
              type={message.type}
              isMine={isMine}
              key={message.messageId}
            >
              {message.type === 'FILE' && <i className="fas fa-paperclip"></i>}
              <span>{message.message}</span>
            </Message>
          ))}
        </MessageContainer>
        <UserAvatar
          avatarUrl={isMine ? userData.avatarUrl : targetUser?.avatarUrl || ''}
          width="40px"
        />
      </ChatMessageContainer>
    </ChatMessageFlexDirection>
  );
};

export default React.memo(ChatMessage);
