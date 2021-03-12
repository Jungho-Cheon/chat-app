import React, { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

// components
import MessageCard from './MessageCard';

// types
import { ChatRoom } from './messageCardTypes';

// styled-components
import {
  MessageListContainer,
  MessageListUpperContainer,
  LogoContainer,
  LogoImage,
  SortButton,
  SortIcon,
  SortText,
  SearchContainer,
  SearchInput,
  Divider,
  MessageCardsContainer,
} from '../../styles/messageList-styles';

import {
  fetchChatRoom,
  selectChatRooms,
} from '../../features/chatroom/chatRoomSlice';

const MessageList = (): JSX.Element => {
  const dispatch = useDispatch();
  const chatRooms = useSelector(selectChatRooms);
  // const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [searchUsername, setSearchUserName] = useState<string>('');
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUserName(e.target.value.trim());
  };

  useEffect(() => {
    dispatch(fetchChatRoom());
  }, []);

  const filterMessageCards = (): JSX.Element[] => {
    if (chatRooms === undefined) return [];
    if (searchUsername !== '') {
      return chatRooms
        .filter(
          (data: ChatRoom) =>
            !data.chatroomName
              .toLowerCase()
              .indexOf(searchUsername.toLowerCase())
        )
        .map(
          (data: ChatRoom): JSX.Element => (
            <MessageCard {...data} key={nanoid()} />
          )
        );
    }
    return chatRooms.map(
      (data: ChatRoom): JSX.Element => <MessageCard {...data} key={nanoid()} />
    );
  };
  return (
    <MessageListContainer>
      <MessageListUpperContainer>
        {/* Logo */}
        <LogoContainer>
          <LogoImage src="assets/logo.svg"></LogoImage>
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
