import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChatroomId } from '../../../features/chatroom/chatroomSlice';

// components
import ChatArea from './ChatArea';
import ChatInput from './ChatInput';
import PleaseSelectChat from './PleaseSelectChat';

// styled-components
import {
  ChatMainContainer,
  LogoContainer,
} from '../../../styles/chatStyles/chatMain-styles';

const ChatMain = (): JSX.Element => {
  const currentChatroomId = useSelector(getCurrentChatroomId);
  console.log('ChatMain Rerender..');
  return (
    <ChatMainContainer>
      <div className="chat-main__background">
        {/* Logo */}
        <LogoContainer>
          <img src="assets/logo.svg" alt="logo" />
          <h1 className="logo">TALKI</h1>
        </LogoContainer>
        {currentChatroomId ? (
          <>
            {/* Chat Pane */}
            <ChatArea />
            {/* ChatInput */}
            <ChatInput />
          </>
        ) : (
          <PleaseSelectChat key="please" />
        )}
      </div>
    </ChatMainContainer>
  );
};

export default ChatMain;
