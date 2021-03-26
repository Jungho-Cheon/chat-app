import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ChatPage from './pages/ChatPage';

// styled-compnents
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import { GlobalStyle } from './styles/global-style';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from './features/theme/themeSlice';

const App = (): JSX.Element => {
  const currentTheme = useSelector(getCurrentTheme);
  console.log(`App Rerender...`);
  return (
    <>
      <ThemeProvider theme={currentTheme ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/sign-in">
              <SignInPage />
            </Route>
            <Route exact path="/sign-up">
              <SignUpPage />
            </Route>
            <Route exact path="/chat">
              <ChatPage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
