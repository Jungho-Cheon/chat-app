import styled from 'styled-components';

const customColor = new Map<string, string>();
customColor.set('yellow', 'rgb(242, 209, 132)');
customColor.set('deepYellow', 'rgb(134, 97, 24)');

export const SignInContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 400px 1fr;
`;
export const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: ${customColor.get('yellow')};
  .sidebar__home {
    padding: 80px 40px 20px;
    a {
      color: ${props => props.theme.mainBackground};
      font-size: 2.6rem;
      font-weight: 400;
      cursor: pointer;
      text-decoration: none;
      font-family: 'Pangolin', cursive;
    }
  }
  .sidebar__title {
    padding: 0 40px 0;
    h1 {
      color: ${customColor.get('deepYellow')};
      font-size: 1.6rem;
      font-weight: 700;
    }
  }
`;
export const SidebarSection = styled.div``;
export const SignInSection = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  nav {
    padding: 30px 30px 0 30px;
    text-align: right;
    a {
      text-decoration: none;
      color: ${props => props.theme.purple};
    }
  }
`;
export const SignInFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .signin__form {
    display: flex;
    flex-direction: column;
    padding: 40px 80px;
    background-color: ${props => props.theme.mainBackground};
    width: 500px;
    label {
      font-weight: 700;
    }
    input {
      height: 35px;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: ${props => props.theme.divider};
      margin: 5px 0 20px;
      padding-left: 10px;
      transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      &:hover {
        box-shadow: 0px 0px 0px 5px ${props => props.theme.secondaryPurple};
        background-color: ${props => props.theme.mainBackground};
      }
      &:focus {
        border: 1px solid ${props => props.theme.purple};
        box-shadow: 0px 0px 0px 5px ${props => props.theme.secondaryPurple};
        background-color: ${props => props.theme.mainBackground};
      }
    }
    button#submit {
      border-radius: 5px;
      height: 35px;
      border: none;
      outline: none;
      background-color: ${props => props.theme.purple};
      color: white;
      width: 50%;
      &:hover {
        background-color: ${props => props.theme.secondaryPurple};
      }
      &:active {
        background-color: ${props => props.theme.deepPurple};
      }
    }
  }
`;

export const SocialLoginContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const GoogleLoginButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 50%;
  text-align: center;
  position: relative;
  margin: 0 5px;
  i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: ${props => props.theme.secondaryText};
  }
  &:hover {
    background-color: ${props => props.theme.secondaryText};
    i {
      color: ${props => props.theme.mainBackground};
    }
  }
`;
export const FacebookLoginButton = styled.button`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  border: none;
  outline: none;
  border-radius: 50%;
  text-align: center;
  position: relative;
  i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: ${props => props.theme.secondaryText};
  }
  &:hover {
    background-color: ${props => props.theme.secondaryText};
    i {
      color: ${props => props.theme.mainBackground};
    }
  }
`;

export const DividerContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  div.divider {
    height: 1px;
    width: 100%;
    margin: 20px 0;
    background-color: ${props => props.theme.divider};
  }
  div.orBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;
    background-color: ${props => props.theme.mainBackground};
    color: ${props => props.theme.secondaryText};
  }
`;
