import React from 'react';

// components
import Navbar from '../components/chatPage/navbar/Navbar';
import MessageList from '../components/chatPage/messageList/MessageList';
import ChatMain from '../components/chatPage/chat/ChatMain';

// styled-components
import { ChatPageContainer } from '../styles/chatStyles/chatPage-styles';

const ChatPage = (): JSX.Element => {
  return (
    <ChatPageContainer>
      <Navbar />
      <MessageList />
      <ChatMain />
    </ChatPageContainer>
  );
};

export default ChatPage;
