import React from 'react';

// components
import Header from '../Header';
import ChatArea from './ChatArea';
import UserAvatar from '../avatar/UserAvatar';

// styled-components
import {
  ChatMainContainer,
  ChatSection,
  ChatHeader,
  PartnerStatusContainer,
  PartnerStatus,
  StatusIndicator,
  ChatMenu,
  ChatMenuIcons,
  ChatMenuIcon,
  DropdownContents,
  ChatInputContainer,
  UploadFileButton,
  ChatDivider,
  ChatInput,
  EmojiButton,
  ChatSendButton,
} from '../../styles/chatMain-styles';

const ChatMain = (): JSX.Element => {
  return (
    <ChatMainContainer>
      {/* Header */}
      <Header />

      <ChatSection>
        <ChatHeader>
          <UserAvatar avatarUrl="assets/card-avatar-1.jpg" width="100px" />
          <ChatMenu>
            <PartnerStatusContainer>
              <h2>Johnson Park</h2>
              <PartnerStatus>
                <StatusIndicator />
                <p>Online</p>
              </PartnerStatus>
            </PartnerStatusContainer>
            <ChatMenuIcons>
              <ChatMenuIcon>
                <i className="fas fa-user-plus"></i>
              </ChatMenuIcon>
              <ChatMenuIcon>
                <i className="far fa-star"></i>
              </ChatMenuIcon>
              {/* If Selected */}
              {/* <ChatMenuIcon>
              <i className="fas fa-star"></i>
            </ChatMenuIcon> */}
              <ChatMenuIcon>
                <i className="fas fa-info"></i>
              </ChatMenuIcon>
              <ChatMenuIcon>
                <i className="fas fa-ellipsis-v"></i>
                <DropdownContents>
                  <div></div>
                  <ul>
                    <li>
                      <i className="far fa-file-alt"></i>
                      All files
                    </li>
                    <li>
                      <i className="far fa-bell"></i>
                      Notification preference
                    </li>
                    <li>
                      <i className="far fa-user"></i>
                      View Jsonson{"'"}s profile
                    </li>
                    <li>
                      <i className="far fa-trash-alt"></i>
                      Delete conversation
                    </li>
                  </ul>
                </DropdownContents>
              </ChatMenuIcon>
            </ChatMenuIcons>
          </ChatMenu>
        </ChatHeader>

        {/* Chat Pane */}
        <ChatArea></ChatArea>

        <ChatDivider />
        <ChatInputContainer>
          <UploadFileButton>
            <i className="fas fa-paperclip"></i>
          </UploadFileButton>
          <ChatInput placeholder="Write your message" />
          <EmojiButton>
            <i className="far fa-smile"></i>
          </EmojiButton>
          <ChatSendButton>
            <i className="fas fa-paper-plane"></i>
          </ChatSendButton>
        </ChatInputContainer>
      </ChatSection>
    </ChatMainContainer>
  );
};

export default ChatMain;
