import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import MessageCard from './MessageCard';
import UserProfile from './UserProfile';

// styled-components
import {
  MessageListContainer,
  MessageListUpperContainer,
  LogoContainer,
  SortButton,
  SortIcon,
  SortText,
  SearchContainer,
  SearchInput,
  Divider,
  MessageCardsContainer,
} from '../../../styles/chatStyles/messageList-styles';

import {
  fetchChatroomInfo,
  getAllChatrooms,
} from '../../../features/chatroom/chatroomSlice';
import { getUserData } from '../../../features/auth/authSlice';
import ChatroomType from '../../../features/chatroom/chatroomTypes';

const MessageList = (): JSX.Element => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const chatroomData = useSelector(getAllChatrooms);
  const [searchUsername, setSearchUserName] = useState<string>('');
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUserName(e.target.value.trim());
  };

  const dispatchAllChatrooms = () => {
    const chatroomSet = new Set(userData.chatroomIds);
    chatroomSet.forEach((chatroomId: string) => {
      dispatch(fetchChatroomInfo({ chatroomId, email: userData.email }));
    });
  };

  useEffect(() => {
    dispatchAllChatrooms();
  }, []);

  const filterMessageCards = (): JSX.Element[] => {
    const chatrooms = Array.from(Object.values(chatroomData));
    if (chatrooms.length > 0) {
      if (searchUsername !== '') {
        return chatrooms
          .filter(
            (data: ChatroomType) =>
              data.participants
                .filter(user => user.email !== userData.email)
                .map(user => user.nickname)
                .join(' ')
                .toLowerCase()
                .indexOf(searchUsername.toLowerCase()) !== -1
          )
          .map(
            (data: ChatroomType): JSX.Element => (
              <MessageCard
                {...data}
                email={userData.email}
                key={data.chatroomId}
              />
            )
          );
      }
      return chatrooms.map(
        (data: ChatroomType): JSX.Element => {
          return (
            <MessageCard
              {...data}
              email={userData.email}
              key={data.chatroomId}
            />
          );
        }
      );
    }
    return [];
  };
  return (
    <MessageListContainer>
      {/* Logo */}
      <LogoContainer>
        <img src="assets/logo.svg" alt="logo" />
        <h1 className="logo">TALKI</h1>
      </LogoContainer>
      <UserProfile />
      <MessageListUpperContainer>
        {/* Search Input */}
        <SearchContainer>
          <SearchInput
            placeholder="Search"
            onChange={searchHandler}
          ></SearchInput>
          <i className="fas fa-search"></i>
        </SearchContainer>
        <div className="message-list__title-container">
          <h3>Chatrooms</h3>
        </div>
        <MessageCardsContainer>{filterMessageCards()}</MessageCardsContainer>
      </MessageListUpperContainer>
    </MessageListContainer>
  );
};

export default MessageList;
