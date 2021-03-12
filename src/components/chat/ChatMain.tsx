import React from 'react';

// components
import Header from '../Header';
import ChatArea from './ChatArea';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import PleaseSelectChat from './PleaseSelectChat';

// styled-components
import {
  ChatMainContainer,
  ChatSection,
  ChatDivider,
} from '../../styles/chatMain-styles';
import { useSelector } from 'react-redux';
import { chatdataSelector } from '../../features/chatData/chatDataSlice';

const ChatMain = (): JSX.Element => {
  const { currentChatRoomId } = useSelector(chatdataSelector);
  return (
    <ChatMainContainer>
      {/* Header */}
      <Header />
      {typeof currentChatRoomId === 'string' ? (
        <ChatSection>
          {/* ChatHeader */}
          <ChatHeader />
          {/* Chat Pane */}
          <ChatArea />
          <ChatDivider />
          {/* ChatInput */}
          <ChatInput />
        </ChatSection>
      ) : (
        <PleaseSelectChat key="please" />
      )}
    </ChatMainContainer>
  );
};

export default ChatMain;
