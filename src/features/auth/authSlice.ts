import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GoogleLoginResponse } from 'react-google-login';
import { RootStateOrAny } from 'react-redux';
import Client from '../../client/authClient';
import {
  SignInProps,
  SignInResponse,
  SignInState,
  SignUpProps,
  SignUpState,
  UserData,
} from './authTypes';

if (!process.env.REACT_APP_SERVER_URL) {
  console.error('server url required!');
} else {
  console.log('server url : ' + process.env.REACT_APP_SERVER_URL);
}
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';
const client = new Client(SERVER_URL.toString());

// Async Thunks
export const signUpThunk = createAsyncThunk(
  'auth/sign-up',
  async (signUpData: SignUpProps) => {
    return await client.signUp(signUpData);
  }
);

export const signInThunk = createAsyncThunk(
  'auth/sign-in',
  async (signInData: SignInProps): Promise<SignInResponse> => {
    return await client.signIn(signInData);
  }
);

export const googleLogin = createAsyncThunk(
  'auth/google-login',
  async (loginData: GoogleLoginResponse) => {
    const { email, imageUrl, name } = loginData.profileObj;
    return await client.oAuthLogin({
      email,
      name,
      image: imageUrl,
    });
  }
);

export interface FacebookLoginResponse {
  email: string;
  name: string;
  picture?: {
    data: {
      url: string;
    };
  };
}
export const facebookLogin = createAsyncThunk(
  'auth/facebook-login',
  async (loginData: FacebookLoginResponse) => {
    const { email, name, picture } = loginData;
    return await client.oAuthLogin({
      email,
      name,
      image: picture?.data.url || '',
    });
  }
);

const initialState: {
  accessToken: string;
  userData: UserData;
  signUpState: SignUpState;
  signInState: { state: SignInState; message: string };
} = {
  accessToken: '',
  userData: {
    email: '',
    nickname: '',
    avatarUrl: '',
    description: '',
    friendData: {},
    chatroomIds: new Array<string>(),
  },
  signUpState: SignUpState.IDLE,
  signInState: { state: SignInState.IDLE, message: '' },
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSignUpState(state) {
      state.signUpState = SignUpState.IDLE;
      return state;
    },
    userOffline(state, { payload }) {
      const email = payload;
      const friendData = state.userData.friendData[email];
      if (friendData) {
        friendData.isLoggin = false;
      }
    },
    userOnline(state, { payload }) {
      const email = payload;
      const friendData = state.userData.friendData[email];
      if (friendData) {
        friendData.isLoggin = true;
      }
    },
  },
  extraReducers: builder => {
    // 로그인 응답 처리
    builder.addCase(signInThunk.fulfilled, (state, { payload }) => {
      console.log(payload);
      const { accessToken, message, statusCode, userData } = payload;
      if (statusCode === 200) {
        state.accessToken = accessToken;
        state.userData = userData;
        state.signInState.state = SignInState.SUCCESS;
        state.signInState.message = message;
      } else if (statusCode === 400) {
        state.signInState.state = SignInState.EMAIL_INVALID;
        state.signInState.message = message;
      } else if (statusCode === 401) {
        state.signInState.state = SignInState.PASSWORD_INVALID;
        state.signInState.message = message;
      }
    });
    // 회원 가입 응답 처리
    builder.addCase(signUpThunk.fulfilled, (state, { payload }) => {
      if (payload === 200) {
        state.signUpState = SignUpState.SUCCESS;
      } else if (payload === 409) {
        state.signUpState = SignUpState.FAILED;
      }
    });
    // 구글 로그인 응답 처리
    builder.addCase(googleLogin.fulfilled, (state, { payload }) => {
      console.log(payload);
      const { accessToken, message, statusCode, userData } = payload;
      if (statusCode === 200) {
        state.accessToken = accessToken;
        state.userData = userData;
        state.signInState.state = SignInState.SUCCESS;
        state.signInState.message = message;
      } else if (statusCode === 400) {
        state.signInState.state = SignInState.EMAIL_INVALID;
        state.signInState.message = message;
      } else if (statusCode === 401) {
        state.signInState.state = SignInState.PASSWORD_INVALID;
        state.signInState.message = message;
      }
    });
    builder.addCase(facebookLogin.fulfilled, (state, { payload }) => {
      console.log(payload);
      const { accessToken, message, statusCode, userData } = payload;
      if (statusCode === 200) {
        state.accessToken = accessToken;
        state.userData = userData;
        state.signInState.state = SignInState.SUCCESS;
        state.signInState.message = message;
      } else if (statusCode === 400) {
        state.signInState.state = SignInState.EMAIL_INVALID;
        state.signInState.message = message;
      } else if (statusCode === 401) {
        state.signInState.state = SignInState.PASSWORD_INVALID;
        state.signInState.message = message;
      }
    });
  },
});

// actions
export const { clearSignUpState, userOffline, userOnline } = authSlice.actions;

// selectors
export const getSignUpState = (state: RootStateOrAny): SignUpState =>
  state.auth.signUpState;
export const getSignInState = (
  state: RootStateOrAny
): { state: SignInState; message: string } => state.auth.signInState;
export const getUserData = (state: RootStateOrAny): UserData =>
  state.auth.userData;

export default authSlice.reducer;
