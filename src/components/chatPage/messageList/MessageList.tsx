import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchChatroomInfo,
  getAllChatrooms,
} from '../../../features/chatroom/chatroomSlice';
import { getUserData } from '../../../features/auth/authSlice';
import ChatroomType from '../../../features/chatroom/chatroomTypes';

// components
import MessageCard from './MessageCard';
import UserProfile from './UserProfile';
import DiscoverFriendModal from './DiscoverFriendModal';

// styled-components
import {
  MessageListContainer,
  MessageListUpperContainer,
  SearchContainer,
  SearchInput,
  MessageCardsContainer,
  Divider,
} from '../../../styles/chatStyles/MessageList-styles/messageList-styles';

const MessageList = (): JSX.Element => {
  const dispatch = useDispatch();
  const [searchUsername, setSearchUserName] = useState<string>('');
  const [isOpenDiscoverFriend, setIsOpenDiscoverFriend] = useState<boolean>(
    false
  );
  const userData = useSelector(getUserData);
  const chatroomData = useSelector(getAllChatrooms);
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUserName(e.target.value.trim());
  };
  const chatrooms = Array.from(Object.values(chatroomData));

  const dispatchAllChatrooms = useCallback(() => {
    const chatroomSet = new Set(userData.chatroomIds);
    chatroomSet.forEach((chatroomId: string) => {
      dispatch(fetchChatroomInfo({ chatroomId, email: userData.email }));
    });
  }, [userData.chatroomIds]);

  useEffect(() => {
    dispatchAllChatrooms();
  }, [userData.chatroomIds]);

  const filterMessageCards = (chatrooms: ChatroomType[]): JSX.Element[] => {
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
          <MessageCard {...data} email={userData.email} key={data.chatroomId} />
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
      <UserProfile />
      <MessageListUpperContainer>
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
      </MessageListUpperContainer>
      {isOpenDiscoverFriend && (
        <DiscoverFriendModal
          setIsOpenDiscoverFriend={setIsOpenDiscoverFriend}
        />
      )}
    </MessageListContainer>
  );
};

export default MessageList;
