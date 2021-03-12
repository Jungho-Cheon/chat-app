import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';

// MockUp Server
import Server from '../../tests/server/mockUpServer';
import { loginData } from './loginTypes';

export const loginRequest = createAsyncThunk(
  'login/login',
  async (loginData: loginData) => {
    if (loginData.userId !== null || loginData.password !== null)
      alert('userId and password is not used. this is Test Login!');
    const response = await Server.userLogin();
    return response as UserData;
  }
);

interface UserData {
  userId: string;
  userName: string;
  avatarUrl: string;
}

const initialState: {
  userLogin: boolean;
  userData: UserData;
} = {
  userLogin: false,
  userData: {
    userId: '',
    userName: '',
    avatarUrl: '',
  },
};
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginRequest.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.userLogin = true;
      state.userData = payload;
    });
  },
});

export const userDataSelector = (state: RootStateOrAny): UserData =>
  state.login.userData;

export default loginSlice.reducer;
