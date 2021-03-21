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
import { getUserData } from '../../../features/auth/authSlice';

import { ChatData } from '../../../features/chatroom/chatroomTypes';

interface ChatMessageProps {
  chatMessage: ChatData;
}

const convertTime = (time: string) => {
  const sendTime = new Date(Date.parse(time) - 9 * 1000 * 60 * 60);
  const prefix = sendTime.getHours() < 12 ? '오전' : '오후';
  const hours = (sendTime.getHours() % 12).toString().padStart(2, '0');
  const minutes = sendTime.getMinutes().toString().padStart(2, '0');
  return prefix + ' ' + hours + ':' + minutes;
};

const ChatMessage: React.FunctionComponent<ChatMessageProps> = ({
  chatMessage,
}: ChatMessageProps): JSX.Element => {
  const { email, messages } = chatMessage;
  const userData = useSelector(getUserData);
  const isMine = email === userData.email;
  const isRead =
    isMine &&
    chatMessage.messages.every(message => message.readUsers?.length >= 2);
  const avatarUrl = isMine
    ? userData.avatarUrl
    : userData.friendData[email]?.avatarUrl;
  return (
    <ChatMessageFlexDirection isMine={isMine}>
      <ChatMessageContainer isMine={isMine}>
        <MessageContainer isMine={isMine}>
          {messages.map(message => (
            <div className="message__wrapper" key={message.messageId}>
              {isMine && !message.isComplete && (
                <i className="fas fa-spinner complete"></i>
              )}
              <div className="message__time">
                <p>{message.insertDate && convertTime(message.insertDate)}</p>
              </div>
              <Message
                type={message.messageType}
                isMine={isMine}
                isCompleted={!isMine || message.isComplete || false}
              >
                {message.messageType === 'FILE' && (
                  <i className="fas fa-paperclip"></i>
                )}

                <span>{message.message}</span>
              </Message>
            </div>
          ))}
          {isMine && isRead && (
            <div className="message__read">
              <p>읽음</p>
            </div>
          )}
        </MessageContainer>
        <UserAvatar avatarUrl={avatarUrl || ''} width="40px" />
      </ChatMessageContainer>
    </ChatMessageFlexDirection>
  );
};

export default React.memo(ChatMessage);
