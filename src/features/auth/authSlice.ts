import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoogleLoginResponse } from 'react-google-login';
import { RootStateOrAny } from 'react-redux';

// clients
import authClient from '../../client/authClient';
import { ChangeProfileProps } from '../../client/userInfoClient';
import {
  SignInProps,
  SignInResponse,
  SignInState,
  SignUpProps,
  SignUpState,
  UserData,
} from './authTypes';

// Async Thunks
export const signUpThunk = createAsyncThunk(
  'auth/sign-up',
  async (signUpData: SignUpProps) => {
    return await authClient.signUp(signUpData);
  }
);

export const signInThunk = createAsyncThunk(
  'auth/sign-in',
  async (signInData: SignInProps): Promise<SignInResponse> => {
    return await authClient.signIn(signInData);
  }
);

export const googleLogin = createAsyncThunk(
  'auth/google-login',
  async (loginData: GoogleLoginResponse) => {
    const { email, imageUrl, name } = loginData.profileObj;
    return await authClient.oAuthLogin({
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
    return await authClient.oAuthLogin({
      email,
      name,
      image: picture?.data.url || '',
    });
  }
);
const handleOAuth2Login = (state: any, { payload }: { payload: any }) => {
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
};
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
    addFriend(state, { payload }) {
      state.userData.friendData[payload.email] = payload;
    },
    userLogOut(state) {
      state = initialState;
      return state;
    },
    changeProfile(state, action: PayloadAction<ChangeProfileProps>) {
      const { avatarUrl, description, nickname } = action.payload;
      state.userData = {
        ...state.userData,
        avatarUrl,
        description,
        nickname,
      };
    },
    accessTokenRefresh(state, action: PayloadAction<string>) {
      const newAccessToken = action.payload;
      state.accessToken = newAccessToken;
      return state;
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
    // 구글, 페이스북 로그인 응답 처리
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
export const {
  clearSignUpState,
  userOffline,
  userOnline,
  addFriend,
  changeProfile,
  userLogOut,
  accessTokenRefresh,
} = authSlice.actions;

// selectors
export const getSignUpState = (state: RootStateOrAny): SignUpState =>
  state.auth.signUpState;
export const getSignInState = (
  state: RootStateOrAny
): { state: SignInState; message: string } => {
  console.log(JSON.stringify(state));
  return state.auth.signInState;
};
export const getUserData = (state: RootStateOrAny): UserData =>
  state.auth.userData;
export const getAccessToken = (state: RootStateOrAny): string =>
  state.auth.accessToken;

export default authSlice.reducer;
