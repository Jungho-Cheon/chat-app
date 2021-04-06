import React, { createContext, Dispatch, useState } from 'react';
import { useSelector } from 'react-redux';
import { getChatroomPreviews } from '../../../features/chatroom/chatroomSlice';
import { getUserData } from '../../../features/auth/authSlice';

// components
import MessageCard from './MessageCard';
import UserProfile from '../userProfile/UserProfile';
import DiscoverFriendModal from './DiscoverFriendModal';

// styled-components
import {
  MessageListContainer,
  MessageListWrapper,
  SearchContainer,
  SearchInput,
  MessageCardsContainer,
  Divider,
} from '../../../styles/chatStyles/MessageList-styles/messageList-styles';

export const DiscoverFriendModalContext = createContext<
  | {
      isOpenDiscoverFriend: boolean;
      setIsOpenDiscoverFriend: Dispatch<boolean>;
    }
  | undefined
>(undefined);

const MessageList = (): JSX.Element => {
  const [searchUsername, setSearchUserName] = useState<string>('');
  const [isOpenDiscoverFriend, setIsOpenDiscoverFriend] = useState<boolean>(
    false
  );
  const userData = useSelector(getUserData);
  const chatrooms = useSelector(getChatroomPreviews);
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUserName(e.target.value.trim());
  };

  const filterMessageCards = (
    chatrooms: {
      chatroomId: string;
      participants: string[];
      unreadCount: number;
    }[]
  ): JSX.Element[] => {
    if (searchUsername !== '') {
      return chatrooms
        .filter(
          (data: {
            chatroomId: string;
            participants: string[];
            unreadCount: number;
          }) =>
            data.participants
              .filter(pEmail => pEmail !== userData.email)
              .map(pEmail => {
                const friendData = userData.friendData[pEmail];
                return friendData !== undefined ? friendData.nickname : '';
              })
              .join(' ')
              .toLowerCase()
              .indexOf(searchUsername.toLowerCase()) !== -1
        )

        .map(
          (data: {
            chatroomId: string;
            participants: string[];
            unreadCount: number;
          }): JSX.Element => (
            <MessageCard
              chatroomId={data.chatroomId}
              unreadCount={data.unreadCount}
              email={userData.email}
              key={data.chatroomId}
            />
          )
        );
    }
    return chatrooms.map(
      (data: { chatroomId: string; unreadCount: number }): JSX.Element => {
        return (
          <MessageCard
            chatroomId={data.chatroomId}
            unreadCount={data.unreadCount}
            email={userData.email}
            key={data.chatroomId}
          />
        );
      }
    );
  };
  const messageNotFound = () => (
    <div className="message-not-found">
      <p>대화중인 채팅방이 없습니다.😢</p>
      <p>이메일이나 이름으로 친구를 찾아보세요!</p>
      <div
        className="message-not-found__discover-user-button"
        onClick={() => setIsOpenDiscoverFriend(true)}
      >
        🔎 Discover Users
      </div>
    </div>
  );
  return (
    <MessageListContainer>
      <DiscoverFriendModalContext.Provider
        value={{ isOpenDiscoverFriend, setIsOpenDiscoverFriend }}
      >
        <UserProfile />
      </DiscoverFriendModalContext.Provider>
      <MessageListWrapper>
        <div className="message-list__title-container">
          <h3>Chatrooms</h3>
        </div>
        {/* Search Input */}
        <SearchContainer>
          <SearchInput
            placeholder="Search"
            onChange={searchHandler}
          ></SearchInput>
          <i className="fas fa-search"></i>
        </SearchContainer>
        <Divider />
        <MessageCardsContainer>
          {chatrooms.length > 0
            ? filterMessageCards(chatrooms)
            : messageNotFound()}
        </MessageCardsContainer>
      </MessageListWrapper>
      {isOpenDiscoverFriend && (
        <DiscoverFriendModal
          setIsOpenDiscoverFriend={setIsOpenDiscoverFriend}
        />
      )}
    </MessageListContainer>
  );
};

export default MessageList;
