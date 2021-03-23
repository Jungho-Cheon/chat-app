import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// components
import UserAvatar from '../avatar/UserAvatar';

// styled components
import {
  ChatHeaderContainer,
  ChatMenu,
  PartnerStatusContainer,
  PartnerStatus,
  StatusIndicator,
  ChatMenuIcons,
  ChatMenuIcon,
  DropdownContents,
} from '../../../styles/chatStyles/chatHeader-styles';
import { getCurrentChatroom } from '../../../features/chatroom/chatroomSlice';
import { getUserData } from '../../../features/auth/authSlice';

enum CHATROOM_TYPE {
  SINGLE,
  MULTIMEMBER,
}

const ChatHeader = (): JSX.Element => {
  const { chatroomId, participants } = useSelector(getCurrentChatroom);
  const [online, setOnline] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [description, setDescrtription] = useState<string>('');
  const userData = useSelector(getUserData);

  useLayoutEffect(() => {
    const targetUserEmail = participants.filter(
      user => user.email !== userData.email
    )[0].email;
    const targetUserData = userData.friendData[targetUserEmail];
    console.log(`${targetUserEmail} ${JSON.stringify(targetUserData)}`);
    if (targetUserData) {
      setOnline(targetUserData.isLoggin);
      setAvatarUrl(targetUserData.avatarUrl);
      setNickname(targetUserData.nickname);
      setDescrtription(targetUserData.description);
    }
  }, [chatroomId, userData.friendData]);

  const createChatHeader = (): JSX.Element => {
    return (
      <ChatHeaderContainer>
        <UserAvatar avatarUrl={avatarUrl} width="100px" />
        <ChatMenu>
          <PartnerStatusContainer isOnline={online}>
            <h2>{nickname}</h2>
            <PartnerStatus isOnline={online}>
              <StatusIndicator isOnline={online} />
              <p>{online ? `Online` : `Offline`}</p>
            </PartnerStatus>
            <p className="description">{description}</p>
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
      </ChatHeaderContainer>
    );
  };
  return <>{createChatHeader()}</>;
};

export default ChatHeader;
