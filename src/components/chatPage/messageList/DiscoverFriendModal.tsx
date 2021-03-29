import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../../features/auth/authSlice';
import { socket } from '../../../socket/socket';

// styled-components
import { DiscoverFriendModalContainer } from '../../../styles/chatStyles/MessageList-styles/discoverFriendModal-styles';
import { Divider } from '../../../styles/chatStyles/MessageList-styles/messageList-styles';
import ProgressiveCircle from '../ProgressiveCircle';
import DiscoverFriendModalCard from './DiscoverFriendModalCard';

interface DiscoverFriendModalProps {
  setIsOpenDiscoverFriend: (state: boolean) => void;
}

interface SearchResultType {
  email: string;
  nickname: string;
  avatarUrl: string;
  status: string;
}

let sendSearchTextTimer: NodeJS.Timeout;

const DiscoverFriendModal = ({
  setIsOpenDiscoverFriend,
}: DiscoverFriendModalProps): JSX.Element => {
  const { email } = useSelector(getUserData);
  const [searchText, setSearchText] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpenDiscoverFriend(false);
  };

  useEffect(() => {
    socket.on('DISCOVER_USER', data => {
      const response: string[] = JSON.parse(data);
      response.forEach(user =>
        setSearchResults(prev => [...prev, JSON.parse(user)])
      );
      setIsSearching(false);
    });
  }, []);

  // 1초동안 입력이 없는 경우 사용자 검색 수행
  useEffect(() => {
    clearTimeout(sendSearchTextTimer);
    sendSearchTextTimer = setTimeout(() => {
      if (searchText.length === 0) {
        setIsSearching(false);
        setSearchResults([]);
      }
      if (searchText.length > 0) {
        setIsSearching(true);
        setSearchResults([]);
        socket.emit('DISCOVER_USER', JSON.stringify({ email, searchText }));
      }
    }, 1000);
  }, [searchText]);

  return (
    <DiscoverFriendModalContainer onClick={closeModal}>
      <div
        className="discover-friend-modal-inner"
        onClick={e => e.stopPropagation()}
      >
        <div className="close-button">
          <i className="fas fa-times" onClick={closeModal}></i>
        </div>
        <i className="fas fa-search" />
        <input
          className="discover-friend-modal-inner__input"
          placeholder="Insert e-mail or user name."
          value={searchText}
          onChange={e => {
            e.preventDefault();
            setSearchText(e.target.value);
          }}
        />
        <Divider />
        <section className="discover-friend-modal-inner__result">
          {isSearching && (
            <div className="discover-friend-modal-inner__no-results">
              <ProgressiveCircle />
            </div>
          )}
          {!isSearching && searchResults.length === 0 ? (
            <div className="discover-friend-modal-inner__no-results">
              결과가 없습니다. 💦
            </div>
          ) : (
            searchResults.map(result => (
              <DiscoverFriendModalCard key={nanoid()} {...result} />
            ))
          )}
        </section>
      </div>
    </DiscoverFriendModalContainer>
  );
};

export default DiscoverFriendModal;
