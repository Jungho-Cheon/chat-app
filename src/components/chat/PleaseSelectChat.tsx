import React from 'react';

// styled components
import { PleaseSelectChatContainer } from '../../styles/pleaseSelectChat-styles';

const PleaseSelectChat = (): JSX.Element => {
  return (
    <PleaseSelectChatContainer>
      <img src="assets/home-icon-3.svg" />
      <h1>채팅방을 선택해주세요.</h1>
    </PleaseSelectChatContainer>
  );
};

export default PleaseSelectChat;
