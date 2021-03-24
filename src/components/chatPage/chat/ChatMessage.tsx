import React from 'react';

// components
import UserAvatar from '../avatar/UserAvatar';

// styled-components
import {
  ChatMessageFlexDirection,
  ChatMessageContainer,
  MessageContainer,
  MessageArticle,
  MessageWrapper,
} from '../../../styles/chatStyles/chatMessage-styles';
import { useSelector } from 'react-redux';
import { getUserData } from '../../../features/auth/authSlice';

import { ChatData, Message } from '../../../features/chatroom/chatroomTypes';

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

export const compareDate = (
  lastDate: string,
  insertDate: string
): { isNextDay: boolean; date: Date } => {
  const koreanInterval = 9 * 1000 * 60 * 60;
  const insertDateTime: Date = new Date(
    Date.parse(insertDate) - koreanInterval
  );
  const lastDateTime: Date = new Date(Date.parse(lastDate) - koreanInterval);
  return {
    isNextDay: lastDateTime.getDate() !== insertDateTime.getDate(),
    date: insertDateTime,
  };
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
  const createMessageComponent = (message: Message): JSX.Element => {
    switch (message.messageType) {
      case 'TEXT':
        return <span>{message.message}</span>;
      case 'FILE':
        return (
          <>
            <i className="fas fa-file"></i>
            <span onClick={() => window.open(message.fileURL, '_blank')}>
              {message.message}
            </span>
          </>
        );
      case 'IMAGE':
        return (
          <img
            className="message__image"
            src={message.message}
            alt={message.messageId}
          />
        );
      case 'URL':
        return (
          <div
            className="message__url"
            onClick={() => window.open(message.urlData?.url, '_blank')}
          >
            <img className="message__url__image" src={message.urlData?.image} />
            <div className="message__url__info">
              <h3>{message.urlData?.title}</h3>
              <p>{message.urlData?.description}</p>
              <span>{message.urlData?.url}</span>
            </div>
          </div>
        );
      default:
        return <></>;
    }
  };
  return (
    <ChatMessageFlexDirection isMine={isMine}>
      <ChatMessageContainer isMine={isMine}>
        <MessageContainer isMine={isMine}>
          {messages.map(message => {
            return (
              <MessageArticle key={message.messageId}>
                <div className="message__wrapper">
                  {isMine && !message.isComplete && (
                    <i className="fas fa-spinner complete"></i>
                  )}
                  <div className="message__time">
                    <p>
                      {message.insertDate && convertTime(message.insertDate)}
                    </p>
                  </div>
                  <MessageWrapper
                    type={message.messageType}
                    isMine={isMine}
                    isCompleted={!isMine || message.isComplete || false}
                  >
                    {createMessageComponent(message)}
                  </MessageWrapper>
                </div>
              </MessageArticle>
            );
          })}
          {isMine && isRead && (
            <div className="message__read">
              <p>읽음</p>
            </div>
          )}
        </MessageContainer>
        {/* TODO: add default avatar */}
        <UserAvatar avatarUrl={avatarUrl || ''} width="40px" />
      </ChatMessageContainer>
    </ChatMessageFlexDirection>
  );
};

export default React.memo(ChatMessage);
