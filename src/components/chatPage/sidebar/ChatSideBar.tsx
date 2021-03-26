import React from 'react';

// components
import ParticipantsProfile from './ParticipantsProfile';
import MediaPreview from './MediaPreview';
import FilePreview from './FilePreview';

// styled-components
import { ChatSideBarContainer } from '../../../styles/chatStyles/sidebarStyles/chatSidebar-styles';

const ChatSideBar = (): JSX.Element => {
  return (
    <ChatSideBarContainer>
      <ParticipantsProfile />
      <MediaPreview />
      {/* <FilePreview /> */}
    </ChatSideBarContainer>
  );
};

export default ChatSideBar;
