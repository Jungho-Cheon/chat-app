import React from 'react';

// components
import UserAvatar from '../avatar/UserAvatar';

// types
import {
  ChatData,
  MESSAGE_TYPE,
  Participant,
} from '../../../features/chatData/chatDataTypes';

// styled-components
import {
  ChatMessageFlexDirection,
  ChatMessageContainer,
  MessageContainer,
  Message,
} from '../../../styles/chatStyles/chatMessage-styles';
import { useSelector } from 'react-redux';
import { userDataSelector } from '../../../features/login/loginSlice';

interface ChatMessageProps {
  chatData: ChatData;
  participants: Participant;
}

const ChatMessage = ({
  chatData,
  participants,
}: ChatMessageProps): JSX.Element => {
  const { userId, messages } = chatData;
  const LoginUserData = useSelector(userDataSelector);
  const isMine = userId === LoginUserData.userId;
  console.log(userId);
  console.log('login user data', LoginUserData);
  console.log('participants', participants);
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
              {message.type === MESSAGE_TYPE.File && (
                <i className="fas fa-paperclip"></i>
              )}
              <span>{message.message}</span>
            </Message>
          ))}
        </MessageContainer>
        <UserAvatar
          avatarUrl={
            isMine ? LoginUserData.avatarUrl : participants[userId]?.avatarUrl
          }
          width="40px"
        />
      </ChatMessageContainer>
    </ChatMessageFlexDirection>
  );
};

export default React.memo(ChatMessage);
