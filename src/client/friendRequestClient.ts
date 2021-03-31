import {
  FriendRequest,
  ResponseFriendRequestProps,
} from '../features/friendRequest/friendRequestSlice';

const FriendRequestClient = class {
  private hosturl: string;
  constructor(hosturl: string) {
    this.hosturl = hosturl;
  }
  async getFriendRequest(email: string): Promise<FriendRequest[]> {
    const response = await fetch(
      this.hosturl + `/friend-request?email=${email}`,
      {
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { friendRequests } = await response.json();
    console.log(friendRequests);
    return friendRequests;
  }
  async checkFriendRequests(email: string): Promise<{ message: string }> {
    const response = await fetch(this.hosturl + '/friend-request', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data;
  }
  async responseFriendRequest(
    responseFriendRequestProps: ResponseFriendRequestProps
  ): Promise<ResponseFriendRequestProps> {
    const response = await fetch(this.hosturl + '/friend-request', {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseFriendRequestProps),
    });
    const data = await response.json();
    return data;
  }
};

export default FriendRequestClient;
