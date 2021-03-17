import React, { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

// components
import MessageCard from './MessageCard';

// types
import { Chatroom } from './messageCardTypes';

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
  selectChatRooms,
} from '../../../features/chatroom/chatroomSlice';
import { getUserData } from '../../../features/auth/authSlice';
import ChatroomType from '../../../features/chatroom/chatroomTypes';

const MessageList = (): JSX.Element => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const { chatroomIds } = useSelector(getUserData);
  const chatrooms = useSelector(selectChatRooms);
  const [searchUsername, setSearchUserName] = useState<string>('');
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUserName(e.target.value.trim());
  };

  const dispatchAllChatRooms = () => {
    const chatroomSet = new Set(chatroomIds);
    chatroomSet.forEach((chatroomId: string) => {
      dispatch(fetchChatroomInfo(chatroomId));
    });
  };

  useEffect(() => {
    dispatchAllChatRooms();
  }, []);

  const filterMessageCards = (): JSX.Element[] => {
    if (chatrooms.length > 0) {
      console.log(chatrooms);
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
        (data: ChatroomType): JSX.Element => (
          <MessageCard {...data} email={userData.email} key={data.chatroomId} />
        )
      );
    }
    return [];
  };
  return (
    <MessageListContainer>
      <MessageListUpperContainer>
        {/* Logo */}
        <LogoContainer>
          {/* <LogoImage src="assets/logo.svg"></LogoImage> */}
          <h1>TALKI</h1>
          <SortButton>
            <SortIcon>
              <i className="fas fa-sort-amount-down-alt"></i>
            </SortIcon>
            <SortText>Newest</SortText>
          </SortButton>
        </LogoContainer>
        {/* Search Input */}
        <SearchContainer>
          <SearchInput
            placeholder="Search"
            onChange={searchHandler}
          ></SearchInput>
          <i className="fas fa-search"></i>
        </SearchContainer>
        <Divider />
      </MessageListUpperContainer>
      <MessageCardsContainer>{filterMessageCards()}</MessageCardsContainer>
    </MessageListContainer>
  );
};

export default MessageList;
