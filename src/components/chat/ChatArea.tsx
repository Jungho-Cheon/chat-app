import React, { useEffect, useRef } from 'react';

// components
import ChatMessage from './ChatMessage';

// test data
import { messages } from '../../tests/data/messagedata';
import { nanoid } from '@reduxjs/toolkit';

// styled-components
import {
  ChatPaneContainer,
  ChatPaneWrapper,
} from '../../styles/chatArea-styles';

const ChatArea = (): JSX.Element => {
  const chatPaneContainer = useRef<HTMLDivElement>(null);
  // 아마 리덕스..?

  useEffect(() => {
    if (chatPaneContainer.current !== null)
      chatPaneContainer.current.scrollTop =
        chatPaneContainer.current.scrollHeight;
  }, [messages]);
  return (
    <ChatPaneContainer ref={chatPaneContainer}>
      <ChatPaneWrapper>
        {messages.map(message => (
          <ChatMessage {...message} key={nanoid()} />
        ))}
      </ChatPaneWrapper>
    </ChatPaneContainer>
  );
};

export default ChatArea;
