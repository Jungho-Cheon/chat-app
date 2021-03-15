import React from 'react';

// styled-components
import {
  SignInContainer,
  SidebarSection,
  SignInSection,
  SidebarContainer,
  SignInFormContainer,
  SocialLoginContainer,
  GoogleLoginButton,
  DividerContainer,
  FacebookLoginButton,
} from '../styles/signStyles/signUpPage-styles';

// lottie
import Lottie from 'react-lottie';
import animationData from '../lotties/PRODUCT/Animation 05/drawkit-grape-animation-5-LOOP.json';
import { Link } from 'react-router-dom';

const SignUpPage = (): JSX.Element => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <SignInContainer>
      <SidebarSection>
        <SidebarContainer>
          <div className="sidebar__title">
            <h1>
              Simply sign up and start chatting with your friends around you.
            </h1>
          </div>
          <Lottie
            options={defaultOptions}
            height="75%"
            isClickToPauseDisabled={true}
          />
        </SidebarContainer>
      </SidebarSection>

      <SignInSection>
        <nav className="signin__nav">
          Already a member?{' '}
          <Link to="/sign-in">
            <span>Sign In</span>
          </Link>
        </nav>
        <SignInFormContainer>
          <div className="signin__form">
            <h1>Sign in to Chat App</h1>
            <SocialLoginContainer>
              <GoogleLoginButton>
                <i className="fab fa-google"></i>
              </GoogleLoginButton>
              <FacebookLoginButton>
                <i className="fab fa-facebook-f"></i>
              </FacebookLoginButton>
            </SocialLoginContainer>
            <DividerContainer>
              <div className="divider" />
              <div className="orBox">
                <h3>Or</h3>
              </div>
            </DividerContainer>
            <label htmlFor="email">Email</label>
            <input type="text" id="email"></input>
            <label htmlFor="name">name</label>
            <input type="text" id="email"></input>
            <label htmlFor="password">Password</label>
            <input type="password"></input>
            <button type="button" id="submit">
              Sign In
            </button>
          </div>
        </SignInFormContainer>
      </SignInSection>
    </SignInContainer>
  );
};

export default SignUpPage;
