import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import store from '../../app/store';

// client
import friendRequestClient from '../../client/friendRequestClient';
// socket
import socket from '../../socket/socket';
// types
import { FriendData } from '../auth/authTypes';

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
  async (email: string, { getState }): Promise<FriendRequest[]> => {
    const {
      auth: { accessToken },
    } = getState() as {
      auth: { accessToken: string };
    };
    return await friendRequestClient.getFriendRequest(email, accessToken);
  }
);

export const checkFriendRequests = createAsyncThunk(
  'friendRequest/checkFriendReqeusts',
  async (email: string, { getState }) => {
    const {
      auth: { accessToken },
    } = getState() as {
      auth: { accessToken: string };
    };
    const friendRequest = store.getState().friendRequest;
    if (
      friendRequest.length > 0 &&
      !friendRequest[friendRequest.length - 1].isChecked
    )
      return await friendRequestClient.checkFriendRequests(email, accessToken);
  }
);

export const responseFriendRequest = createAsyncThunk(
  'friendRequest/response',
  async (
    responseFriendRequestProps: ResponseFriendRequestProps,
    { getState }
  ) => {
    const {
      auth: { accessToken },
    } = getState() as {
      auth: { accessToken: string };
    };
    const receiveEmail = store.getState().auth.userData.email;
    const props = {
      ...responseFriendRequestProps,
      receiveEmail,
    };
    socket.emit('RESPONSE_FRIEND_REQUEST', JSON.stringify(props));
    return await friendRequestClient.responseFriendRequest(props, accessToken);
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
