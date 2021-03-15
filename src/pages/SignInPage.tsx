import React from 'react';
import { Link } from 'react-router-dom';

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
} from '../styles/signStyles/signInPage-styles';

// lottie
import Lottie from 'react-lottie';
import animationData from '../lotties/PRODUCT/Animation 07/drawkit-grape-animation-7-LOOP.json';

const SignInPage = (): JSX.Element => {
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
          <div className="sidebar__home">
            <Link to="/">TALKI</Link>
          </div>
          <div className="sidebar__title">
            <h1>
              Start a variety of conversations through chat apps, from simple
              tasks to meetings for collaboration.
            </h1>
          </div>
          <Lottie
            options={defaultOptions}
            height="60%"
            isClickToPauseDisabled={true}
          />
        </SidebarContainer>
      </SidebarSection>

      <SignInSection>
        <nav className="signin__nav">
          not a member?{' '}
          <Link to="/sign-up">
            <span>Sign up now</span>
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

export default SignInPage;
