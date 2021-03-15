import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* font-family: 'Josefin Sans', sans-serif; */
    /* font-family: 'Lato', sans-serif; */
    /* font-family: 'Montserrat', sans-serif; */
    /* font-family: 'Open Sans', sans-serif; */
    
    /* font-family: 'Roboto', sans-serif; */
  }
  html, body {
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme.mainBackground};
  }
  #root {
    width: 100%;
    background-color: ${props => props.theme.mainBackground};
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
