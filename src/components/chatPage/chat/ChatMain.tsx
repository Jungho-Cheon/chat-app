import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChatroomId } from '../../../features/chatroom/chatroomSlice';

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
  const currentChatroomId = useSelector(getCurrentChatroomId);
  return (
    <ChatMainContainer>
      {/* Header */}

      <ChatSection>
        <Header />
        {currentChatroomId ? (
          <>
            {/* ChatHeader */}
            <ChatHeader />
            {/* Chat Pane */}
            <ChatArea />
            <ChatDivider />
            {/* ChatInput */}
            <ChatInput />
          </>
        ) : (
          <PleaseSelectChat key="please" />
        )}
      </ChatSection>
    </ChatMainContainer>
  );
};

export default ChatMain;
