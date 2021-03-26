import React from 'react';

// components
import ParticipantsProfile from './ParticipantsProfile';
import MediaPreview from './MediaPreview';

// styled-components
import { ChatSideBarContainer } from '../../../styles/chatStyles/sidebarStyles/chatSidebar-styles';

const ChatSideBar = (): JSX.Element => {
  return (
    <ChatSideBarContainer>
      <ParticipantsProfile />
      <MediaPreview />
    </ChatSideBarContainer>
  );
};

export default ChatSideBar;
