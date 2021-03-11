import React from 'react';
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

const App = (): JSX.Element => {
  return (
    <>
      {/* TODO: Add Theme Change Button */}
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <AppContainer>
          <Navbar />
          <MessageList />
          <ChatMain />
        </AppContainer>
      </ThemeProvider>
    </>
  );
};

export default App;
