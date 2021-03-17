import React, { useEffect, useRef } from 'react';

// redux
import { useSelector } from 'react-redux';
import { getCurrentChatroom } from '../../../features/chatroom/chatroomSlice';

// components
import ChatMessage from './ChatMessage';

// styled-components
import {
  ChatPaneContainer,
  ChatPaneWrapper,
} from '../../../styles/chatStyles/chatArea-styles';
import { nanoid } from '@reduxjs/toolkit';

const ChatArea = (): JSX.Element => {
  const currentChatroom = useSelector(getCurrentChatroom);
  const chatPaneContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('ChatArea :', currentChatroom);
    // scroll to bottom
    if (chatPaneContainer.current !== null)
      chatPaneContainer.current.scrollTop =
        chatPaneContainer.current.scrollHeight;
  }, [currentChatroom]);

  const createChatMessage = () => {
    const { chatMessages, chatroomId, participants } = currentChatroom;
    return chatMessages.map(chatMessage => (
      <ChatMessage
        chatMessage={chatMessage}
        participants={participants}
        key={nanoid()}
      />
    ));
  };
  return (
    <ChatPaneContainer ref={chatPaneContainer}>
      <ChatPaneWrapper>{createChatMessage()}</ChatPaneWrapper>
    </ChatPaneContainer>
  );
};

export default React.memo(ChatArea);
