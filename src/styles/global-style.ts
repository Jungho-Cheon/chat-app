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
    height: 100vh;
  }
  #root {
    width: 100%;
    height: 100vh;    
    background-color: ${props => props.theme.mainBackground};
    overflow-y: hidden;
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;
