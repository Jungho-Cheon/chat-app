## 채팅은 [Talki](https://talki.link/)
- 이번 프로젝트는 사용자 인터페이스를 위한 React.js와 회원, 채팅방 정보 등 상태관리를 위해 Redux-toolkit을 사용하였습니다.
- socket.io를 통해 사용자가 속한 채팅방에 대해 내용을 publish/subscribe 하여 실시간으로 채팅 내용을 주고 받을 수 있습니다.
- 부가적으로 상대방이 입력 중인지 알려주는 기능과 on/offline 상태를 알려주는 기능 또한 socket.io를 통해 구현되었습니다.
- 채팅방을 통해 사용자는 텍스트 뿐만 아니라 사진, 파일 등을 전송할 수 있고 사진인 경우 왼쪽 하단의 Media section을 통해 탐색할 수 있습니다.
- Authentication은 JWT를 통해 관리되어 socket.io를 제외한 세션은 존재하지 않습니다.
- 채팅 어플리케이션의 특성상 정적인 파일들이 많지 않고, 다른 사용자와 채팅을 통해 생성되는 데이터가 대부분이기 때문에 SSR을 제공하지 않았습니다.
- User, Chatroom 정보를 저장하기 위해 MongoDB를 사용하였으며 인스턴스는 Atlas를 통해 생성하였습니다.
- 파일이나 사진은 Talki Server를 통해 GCP의 Cloud Storage에 저장됩니다.

## homePage (/)
> 사진 필요
- 간단한 랜딩 화면을 통해 앱에 대한 설명을 제공합니다. 
- Sign-in, Sign-up 버튼을 통해 인증화면으로 전환할 수 있습니다.

## signInPage, signUpPage (/sign-in, /sign-up)
<img width="450" style="display: inline-block;" alt="스크린샷 2021-04-12 오전 10 51 24" src="https://user-images.githubusercontent.com/61958795/114330604-0a3e3b80-9b7d-11eb-9fce-55f7297254e0.png"><img width="450" style="display: inline-block;" alt="스크린샷 2021-04-12 오전 10 50 48" src="https://user-images.githubusercontent.com/61958795/114330558-f2ff4e00-9b7c-11eb-9515-009453051371.png">
- signUpPage의 폼을 통해 회원가입하면 이메일 인증서버를 통해 회원가입에 사용한 이메일로 **인증 링크**가 전송됩니다.
- **인증 링크**를 클릭하여 인증을 마치면 해당 계정을 통해 로그인할 수 있습니다.
- 또한, OAuth2.0를 통한 Google Login, Facebook 로그인을 제공하여 손쉬운 회원가입이 가능합니다.
### `사용자 인증`
- 사용자가 로그인을 하는 경우 Talki 서버는 accessToken과 refreshToken을 발급합니다.
- XSS에 대한 보안을 위해 accessToken은 별도의 저장을 하지 않고 메모리 상에서 관리되며, refreshToken은 http-only 속성을 가진 Cookie를 통해 저장되어 자바스크립트를 통해 접근하지 못하도록 하였습니다.
- react 앱의 특성상 페이지를 새로고침하면 현재 상태값을 잃어버리게 됩니다. 이러한 특징을 보완하기 위해 사용자가 chatPage에 처음 접근하였을 때, Talki Server에 refreshToken을 보내 검증을 하고 올바른 token인 경우 사용자의 이메일을 기반으로 필요한 사용자 정보를 초기화합니다.

## chatPage(/chat)
### `Overview`
<img width="800" alt="스크린샷 2021-04-12 오전 11 34 33" src="https://user-images.githubusercontent.com/61958795/114333352-0f05ee00-9b83-11eb-952e-09c212307ddf.png">

### `친구 추가`
![discover_friend_modal](https://user-images.githubusercontent.com/61958795/114332379-188e5680-9b81-11eb-8dd8-a364b2fb9380.gif)<img width="380" alt="스크린샷 2021-04-12 오전 11 22 16" src="https://user-images.githubusercontent.com/61958795/114332518-58553e00-9b81-11eb-9566-8b10637a4556.png">
- 사용자는 채팅을 시작하기 위해 이메일이나 이름으로 사용자를 검색하여 친구신청을 해야합니다.
- 친구 추가 버튼을 통해 사용자를 검색할 수 있는 모달을 띄울 수 있습니다.
- 친구 신청을 받은 사용자는 Service Worker를 통해 push 알림을 받습니다. 요청은 왼쪽 상단 Profile의 NotificationSection에서 확인할 수 있습니다.

### `친구 목록`
<img width="299" alt="스크린샷 2021-04-12 오전 11 27 30" src="https://user-images.githubusercontent.com/61958795/114332898-12e54080-9b82-11eb-96bc-7b8e6b88de47.png">
- 친구 추가가 완료된 사용자는 왼쪽 상단 Profile의 FriendsSection에서 확인할 수 있습니다.
- 친구의 아바타를 클릭하면 친구의 간단한 정보와 함께 채팅을 시작할 수 있는 버튼을 확인할 수 있습니다. 버튼을 클릭하게 되면 기존에 채팅방이 존재하는 경우 해당 채팅방으로 전환되며 그렇지 않은 경우 새로운 채팅방을 개설합니다.

### `채팅 목록`
<table>
  <tr>
    <td vlign="center"><img height="400" alt="스크린샷 2021-04-12 오전 11 31 10" src="https://user-images.githubusercontent.com/61958795/114333146-956e0000-9b82-11eb-8c24-8c1d5d33cba8.png"></td>
    <td vlign="center">&#8594;</td>
    <td vlign="center"><img height="400" alt="스크린샷 2021-04-12 오전 11 31 40" src="https://user-images.githubusercontent.com/61958795/114333174-a7e83980-9b82-11eb-8877-4fd0aeb80fcb.png"></td>
  </tr>
</table>

- 채팅방은 사용자의 이름을 통한 **검색기능**이 제공됩니다.
- 각 채팅방을 클릭하여 현재 채팅방을 변경할 수 있습니다.

### `채팅창`
![chatting](https://user-images.githubusercontent.com/61958795/114334758-3ad6a300-9b86-11eb-8488-dce761a78c87.gif)

<br/>

![file_transfer](https://user-images.githubusercontent.com/61958795/114335585-05cb5000-9b88-11eb-9f94-52c877b5326d.gif)
- 채팅창의 메세지는 메세지를 보낸 사용자가 연달아 보낼 경우 그룹핑 되어 표시됩니다.
- 입력한 메세지가 정상적으로 전송되었는지 확인할 수 있는 프로그레스 서클이 제공됩니다.
- 상대방이 입력중인 경우를 알려주는 표시와 읽음 표시를 제공합니다.
- 드래그 앤 드랍, 파일 전송 버튼을 통해 사진이나 파일을 전송할 수 있습니다.
- 전송된 파일은 GCP의 Cloud Storage의 각 채팅방 ID를 통해 보관됩니다.
