import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.background};
  }
  #root {
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.background};
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    font-family: 'Source Sans Pro', 'Noto Sans KR', sans-serif;
    * {
    &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.secondaryText};
      border-radius: 50px;
    }
  }
    }
  }
`;
