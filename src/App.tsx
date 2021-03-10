import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Header from './components/Header';
import Navbar from './components/Navbar';
import MessageList from './components/MessageList';

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
          <Header></Header>
        </AppContainer>
      </ThemeProvider>
    </>
  );
};

export default App;
