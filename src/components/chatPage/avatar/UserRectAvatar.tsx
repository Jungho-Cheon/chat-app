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
      <AvatarRectImage src={avatarUrl}></AvatarRectImage>
    </AvatarContainer>
  );
};

export default UserAvatar;
