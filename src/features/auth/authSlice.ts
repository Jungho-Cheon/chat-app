import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import Client from '../../client/authClient';

if (!process.env.REACT_APP_SERVER_URL) {
  console.error('server url required!');
} else {
  console.log('server url : ' + process.env.REACT_APP_SERVER_URL);
}
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';
const client = new Client(SERVER_URL.toString());

export interface SignUpProps {
  email: string;
  nickname: string;
  password: string;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  nickname: string;
  avatarUrl: string;
  chatroomIds: string[];
}

export interface SignInResponse {
  statusCode: number;
  message: string;
  userData: UserData;
  accessToken: string;
}

export enum SignUpState {
  IDLE,
  SUCCESS,
  FAILED,
}

export enum SignInState {
  IDLE,
  SUCCESS,
  EMAIL_INVALID,
  PASSWORD_INVALID,
}

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

const initialState = {
  accessToken: '',
  userData: {
    email: '',
    nickname: '',
    avatarUrl: '',
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
  },
  extraReducers: builder => {
    // 로그인 응답 처리
    builder.addCase(signInThunk.fulfilled, (state, { payload }) => {
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
  },
});

// actions
export const { clearSignUpState } = authSlice.actions;

// selectors
export const getSignUpState = (state: RootStateOrAny): SignUpState =>
  state.auth.signUpState;
export const getSignInState = (
  state: RootStateOrAny
): { state: SignInState; message: string } => state.auth.signInState;
export const getUserData = (state: RootStateOrAny): UserData =>
  state.auth.userData;

export default authSlice.reducer;
