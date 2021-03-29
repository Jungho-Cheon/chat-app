import React from 'react';

// components
import ParticipantsProfile from './ParticipantsProfile';
import MediaPreview from './MediaPreview';

// styled-components
import { ChatSideBarContainer } from '../../../styles/chatStyles/sidebarStyles/chatSidebar-styles';
import { useSelector } from 'react-redux';
import { getCurrentChatroomId } from '../../../features/chatroom/chatroomSlice';

const ChatSideBar = (): JSX.Element => {
  const currentChatroomId = useSelector(getCurrentChatroomId);
  return (
    <ChatSideBarContainer>
      {currentChatroomId && (
        <>
          <ParticipantsProfile />
          <MediaPreview />
        </>
      )}
    </ChatSideBarContainer>
  );
};

export default ChatSideBar;
