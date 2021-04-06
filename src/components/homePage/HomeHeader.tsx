import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderLogoContainer,
  HeaderRightContainer,
  SignInButton,
  SignUpButton,
} from '../../styles/homeStyles/homeHeader-styles';

const Header = (): JSX.Element => {
  return (
    <HeaderContainer>
      <HeaderLogoContainer>
        <h1>TALKI</h1>
        {/* <HeaderNav>
          <Link to="/about">about</Link>
          <Link to="/contact">contact</Link>
        </HeaderNav> */}
      </HeaderLogoContainer>
      <HeaderRightContainer>
        <Link to="/sign-in">
          <SignInButton>Sign In</SignInButton>
        </Link>
        <Link to="/sign-up">
          <SignUpButton>Sign Up</SignUpButton>
        </Link>
      </HeaderRightContainer>
    </HeaderContainer>
  );
};

export default Header;
