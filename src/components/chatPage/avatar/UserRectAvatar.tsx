import React from 'react';
import { UserAvatarProps } from './userAvatartypes';

// styled-components
import {
  AvatarContainer,
  AvatarRectImage,
} from '../../../styles/userAvatar-styles';

const UserAvatar = ({ avatarUrl, width }: UserAvatarProps): JSX.Element => {
  return (
    <AvatarContainer width={width}>
      <AvatarRectImage
        src={avatarUrl}
        onError={e => {
          e.currentTarget.src = 'assets/default-avatar.png';
        }}
      ></AvatarRectImage>
    </AvatarContainer>
  );
};

export default UserAvatar;
