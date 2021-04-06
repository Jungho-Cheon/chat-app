import store from '../app/store';
import { accessTokenRefresh } from '../features/auth/authSlice';
import {
  FriendRequest,
  ResponseFriendRequestProps,
} from '../features/friendRequest/friendRequestSlice';

const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

const FriendRequestClient = class {
  private hosturl: string;

  constructor(hosturl: string) {
    this.hosturl = hosturl;
  }
  async getFriendRequest(
    email: string,
    accessToken: string
  ): Promise<FriendRequest[]> {
    console.log(`accessToken`, accessToken);
    Response;
    const response = await fetch(
      this.hosturl + `/friend-request?email=${email}`,
      {
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    if (response.status === 419) {
      console.log(data.message);
      const newAccessToken = data.accessToken;
      // store.dispatch(accessTokenRefresh(newAccessToken));
      return this.getFriendRequest(email, newAccessToken);
    } else {
      console.log(data.friendRequests);
      return data.friendRequests;
    }
  }
  async checkFriendRequests(
    email: string,
    accessToken: string
  ): Promise<{ message: string }> {
    const response = await fetch(this.hosturl + '/friend-request', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (response.status === 419) {
      console.log(data.message);
      const newAccessToken = data.accessToken;
      store.dispatch(accessTokenRefresh(newAccessToken));
      return this.checkFriendRequests(email, newAccessToken);
    } else {
      console.log(data);
      return data;
    }
  }
  async responseFriendRequest(
    responseFriendRequestProps: ResponseFriendRequestProps,
    accessToken: string
  ): Promise<ResponseFriendRequestProps> {
    const response = await fetch(this.hosturl + '/friend-request', {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseFriendRequestProps),
    });
    const data = await response.json();
    if (response.status === 419) {
      console.log(data.message);
      const newAccessToken = data.accessToken;
      store.dispatch(accessTokenRefresh(newAccessToken));
      return this.responseFriendRequest(
        responseFriendRequestProps,
        newAccessToken
      );
    } else {
      console.log(data);
      return data;
    }
  }
};

export default new FriendRequestClient(SERVER_URL);
