import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background-color: ${props => props.theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
export const HeaderLogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 220px;
  h1 {
    font-weight: 900;
    font-size: 2rem;
    color: ${props => props.theme.purple};
    font-family: 'Pangolin', cursive;
  }
`;
export const HeaderLogo = styled.img`
  width: 120px;
  height: 40px;
  object-fit: cover;
`;
export const HeaderNav = styled.div`
  margin-left: 40px;
  a {
    padding: 0 10px;
    text-decoration: none;
    color: ${props => props.theme.primaryText};
  }
`;

export const HeaderRightContainer = styled.div`
  width: 160px;
  min-width: 160px;
  button {
    font-family: 'Roboto', sans-serif;
  }
  button:nth-child(1) {
    margin-right: 10px;
  }
`;
export const SignInButton = styled.button`
  padding: 5px;
  width: 65px;
  height: 31px;
  border-radius: 5px;
  border: none;
  background-color: ${props => props.theme.mainBackground};
  color: ${props => props.theme.purple};
`;
export const SignUpButton = styled.button`
  padding: 5px;
  width: 65px;
  height: 31px;
  border-radius: 5px;
  border: none;
  background-color: ${props => props.theme.purple};
  color: ${props => props.theme.background};
`;
