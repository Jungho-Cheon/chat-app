import React, { useRef, useState } from 'react';
import EmojiPicker, { IEmojiData } from 'emoji-picker-react';

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
  EmojiPickerWrapper,
  ChatSendButton,
} from '../../styles/chatMain-styles';

const ChatMain = (): JSX.Element => {
  const [text, setText] = useState<string>('');
  const [isEmojiOpened, setIsEmojiOpened] = useState<boolean>(false);
  const textInput = useRef<HTMLInputElement>(null);
  
  const emojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ): void => {
    event.preventDefault();
    setText(text => text + emojiObject.emoji);
  };
  const textChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setText(event.target.value);
  };
  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      // message 처리
      sendMessage();
    }
  };
  const sendMessage = () => {
    console.log(text);
    if (textInput.current !== null) textInput.current.value = '';
  };
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
        <ChatArea />

        <ChatDivider />
        <ChatInputContainer>
          <UploadFileButton>
            <i className="fas fa-paperclip"></i>
          </UploadFileButton>
          <ChatInput
            placeholder="Write your message"
            ref={textInput}
            type="text"
            value={text}
            onChange={textChange}
            onKeyPress={handleEnterKeyPress}
          />
          <EmojiButton onClick={() => setIsEmojiOpened(!isEmojiOpened)}>
            <i className="far fa-smile"></i>
          </EmojiButton>
          {isEmojiOpened && (
            <EmojiPickerWrapper>
              <EmojiPicker onEmojiClick={emojiClick} />
            </EmojiPickerWrapper>
          )}

          <ChatSendButton onClick={sendMessage}>
            <i className="fas fa-paper-plane"></i>
          </ChatSendButton>
        </ChatInputContainer>
      </ChatSection>
    </ChatMainContainer>
  );
};

export default ChatMain;
