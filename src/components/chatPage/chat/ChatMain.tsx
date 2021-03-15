import React from 'react';
import { useSelector } from 'react-redux';
import { chatdataSelector } from '../../../features/chatData/chatDataSlice';

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
} from '../../../styles/chatStyles/chatMain-styles';

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
