import React from 'react';
import { nanoid } from '@reduxjs/toolkit';

import MessageCard from './MessageCard';

// types
import { UserData } from './messageCardTypes';

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

// test data
import { testData } from '../../tests/data/userdata';

const MessageList = (): JSX.Element => {
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
          <SearchInput placeholder="Search"></SearchInput>
          <i className="fas fa-search"></i>
        </SearchContainer>
        <Divider />
      </MessageListUpperContainer>
      <MessageCardsContainer>
        {testData.map(
          (data: UserData): JSX.Element => (
            <MessageCard
              username={data.username}
              profileImage={data.profileImage}
              previewMessage={data.previewMessage}
              timeago={data.timeago}
              unreadCount={data.unreadCount}
              key={data.username + nanoid()}
            />
          )
        )}
      </MessageCardsContainer>
    </MessageListContainer>
  );
};

export default MessageList;
