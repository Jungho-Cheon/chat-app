import React, { useEffect, useRef, useState } from 'react';

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
import { getUserData } from '../../../features/auth/authSlice';
import { FriendData } from '../../../features/auth/authTypes';

const ChatArea = (): JSX.Element => {
  const currentChatroom = useSelector(getCurrentChatroom);
  const chatPaneContainer = useRef<HTMLDivElement>(null);
  const userData = useSelector(getUserData);

  useEffect(() => {
    // scroll to bottom
    if (chatPaneContainer.current !== null)
      chatPaneContainer.current.scrollTop =
        chatPaneContainer.current.scrollHeight;
  }, [currentChatroom.chatMessages]);

  const createChatMessage = () => {
    const { chatMessages } = currentChatroom;
    return chatMessages.map(chatMessage => (
      <ChatMessage chatMessage={chatMessage} key={nanoid()} />
    ));
  };
  return (
    <ChatPaneContainer ref={chatPaneContainer}>
      <ChatPaneWrapper>{createChatMessage()}</ChatPaneWrapper>
    </ChatPaneContainer>
  );
};

export default React.memo(ChatArea);
