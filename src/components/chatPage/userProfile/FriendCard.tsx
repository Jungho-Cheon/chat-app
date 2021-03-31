import React from 'react';
import { FriendData } from '../../../features/auth/authTypes';

import {
  FriendCardContainer,
  FriendCardLoginCheckDot,
} from '../../../styles/chatStyles/MessageList-styles/friendCard-styles';
import UserAvatar from '../avatar/UserAvatar';

interface FriendCardProps {
  friendData: FriendData;
  setFriendDetailModalData: React.Dispatch<
    React.SetStateAction<FriendData | undefined>
  >;
}

const FriendCard = ({
  friendData,
  setFriendDetailModalData,
}: FriendCardProps): JSX.Element => {
  const { avatarUrl, isLoggin, nickname } = friendData;
  const friendCardClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFriendDetailModalData(friendData);
  };
  return (
    <FriendCardContainer onClick={friendCardClickHandler}>
      <div className="friend-card__user-avatar-container">
        <UserAvatar avatarUrl={avatarUrl} width="50px" />
        <FriendCardLoginCheckDot isLoggin={isLoggin} />
      </div>
      <h4>{nickname}</h4>
      {/* <p>{email}</p> */}
    </FriendCardContainer>
  );
};

export default FriendCard;
