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

  async getUserInfoByEmail(email: string): Promise<UserInfoType> {
    const response = await fetch(this.hostUrl + `/user?email=${email}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { userInfo, message } = await response.json();
    if (response.status !== 200) {
      console.error(message);
    }
    return userInfo;
  }
};

export default new UserInfoClient(process.env.REACT_APP_SERVER_URL || '');
