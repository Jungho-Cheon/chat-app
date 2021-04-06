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
import { getUserData, userLogOut } from '../../../features/auth/authSlice';

export interface ProfileSectionProps {
  userProfile: HTMLDivElement | null;
  setShowEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileSection = ({
  userProfile,
  setShowEditProfileModal,
}: ProfileSectionProps): JSX.Element => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const friendRequests = useSelector(getCurrentFriendRequest);
  const [hasNewNotification, setHasNewNotification] = useState<boolean>(false);
  const slideToFriendList = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(userProfile);
    if (!userProfile) return;
    userProfile.style.transform = `translateX(0px)`;
  };
  const slideToNotification = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!userProfile) return;
    userProfile.style.transform = `translateX(-600px)`;
    dispatch(checkFriendRequests(userData.email));
    setHasNewNotification(false);
  };
  useEffect(() => {
    if (friendRequests.length === 0) return;

    const lastFriendRequest = friendRequests[friendRequests.length - 1];
    if (!lastFriendRequest?.isChecked) {
      setHasNewNotification(true);
    }
  }, [friendRequests]);
  const logOut = () => {
    dispatch(userLogOut());
  };
  return (
    <ProfileSectionContianer>
      <header>
        <MenuButton
          iconClass="fas fa-users"
          onClick={slideToFriendList}
          hoverMessage="friends"
        />
        <MenuButton
          iconClass="fas fa-bell"
          hasNewNotification={hasNewNotification}
          onClick={slideToNotification}
          hoverMessage="Notification"
        />
        <MenuButton
          iconClass="fas fa-sign-out-alt"
          onClick={logOut}
          hoverMessage="log out"
        />
      </header>
      <UserRectAvatar avatarUrl={userData.avatarUrl} width="120px" />
      <UserProfileInfo>
        <UserNameContainer>{userData.nickname}</UserNameContainer>
        <span className="userprofile__email">{userData.email}</span>

        <div
          className="userprofile__setting-button"
          onClick={() => setShowEditProfileModal(true)}
        >
          <p>Edit Profile</p>
        </div>
      </UserProfileInfo>
    </ProfileSectionContianer>
  );
};

export default React.memo(ProfileSection);
