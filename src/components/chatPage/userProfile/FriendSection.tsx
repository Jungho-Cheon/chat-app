import React, { useContext, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';
import { getUserData } from '../../../features/auth/authSlice';

// components
import MenuButton from '../menuButton/MenuButton';
import FriendCard from './FriendCard';

// styled-components
import { FriendSectionContianer } from '../../../styles/chatStyles/userProfile-styles/friendSection-styles';
import FriendDetailModal from './FriendDetailModal';
import { FriendData } from '../../../features/auth/authTypes';

// context
import { DiscoverFriendModalContext } from '../messageList/MessageList';
import useDiscoverModalState from './useDiscoverModalState';
export interface FriendSectionProps {
  userProfile: HTMLDivElement | null;
}

const FriendSection = ({ userProfile }: FriendSectionProps): JSX.Element => {
  const userData = useSelector(getUserData);
  const {
    isOpenDiscoverFriend,
    setIsOpenDiscoverFriend,
  } = useDiscoverModalState();
  const [
    friendDetailModalData,
    setFriendDetailModalData,
  ] = useState<FriendData>();
  const slideToUserProfile = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!userProfile) return;
    setFriendDetailModalData(undefined);
    userProfile.style.transform = `translateX(-300px)`;
  };
  const createFriendCards = (): JSX.Element[] => {
    return Object.entries(userData.friendData).map(([key, friendData]) => {
      return (
        <FriendCard
          friendData={friendData}
          setFriendDetailModalData={setFriendDetailModalData}
          key={key}
        />
      );
    });
  };
  return (
    <FriendSectionContianer>
      <header>
        <h3>Friends</h3>
        <div className="friend-section__buttons">
          <MenuButton
            iconClass="fa-plus"
            onClick={() => setIsOpenDiscoverFriend(true)}
          />
          <MenuButton
            iconClass="fa-chevron-right"
            onClick={slideToUserProfile}
          />
        </div>
      </header>
      <section className="user-profile__friend-card-container">
        {createFriendCards()}
      </section>
      {friendDetailModalData && (
        <FriendDetailModal
          friendData={friendDetailModalData}
          setFriendDetailModalData={setFriendDetailModalData}
        />
      )}
    </FriendSectionContianer>
  );
};

export default FriendSection;
