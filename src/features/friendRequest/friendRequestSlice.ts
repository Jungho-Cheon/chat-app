import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import store from '../../app/store';

import FriendRequestClient from '../../client/friendRequestClient';
import socket from '../../socket/socket';
import { FriendData } from '../auth/authTypes';

const client = new FriendRequestClient(process.env.REACT_APP_SERVER_URL || '');

export interface FriendRequest {
  email: string;
  nickname: string;
  avatarUrl: string;
  status: string;
  insertDate: string;
  isChecked: boolean;
  isResponse?: boolean;
}

export interface HandleFriendRequestProps {
  email: string;
  status: string;
}

export interface ResponseFriendRequestProps {
  sendEmail: string;
  receiveEmail?: string;
  accept: boolean;
}

export const getFriendRequest = createAsyncThunk(
  'friendRequest/getFriendRequest',
  async (email: string): Promise<FriendRequest[]> => {
    return await client.getFriendRequest(email);
  }
);

export const checkFriendRequests = createAsyncThunk(
  'friendRequest/checkFriendReqeusts',
  async () => {
    const friendRequest = store.getState().friendRequest;
    const email = store.getState().auth.userData.email;
    if (
      friendRequest.length > 0 &&
      !friendRequest[friendRequest.length - 1].isChecked
    )
      return await client.checkFriendRequests(email);
  }
);

export const responseFriendRequest = createAsyncThunk(
  'friendRequest/response',
  async (responseFriendRequestProps: ResponseFriendRequestProps) => {
    const receiveEmail = store.getState().auth.userData.email;
    const props = {
      ...responseFriendRequestProps,
      receiveEmail,
    };
    socket.emit('RESPONSE_FRIEND_REQUEST', JSON.stringify(props));
    return await client.responseFriendRequest(props);
  }
);

const friendRequestSlice = createSlice({
  name: 'friendRequest',
  initialState: [] as FriendRequest[],
  reducers: {
    handleRequest(state, action: PayloadAction<FriendRequest>) {
      const { email, status } = action.payload;
      if (status === 'IDLE') {
        console.log('status IDLE!');
        return state.filter(fr => {
          console.log(fr.email, email, fr.email !== email);
          return fr.email !== email;
        });
      } else if (status === 'PENDING') {
        state.push(action.payload);
      } else {
        alert('error!');
      }
    },
    addResponseRequest(state, action: PayloadAction<FriendData>) {
      const { avatarUrl, email, nickname } = action.payload;
      state.push({
        avatarUrl,
        email,
        nickname,
        insertDate: JSON.stringify(new Date()),
        isChecked: false,
        status: 'ACCEPT',
        isResponse: true,
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(getFriendRequest.fulfilled, (state, { payload }) => {
      state = state.concat(payload);
      return state;
    });
    builder.addCase(checkFriendRequests.fulfilled, state => {
      state = state.map(fr => ({ ...fr, isChecked: true }));
      return state;
    });
    builder.addCase(responseFriendRequest.fulfilled, (state, { payload }) => {
      console.log('responseFriendRequest.fulfilled', payload);
      const { sendEmail, accept } = payload;
      const status = accept ? 'ACCEPT' : 'REJECT';
      state = state.map(fr => {
        if (fr.email === sendEmail) return { ...fr, status };
        return fr;
      });
      return state;
    });
  },
});

// actions
export const { handleRequest, addResponseRequest } = friendRequestSlice.actions;

// selectors
export const getCurrentFriendRequest = (
  state: RootStateOrAny
): FriendRequest[] => {
  return state.friendRequest;
};

export default friendRequestSlice.reducer;
