import React from 'react';
import { FriendData } from '../../../features/auth/authTypes';
import { FriendDetailModalContainer } from '../../../styles/chatStyles/userProfile-styles/friendDetailModal-styles';
import MenuButton from '../menuButton/MenuButton';
import UserRectAvatar from '../avatar/UserRectAvatar';

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
  return (
    <FriendDetailModalContainer>
      <div className="friend-detail-modal-inner">
        <UserRectAvatar avatarUrl={friendData.avatarUrl} width="100px" />
        <h2>{friendData.nickname}</h2>
        <span className="email">{friendData.email}</span>
        <span className="desc">{friendData.description}</span>
        <div className="chat-button">
          <p>Start Chat</p>
        </div>
      </div>
      <div className="button-absolute">
        <MenuButton
          iconClass="fa-times"
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
