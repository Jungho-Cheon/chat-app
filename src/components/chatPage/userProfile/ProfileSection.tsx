import React, { useEffect, useState } from 'react';

// components
import MenuButton from '../menuButton/MenuButton';
import UserRectAvatar from '../avatar/UserRectAvatar';

// styled-components
import {
  ProfileSectionContianer,
  UserProfileInfo,
  UserNameContainer,
} from '../../../styles/chatStyles/userProfile-styles/profileSection-styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkFriendRequests,
  getCurrentFriendRequest,
} from '../../../features/friendRequest/friendRequestSlice';
import { getUserData } from '../../../features/auth/authSlice';

export interface ProfileSectionProps {
  userProfile: HTMLDivElement | null;
}

const ProfileSection = ({ userProfile }: ProfileSectionProps): JSX.Element => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const friendRequests = useSelector(getCurrentFriendRequest);
  const [hasNewNotification, setHasNewNotification] = useState<boolean>(false);
  const slideToFriendList = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!userProfile) return;
    userProfile.style.transform = `translateX(0px)`;
  };
  const slideToNotification = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!userProfile) return;
    userProfile.style.transform = `translateX(-600px)`;
    dispatch(checkFriendRequests());
    setHasNewNotification(false);
  };
  useEffect(() => {
    if (friendRequests.length === 0) return;

    const lastFriendRequest = friendRequests[friendRequests.length - 1];
    if (!lastFriendRequest?.isChecked) {
      setHasNewNotification(true);
    }
  }, [friendRequests]);
  return (
    <ProfileSectionContianer>
      <header>
        <MenuButton iconClass="fa-users" onClick={slideToFriendList} />
        <MenuButton
          iconClass="fa-bell"
          hasNewNotification={hasNewNotification}
          onClick={slideToNotification}
        />
      </header>
      <UserRectAvatar avatarUrl={userData.avatarUrl} width="120px" />
      <UserProfileInfo>
        <UserNameContainer>{userData.nickname}</UserNameContainer>
        <span className="userprofile__email">{userData.email}</span>
        <div className="userprofile__setting-button">Edit Profile</div>
      </UserProfileInfo>
    </ProfileSectionContianer>
  );
};

export default React.memo(ProfileSection);
