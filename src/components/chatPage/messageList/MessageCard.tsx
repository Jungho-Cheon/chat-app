import React, { useLayoutEffect, useState } from 'react';

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
} from '../../../styles/chatStyles/MessageList-styles/messageCard-styles';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  changeChatroom,
  checkOutChatroom,
  checkReadMessages,
  getCurrentChatroomId,
} from '../../../features/chatroom/chatroomSlice';
import ChatroomType from '../../../features/chatroom/chatroomTypes';
import { getUserData } from '../../../features/auth/authSlice';

// services
import { calcTimeAgo } from '../../../utils/time';

export interface MessageCardProps extends ChatroomType {
  email: string;
  unreadCount: number;
}

const MessageCard: React.FunctionComponent<MessageCardProps> = ({
  chatMessages,
  chatroomId,
  participants,
  unreadCount,
  email,
}: MessageCardProps): JSX.Element => {
  const dispatch = useDispatch();
  const [chatroomAvatar, setChatroomAvatar] = useState<string>('');
  const [chatroomName, setChatroomName] = useState<string>('');
  const [previewMessage, setPreviewMessage] = useState<string>('');
  const [timeAgo, setTimeAgo] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('');
  const { friendData } = useSelector(getUserData);
  const currentChatroomId = useSelector(getCurrentChatroomId);
  const selectChatRoom = (e: React.MouseEvent) => {
    e.preventDefault();
    if (unreadCount > 0) {
      dispatch(checkOutChatroom({ chatroomId, email }));
      dispatch(checkReadMessages({ chatroomId, email }));
    }
    dispatch(changeChatroom(chatroomId));
  };

  // const countUnreadMessages = () => {};
  useLayoutEffect(() => {
    const targetUserEmail = participants.filter(user => user.email !== email)[0]
      .email;
    const targetUserData = friendData[targetUserEmail];
    setChatroomAvatar(targetUserData.avatarUrl);
    setChatroomName(targetUserData.nickname);
    if (chatMessages.length > 0) {
      const lastMessages = chatMessages[chatMessages.length - 1].messages;
      const lastMessage = lastMessages[lastMessages.length - 1];
      setMessageType(lastMessage.messageType);
      setPreviewMessage(lastMessage.message);
      if (lastMessage.insertDate)
        setTimeAgo(calcTimeAgo(lastMessage.insertDate));
    }
  }, [chatMessages]);

  const getPreviewMessage = (message: string): string =>
    message.length > 30 ? message.substring(0, 30) + '...' : message;

  return (
    <MessageCardContainer
      unread={false}
      isSelected={chatroomId === currentChatroomId}
      onClick={selectChatRoom}
    >
      <MessageCardAvatar>
        <UserAvatar avatarUrl={chatroomAvatar} width="50px" />
      </MessageCardAvatar>
      <MessagePreviewContainer>
        <MessageUser> {chatroomName} </MessageUser>
        <MessagePreview>
          {messageType === 'IMAGE' ? '사진' : getPreviewMessage(previewMessage)}
        </MessagePreview>
      </MessagePreviewContainer>
      <MessageInfoContainer>
        <TimeAgo>{timeAgo}</TimeAgo>
        {unreadCount !== 0 && (
          <UnreadCount>
            <p>{unreadCount.toString()}</p>
          </UnreadCount>
        )}
      </MessageInfoContainer>
    </MessageCardContainer>
  );
};

export default MessageCard;
