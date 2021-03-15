import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${props => props.theme.background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 120px;
`;
export const HeaderLogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
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
  button {
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
