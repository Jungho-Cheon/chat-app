import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../../features/auth/authSlice';
import { FriendData } from '../../../features/auth/authTypes';
import { getCurrentChatroom } from '../../../features/chatroom/chatroomSlice';
import { Participant } from '../../../features/chatroom/chatroomTypes';

import {
  ParticipantsProfileContainer,
  PartnerStatus,
  StatusIndicator,
} from '../../../styles/chatStyles/sidebarStyles/participantsProfile-styles';

const ParticipantsProfile = (): JSX.Element => {
  const { chatroomId, participants } = useSelector(getCurrentChatroom);
  const { email, friendData } = useSelector(getUserData);
  const [opponent, setOpponent] = useState<FriendData>();
  const [online, setOnline] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (chatroomId === '') return;
    const opponent = participants.find(user => user.email !== email);
    if (opponent) {
      const targetUserData = friendData[opponent.email];
      setOnline(targetUserData.isLoggin);
      setOpponent(targetUserData);
    }
  }, [friendData, participants]);
  return (
    <ParticipantsProfileContainer>
      {chatroomId && (
        <>
          <div className="participants-profile__profile-picture">
            <img
              src={opponent?.avatarUrl || ''}
              alt="participants-profile-picture"
            />
            <div className="participants-profile__profile-picture_gradient">
              <h3>{opponent?.nickname}</h3>
              <PartnerStatus isOnline={online}>
                <StatusIndicator isOnline={online} />
                <p>{online ? `Online` : `Offline`}</p>
              </PartnerStatus>
            </div>
          </div>
          <div className="participants-profile__profile-info">
            <h3>Email</h3>
            <p>{opponent?.email}</p>
            <h3>Description</h3>
            <p>{opponent?.description}</p>
            <a>Show More</a>
          </div>
        </>
      )}
    </ParticipantsProfileContainer>
  );
};

export default ParticipantsProfile;
