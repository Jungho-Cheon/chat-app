import {
  SignInProps,
  SignInResponse,
  SignUpProps,
} from '../features/auth/authSlice';

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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const { accessToken, message, userData } = await response.json();
    return { statusCode: response.status, accessToken, message, userData };
  }
};

export default AuthClient;
