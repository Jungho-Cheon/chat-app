import React, { useContext } from 'react';

// context
import { DiscoverFriendModalContext } from '../messageList/MessageList';

const useDiscoverModalState = (): {
  isOpenDiscoverFriend: boolean;
  setIsOpenDiscoverFriend: React.Dispatch<boolean>;
} => {
  const discoverFriendModalContext = useContext(DiscoverFriendModalContext);
  if (discoverFriendModalContext === undefined)
    throw new Error('discover friend modal context not found');

  return discoverFriendModalContext;
};

export default useDiscoverModalState;
