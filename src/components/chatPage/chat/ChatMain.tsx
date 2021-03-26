import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChatroomId } from '../../../features/chatroom/chatroomSlice';

// components
import ChatArea from './ChatArea';
import ChatInput from './ChatInput';
import PleaseSelectChat from './PleaseSelectChat';

// styled-components
import { ChatMainContainer } from '../../../styles/chatStyles/chatMain-styles';

const ChatMain = (): JSX.Element => {
  const currentChatroomId = useSelector(getCurrentChatroomId);
  return (
    <ChatMainContainer>
      <div className="chat-main__background">
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
