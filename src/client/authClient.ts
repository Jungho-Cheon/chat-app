import {
  SignInProps,
  SignInResponse,
  SignUpProps,
} from '../features/auth/authTypes';

export interface OAuthSignInProps {
  email: string;
  name: string;
  image: string;
}

const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

const AuthClient = class {
  hostUrl: string;
  constructor(hostUrl: string) {
    this.hostUrl = hostUrl;
  }
  async signUp({ email, nickname, password }: SignUpProps): Promise<number> {
    const response = await fetch(this.hostUrl + '/sign-up', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, nickname, password }),
    });
    return response.status;
  }
  async signIn({ email, password }: SignInProps): Promise<SignInResponse> {
    const response = await fetch(this.hostUrl + '/sign-in', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const { accessToken, message, userData } = await response.json();
    return { statusCode: response.status, accessToken, message, userData };
  }
  async oAuthLogin(loginData: OAuthSignInProps): Promise<SignInResponse> {
    const response = await fetch(this.hostUrl + '/sign-in/oauth2', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...loginData }),
    });
    const { accessToken, message, userData } = await response.json();
    return { statusCode: response.status, accessToken, message, userData };
  }
};

export default new AuthClient(SERVER_URL);