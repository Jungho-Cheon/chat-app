// import store from '../app/store';
import { accessTokenRefresh } from '../features/auth/authSlice';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Chatroom } from '../components/chatPage/messageList/messageCardTypes';
import ChatroomType, {
  MediaPreviewResponse,
  ReadCheckChatroomProps,
  RequestNextMessagePageProps,
  UploadFileResponse,
  UrlData,
} from '../features/chatroom/chatroomTypes';

const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

const ChatClient = class {
  private hostURL: string;
  constructor(hostURL: string) {
    this.hostURL = hostURL;
  }
  // Chatroom의 목록을 요청
  async getChatroomList(
    email: string,
    accessToken: string,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
  ): Promise<Chatroom[]> {
    console.log('accessToken', accessToken);
    const response = await fetch(this.hostURL + `/chatroom?email=${email}`, {
      method: 'get',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status === 419) {
      console.log(data.message);
      const newAccessToken = data.accessToken;
      dispatch(accessTokenRefresh(newAccessToken));
      return this.getChatroomList(email, newAccessToken, dispatch);
    } else {
      console.log(data);
      return data;
    }
  }
  // 로그인시 채팅방의 초기 데이터를 요청
  async fetchChatroomInfo(
    chatroomId: string,
    accessToken: string,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
  ): Promise<ChatroomType> {
    console.log('accessToken', accessToken);
    const response = await fetch(this.hostURL + `/chatroom`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatroomId }),
    });
    const data = await response.json();
    if (response.status === 419) {
      console.log(data);
      const newAccessToken = data.accessToken;
      dispatch(accessTokenRefresh(newAccessToken));
      return this.fetchChatroomInfo(chatroomId, newAccessToken, dispatch);
    } else {
      console.log(data);
      return data;
    }
  }

  // 로그인시 채팅방의 미디어 타입 메세지의 파일 URL 요청
  async fetchMediaPreviews(
    chatroomId: string,
    accessToken: string,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
  ): Promise<MediaPreviewResponse> {
    console.log('accessToken', accessToken);
    const response = await fetch(this.hostURL + `/chatroom/media`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatroomId }),
    });
    const data = await response.json();
    if (response.status === 419) {
      console.log(data);
      const newAccessToken = data.accessToken;
      dispatch(accessTokenRefresh(newAccessToken));
      return this.fetchMediaPreviews(chatroomId, newAccessToken, dispatch);
    } else {
      console.log(data);
      return data;
    }
  }
  // 메세지 페이지 요청
  async requestNextMessagePage(
    requestNextMessagePageProps: RequestNextMessagePageProps,
    accessToken: string,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
  ): Promise<ChatroomType> {
    console.log('accessToken', accessToken);
    const { chatroomId, page } = requestNextMessagePageProps;
    const response = await fetch(
      this.hostURL + `/chatroom?chatroomId=${chatroomId}&page=${page}`,
      {
        method: 'get',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    if (response.status === 419) {
      console.log(data);
      const newAccessToken = data.accessToken;
      dispatch(accessTokenRefresh(newAccessToken));
      return this.requestNextMessagePage(
        requestNextMessagePageProps,
        newAccessToken,
        dispatch
      );
    } else {
      console.log(data);
      return data;
    }
  }
  async readCheckChatroom(
    readCheckChatroomProps: ReadCheckChatroomProps,
    accessToken: string,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
  ): Promise<ChatroomType> {
    console.log('accessToken', accessToken);
    const response = await fetch(this.hostURL + `/chatroom/check`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(readCheckChatroomProps),
    });
    const data = await response.json();
    if (response.status === 419) {
      console.log(data);
      const newAccessToken = data.accessToken;
      dispatch(accessTokenRefresh(newAccessToken));
      return this.readCheckChatroom(
        readCheckChatroomProps,
        newAccessToken,
        dispatch
      );
    } else {
      console.log(data);
      return data;
    }
  }
  // 사진, 파일 업로드 -> gcp cloud storage
  async uploadFile(
    chatroomId: string,
    file: File,
    accessToken: string,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
  ): Promise<UploadFileResponse> {
    console.log('accessToken', accessToken);
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(this.hostURL + `/chatroom/file`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        chatroomId,
      },
      body: formData,
    });
    const data = await response.json();
    if (response.status === 419) {
      console.log(data);
      const newAccessToken = data.accessToken;
      dispatch(accessTokenRefresh(newAccessToken));
      return this.uploadFile(chatroomId, file, newAccessToken, dispatch);
    } else {
      console.log(data);
      return data;
    }
  }
  // url preview data 요청
  async getLinkPreview(
    url: string,
    accessToken: string,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
  ): Promise<UrlData> {
    console.log('accessToken', accessToken);
    const response = await fetch(this.hostURL + `/chatroom/url`, {
      method: 'post',
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    if (response.status === 419) {
      console.log(data);
      const newAccessToken = data.accessToken;
      dispatch(accessTokenRefresh(newAccessToken));
      return this.getLinkPreview(url, newAccessToken, dispatch);
    } else {
      console.log(data);
      return data;
    }
  }
};

export default new ChatClient(SERVER_URL);
