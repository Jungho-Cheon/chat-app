import React from 'react';
import { UserAvatarProps } from './userAvatartypes';

// styled-components
import {
  AvatarContainer,
  AvatarImage,
} from '../../../styles/userAvatar-styles';

const UserAvatar = ({ avatarUrl, width }: UserAvatarProps): JSX.Element => {
  return (
    <AvatarContainer width={width}>
      <AvatarImage
        src={avatarUrl}
        onError={e => {
          e.currentTarget.src = 'assets/default-avatar.png';
        }}
      ></AvatarImage>
    </AvatarContainer>
  );
};

export default UserAvatar;
