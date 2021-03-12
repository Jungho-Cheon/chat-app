import React, { useEffect } from 'react';
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
} from '../../styles/chatHeader-styles';

//selector
import { chatdataSelector } from '../../features/chatData/chatDataSlice';

enum CHATROOM_TYPE {
  SINGLE,
  MULTIMEMBER,
}

const ChatHeader = (): JSX.Element => {
  const { currentChatRoomId, data } = useSelector(chatdataSelector);
  let chatroomType: CHATROOM_TYPE = CHATROOM_TYPE.SINGLE;

  useEffect(() => {
    if (typeof currentChatRoomId === 'string') {
      const { participants } = data[currentChatRoomId];
      if (Object.keys(participants).length > 1)
        chatroomType = CHATROOM_TYPE.MULTIMEMBER;
      else {
        chatroomType = CHATROOM_TYPE.SINGLE;
      }
    }
  }, [currentChatRoomId]);

  // 단일 사용자 채팅인 경우와 단체 채팅인 경우를 분기
  const createChatHeader = (): JSX.Element => {
    const { participants } = data[currentChatRoomId as string];
    const userIds = Object.keys(participants);
    switch (chatroomType) {
      case CHATROOM_TYPE.SINGLE:
        const userId = userIds[0];
        const { avatarUrl, isOnline } = participants[userId];
        return (
          <ChatHeaderContainer>
            <UserAvatar avatarUrl={avatarUrl} width="100px" />
            <ChatMenu>
              <PartnerStatusContainer>
                <h2>{userId}</h2>
                <PartnerStatus isOnline={isOnline}>
                  <StatusIndicator isOnline={isOnline} />
                  <p>{isOnline ? `Online` : `Offline`}</p>
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
          </ChatHeaderContainer>
        );
    }

    return <></>;
  };
  return <>{createChatHeader()}</>;
};

export default React.memo(ChatHeader);
