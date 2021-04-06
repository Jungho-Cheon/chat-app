import store from '../app/store';
import { accessTokenRefresh } from '../features/auth/authSlice';

const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

export interface ChangeProfileProps {
  email: string;
  nickname: string;
  description: string;
  avatarUrl: string;
}

export interface UserInfoType {
  email: string;
  nickname: string;
  avatarUrl: string;
}
const UserInfoClient = class {
  private hostUrl: string;
  constructor(hostUrl: string) {
    this.hostUrl = hostUrl;
  }
  async getUserInfoByEmail(
    email: string,
    accessToken: string
  ): Promise<UserInfoType> {
    console.log(`accessToken`, accessToken);
    const response = await fetch(this.hostUrl + `/user?email=${email}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status === 419) {
      console.log(data.message);
      const newAccessToken = data.accessToken;
      store.dispatch(accessTokenRefresh(newAccessToken));
      return this.getUserInfoByEmail(email, newAccessToken);
    } else {
      console.log(data.userInfo);
      return data.userInfo;
    }
  }
  async changeProfile(
    changeProfileProps: ChangeProfileProps,
    accessToken: string
  ): Promise<any> {
    console.log(`accessToken`, accessToken);
    const response = await fetch(this.hostUrl + '/user', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...changeProfileProps }),
    });
    const data = await response.json();
    if (response.status === 419) {
      console.log(data.message);
      const newAccessToken = data.accessToken;
      store.dispatch(accessTokenRefresh(newAccessToken));
      return this.changeProfile(changeProfileProps, newAccessToken);
    } else {
      console.log(data);
      return data;
    }
  }
};

export default new UserInfoClient(SERVER_URL);
