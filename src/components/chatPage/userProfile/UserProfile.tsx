import React, { useState } from 'react';

// styled-components
import { UserProfileContainer } from '../../../styles/chatStyles/userProfile-styles/userProfile-styles';

// user info client
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';
import FriendSection from './FriendSection';
import EditProfileModal from './EditProfileModal';

const UserProfile = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<HTMLDivElement | null>();
  const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(
    false
  );
  return (
    <UserProfileContainer>
      <div className="user-profile__wrapper" ref={el => setUserProfile(el)}>
        {userProfile && (
          <>
            <FriendSection userProfile={userProfile} />
            <ProfileSection
              userProfile={userProfile}
              setShowEditProfileModal={setShowEditProfileModal}
            />
            <NotificationSection userProfile={userProfile} />
          </>
        )}
      </div>
      {showEditProfileModal && (
        <EditProfileModal setShowEditProfileModal={setShowEditProfileModal} />
      )}
    </UserProfileContainer>
  );
};

export default UserProfile;
