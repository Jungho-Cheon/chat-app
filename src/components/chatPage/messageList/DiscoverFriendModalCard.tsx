import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../../features/auth/authSlice';
import socket from '../../../socket/socket';

// styled-components
import {
  DiscoverFriendModalCardContainer,
  FriendRequestButton,
} from '../../../styles/chatStyles/MessageList-styles/discoverFriendModalCard-styles';
import UserAvatar from '../avatar/UserAvatar';

export interface DiscoverFriendModalCardProps {
  email: string;
  nickname: string;
  avatarUrl: string;
  status: string;
}

const DiscoverFriendModalCard = ({
  email,
  nickname,
  avatarUrl,
  status,
}: DiscoverFriendModalCardProps): JSX.Element => {
  const userData = useSelector(getUserData);
  const [buttonStatus, setButtonStatus] = useState<string>(status);
  const buttonClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    let currentStatus = buttonStatus
    switch (buttonStatus) {
      case 'IDLE':
        currentStatus = "PENDING"
        break;
      case 'PENDING':
        currentStatus="IDLE"
        break;
      case 'REJECT':
        currentStatus="REJECT"
        alert(
          '❌ 상대방이 친구 요청을 거절했습니다. 친구가 되기 위해서 상대방으로부터 친구 신청을 받아야 합니다.'
        );
        break;
    }
    setButtonStatus(currentStatus);
    if (['IDLE', 'PENDING'].includes(currentStatus)) {
      console.log('EMIT FRIENT_REQUEST', currentStatus);
      socket.emit(
        'FRIEND_REQUEST',
        JSON.stringify({
          sendEmail: userData.email,
          receiveEmail: email,
          status: currentStatus,
        })
      );
    }
  };
  const createSendButton = (status: string): JSX.Element => {
    switch (status) {
      case 'IDLE':
        return (
          <FriendRequestButton onClick={buttonClickHandler} status={status}>
            친구 요청
          </FriendRequestButton>
        );
      case 'REJECT':
        return (
          <FriendRequestButton onClick={buttonClickHandler} status={status}>
            거절됨
          </FriendRequestButton>
        );
      case 'PENDING':
        return (
          <FriendRequestButton onClick={buttonClickHandler} status={status}>
            요청 취소
          </FriendRequestButton>
        );
      default:
        throw new Error(`status error: ${status}`);
    }
  };
  return (
    <DiscoverFriendModalCardContainer>
      <UserAvatar avatarUrl={avatarUrl} width="50px" />
      <h3>{nickname}</h3>
      <span>{email}</span>
      {createSendButton(buttonStatus)}
    </DiscoverFriendModalCardContainer>
  );
};

export default DiscoverFriendModalCard;
