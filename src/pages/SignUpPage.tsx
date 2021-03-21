import React, { useRef, useState } from 'react';

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
} from '../styles/authStyles/signUpPage-styles';

// lottie
import Lottie from 'react-lottie';
import animationData from '../lotties/PRODUCT/Animation 05/drawkit-grape-animation-5-LOOP.json';
import { Link } from 'react-router-dom';
import ValidationNotifier from '../components/authPage/ValidationNotifier';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSignUpState,
  getSignUpState,
  signUpThunk,
} from '../features/auth/authSlice';
import { SignInButton } from '../styles/homeStyles/homeHeader-styles';
import { SignUpState } from '../features/auth/authTypes';

const SignUpPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentSignUpState = useSelector(getSignUpState);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [nicknameValidation, setNicknameValidation] = useState<boolean>(true);
  const [passwordValidation, setPasswordValidation] = useState<boolean>(true);
  const emailRef = useRef(null);
  const nicknameRef = useRef(null);
  const passwordRef = useRef(null);
  const validateForm = (email: string, nickname: string, password: string) => {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const isValidEmail = emailRegex.test(email);
    const isValidNickname = nickname.trim().length > 0;
    const isValidPassword = password.trim().length >= 6;
    setEmailValidation(isValidEmail);
    setNicknameValidation(isValidNickname);
    setPasswordValidation(isValidPassword);
    return isValidEmail && isValidNickname && isValidPassword;
  };
  const requestSignUp = () => {
    const isValid = validateForm(email, nickname, password);
    if (isValid) {
      dispatch(signUpThunk({ email, nickname, password }));
    }
  };
  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      requestSignUp();
    }
  };
  const createSignUpForm = () => (
    <>
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
      <input
        type="text"
        id="email"
        ref={emailRef}
        onChange={e => setEmail(e.target.value)}
      ></input>
      {currentSignUpState === SignUpState.FAILED ? (
        <ValidationNotifier
          message="This email already exists."
          isShown={true}
        />
      ) : (
        <ValidationNotifier
          message="Please enter valid e-mail address."
          isShown={!emailValidation}
        />
      )}
      <label htmlFor="name">Nickname</label>
      <input
        type="text"
        id="nickname"
        ref={nicknameRef}
        onChange={e => setNickname(e.target.value)}
      ></input>
      <ValidationNotifier
        message="Nickname can not be empty."
        isShown={!nicknameValidation}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="6+ charaters"
        ref={passwordRef}
        onChange={e => setPassword(e.target.value)}
      ></input>
      <ValidationNotifier
        message="Password must be at least 6 characters."
        isShown={!passwordValidation}
      />
      <button type="button" id="submit" onClick={requestSignUp}>
        Sign Up
      </button>
    </>
  );
  const createSuccessMessage = () => (
    <>
      <h1>🚀 Sign Up Successfully!</h1>
      <p>
        A verification email has been sent to <span>{email}</span>. (Takes up to
        3 minutes) Check the email sent and click the link to complete the
        verification.
      </p>
      <DividerContainer>
        <div className="divider" />
      </DividerContainer>
      <p>
        인증 이메일이 <span>{email}</span>에 전송되었습니다. (최대 3분 소요)
        전송된 이메일을 확인하고 링크를 클릭하여 인증을 마무리 해주세요.
      </p>
    </>
  );
  return (
    <SignInContainer onKeyPress={handleEnterKeyPress}>
      <SidebarSection>
        <SidebarContainer>
          <div className="sidebar__home">
            <Link to="/" onClick={() => dispatch(clearSignUpState())}>
              TALKI
            </Link>
          </div>
          <div className="sidebar__title">
            <h1>
              Simply sign up and start chatting with your friends around you.
            </h1>
          </div>
          <div className="sidebar__lottieContainer">
            <Lottie
              options={defaultOptions}
              isClickToPauseDisabled={true}
              style={{ position: `absolute`, left: `-55px` }}
            />
          </div>
        </SidebarContainer>
      </SidebarSection>

      <SignInSection>
        <nav className="signin__nav">
          Already a member?{' '}
          <Link to="/sign-in" onClick={() => dispatch(clearSignUpState())}>
            <span>Sign In</span>
          </Link>
        </nav>
        <SignInFormContainer>
          <div className="signin__form">
            {currentSignUpState === SignUpState.SUCCESS
              ? createSuccessMessage()
              : createSignUpForm()}
          </div>
        </SignInFormContainer>
      </SignInSection>
    </SignInContainer>
  );
};

export default SignUpPage;
