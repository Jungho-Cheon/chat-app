import React, { useMemo } from 'react';
// Redux
import { FriendData } from '../../../features/auth/authTypes';
import { getUserData } from '../../../features/auth/authSlice';
import {
  changeChatroom,
  getAllChatrooms,
} from '../../../features/chatroom/chatroomSlice';
// types
import { useDispatch, useSelector } from 'react-redux';
//components
import UserRectAvatar from '../avatar/UserRectAvatar';
import MenuButton from '../menuButton/MenuButton';
// styled-components
import { FriendDetailModalContainer } from '../../../styles/chatStyles/userProfile-styles/friendDetailModal-styles';
// socket
import socket from '../../../socket/socket';

export interface FriendDetailModalProps {
  friendData: FriendData;
  setFriendDetailModalData: (
    value: React.SetStateAction<FriendData | undefined>
  ) => void;
}

const FriendDetailModal = ({
  friendData,
  setFriendDetailModalData,
}: FriendDetailModalProps): JSX.Element => {
  const dispatch = useDispatch();
  const { email } = useSelector(getUserData);
  const allChatrooms = useSelector(getAllChatrooms);
  const existChatroomId = useMemo(() => {
    if (!allChatrooms) return '';
    const opponentEmail = friendData.email;
    return Object.entries(allChatrooms).find(([_, data]) => {
      if (data.participants.length !== 2) return false;
      // const participantEmails = data.participants.map(p => p.email);
      if (data.participants.includes(opponentEmail)) return true;
      return false;
    })?.[1].chatroomId;
  }, [friendData.email, Object.keys(allChatrooms).length]);
  const createChatroom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    // 1. 상대방과 채팅방이 존재하지 않는 경우 채팅방을 개설한다.
    console.log(existChatroomId);
    if (existChatroomId === undefined)
      socket.emit(
        'CREATE_ROOM',
        JSON.stringify({
          chatroomCreateEmail: email,
          opponentEmail: friendData.email,
        })
      );
    // 2. 이미 존재하는 경우 현재 채팅방을 상대방이 존재하는 채팅방으로 이동한다.
    else dispatch(changeChatroom(existChatroomId));
  };
  return (
    <FriendDetailModalContainer>
      <div className="friend-detail-modal-inner">
        <UserRectAvatar avatarUrl={friendData.avatarUrl} width="100px" />
        <h2>{friendData.nickname}</h2>
        <span className="email">{friendData.email}</span>
        <span className="desc">{friendData.description}</span>
        <div className="chat-button" onClick={createChatroom}>
          <p>Start Chat</p>
        </div>
      </div>
      <div className="button-absolute">
        <MenuButton
          iconClass="fas fa-times"
          onClick={e => {
            e.preventDefault();
            setFriendDetailModalData(undefined);
          }}
        />
      </div>
    </FriendDetailModalContainer>
  );
};

export default FriendDetailModal;
