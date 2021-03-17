import React, { useEffect, useState } from 'react';

// components
import UserAvatar from '../avatar/UserAvatar';

// styled component
import {
  MessageCardContainer,
  MessagePreviewContainer,
  MessageUser,
  MessagePreview,
  MessageInfoContainer,
  TimeAgo,
  UnreadCount,
  MessageCardAvatar,
} from '../../../styles/chatStyles/messageCard-styles';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { changeChatroom } from '../../../features/chatroom/chatroomSlice';
import ChatroomType from '../../../features/chatroom/chatroomTypes';
import { getUserData, UserData } from '../../../features/auth/authSlice';

export interface MessageCardProps extends ChatroomType {
  email: string;
}

const MessageCard: React.FunctionComponent<MessageCardProps> = ({
  chatMessages,
  chatroomId,
  participants,
  email,
}: MessageCardProps): JSX.Element => {
  const dispatch = useDispatch();
  const [chatroomAvatar, setChatroomAvatar] = useState<string>('');
  const [chatroomName, setChatroomName] = useState<string>('');
  const [previewMessage, setPreviewMessage] = useState<string>('');

  const selectChatRoom = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(changeChatroom(chatroomId));
  };

  // const countUnreadMessages = () => {};
  useEffect(() => {
    const otherUser = participants.filter(user => user.email !== email)[0];
    setChatroomAvatar(otherUser.avatarUrl);
    setChatroomName(otherUser.nickname);
    if (chatMessages.length > 0) {
      const lastMessages = chatMessages[chatMessages.length - 1].messages;
      const lastMessage = lastMessages[lastMessages.length - 1].message;
      setPreviewMessage(lastMessage);
    }
  }, [chatMessages]);

  return (
    <MessageCardContainer unread={false} onClick={selectChatRoom}>
      <MessageCardAvatar>
        <UserAvatar avatarUrl={chatroomAvatar} width="50px" />
      </MessageCardAvatar>
      <MessagePreviewContainer>
        <MessageUser> {chatroomName} </MessageUser>
        <MessagePreview>
          {' '}
          {previewMessage?.substring(0, 40)}
          {previewMessage.length >= 40 && '...'}
        </MessagePreview>
      </MessagePreviewContainer>
      <MessageInfoContainer>
        {/* <TimeAgo>{timeago}</TimeAgo>
        {unreadCount && (
          <UnreadCount>
            <p>{unreadCount.toString()}</p>
          </UnreadCount>
        )} */}
      </MessageInfoContainer>
    </MessageCardContainer>
  );
};

export default MessageCard;
