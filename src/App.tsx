import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Navbar from './components/Navbar';
import MessageList from './components/messageList/MessageList';
import ChatMain from './components/chat/ChatMain';

// styled-compnents
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import { GlobalStyle } from './styles/global-style';
import { AppContainer } from './styles/app-styles';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from './features/login/loginSlice';
import {
  isEmojiOpenedSelector,
  toggleEmojiContainer,
} from './features/emoji/emojiSlice';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const isEmojiOpened = useSelector(isEmojiOpenedSelector);
  useEffect(() => {
    // TODO: 로그인 구현
    dispatch(loginRequest({ userId: null, password: null }));
  }, []);
  return (
    <>
      {/* TODO: Add Theme Change Button */}
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <AppContainer
          onClick={() => isEmojiOpened && dispatch(toggleEmojiContainer())}
        >
          <Navbar />
          <MessageList />
          <ChatMain />
        </AppContainer>
      </ThemeProvider>
    </>
  );
};

export default App;
