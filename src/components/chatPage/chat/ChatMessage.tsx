import React from 'react';

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

export const compareDate = (
  lastDate: string,
  insertDate: string
): { isNextDay: boolean; date: Date } => {
  const koreanInterval = 9 * 1000 * 60 * 60;
  const insertDateTime: Date = new Date(
    Date.parse(insertDate) - koreanInterval
  );
  const lastDateTime: Date = new Date(Date.parse(lastDate) - koreanInterval);
  if (lastDateTime.getDate() !== insertDateTime.getDate())
    console.log(`${lastDateTime.getDate()} ${insertDateTime.getDate()}`);

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

  return (
    <ChatMessageFlexDirection isMine={isMine}>
      <ChatMessageContainer isMine={isMine}>
        <MessageContainer isMine={isMine}>
          {messages.map((message, idx) => {
            let isNextDay, date;
            if (idx > 0) {
              const cmp = compareDate(
                messages[idx - 1].insertDate || '',
                message.insertDate || ''
              );
              isNextDay = cmp.isNextDay;
              date = cmp.date;
            } else {
              isNextDay = false;
              date = new Date();
            }

            return (
              <article key={message.messageId}>
                {isNextDay && (
                  <div className="message__dateDivider">
                    <div className="message__dateDivider__line" />
                    <div className="message__dateDivider__date">
                      {date.getMonth() + 1 + '월 ' + date.getDate() + '일'}
                    </div>
                  </div>
                )}
                <div className="message__wrapper">
                  {isMine && !message.isComplete && (
                    <i className="fas fa-spinner complete"></i>
                  )}
                  <div className="message__time">
                    <p>
                      {message.insertDate && convertTime(message.insertDate)}
                    </p>
                  </div>
                  <Message
                    type={message.messageType}
                    isMine={isMine}
                    isCompleted={!isMine || message.isComplete || false}
                  >
                    {message.messageType === 'FILE' && (
                      <i className="fas fa-paperclip"></i>
                    )}
                    {message.messageType === 'IMAGE' ? (
                      <img src={message.message} alt={message.messageId} />
                    ) : (
                      <span>{message.message}</span>
                    )}
                  </Message>
                </div>
              </article>
            );
          })}
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
