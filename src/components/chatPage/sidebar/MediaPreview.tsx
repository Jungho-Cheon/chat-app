import { nanoid } from '@reduxjs/toolkit';
import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChatroom } from '../../../features/chatroom/chatroomSlice';

import { MediaPreviewContainer } from '../../../styles/chatStyles/sidebarStyles/mediaPreview-styles';

interface Media {
  email: string;
  // nickname: string;
  mediaURL: string;
}

const MediaPreview = (): JSX.Element => {
  const { chatMessages } = useSelector(getCurrentChatroom);
  const [media, setMedia] = useState<Media[]>();
  useLayoutEffect(() => {
    const mediaSet = new Set<Media>();
    chatMessages.forEach(chatMessage =>
      chatMessage.messages.forEach(
        message =>
          ['IMAGE'].includes(message.messageType) &&
          mediaSet.add({
            email: chatMessage.email,
            mediaURL: message.message || '',
          })
      )
    );
    setMedia(Array.from(mediaSet));
  }, [chatMessages]);
  return (
    <MediaPreviewContainer>
      <div className="media-preview__title">
        <h3>Media</h3>
        <a>Show More</a>
      </div>
      <div className="media-preview__media-contents-container">
        {media?.map((info, idx) => {
          if (idx === 0)
            return (
              <div className="media-preview__media-contents" key={nanoid()}>
                <img
                  className="primary"
                  src={info.mediaURL}
                  alt={info.mediaURL}
                />
              </div>
            );
          else if (idx < 4)
            return (
              <div className="media-preview__media-contents" key={nanoid()}>
                <img src={info.mediaURL} alt={info.mediaURL} />
              </div>
            );
        })}
      </div>
    </MediaPreviewContainer>
  );
};

export default MediaPreview;
