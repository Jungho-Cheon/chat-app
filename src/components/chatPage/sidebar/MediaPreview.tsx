import React, { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMediaPreviews,
  getCurrentChatroomId,
  getMediaPreviews,
} from '../../../features/chatroom/chatroomSlice';

// component
import MediaPreviewModal from './MediaPreviewModal';

// styled component
import { MediaPreviewContainer } from '../../../styles/chatStyles/sidebarStyles/mediaPreview-styles';
import { MediaPreviewType } from '../../../features/chatroom/chatroomTypes';

export interface MediaPreview {
  email: string;
  fileURL: string;
  insertDate: string;
}
export interface MediaPreviewResponse {
  mediaPreviews: MediaPreview[];
}

const MediaPreview = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentChatroomId = useSelector(getCurrentChatroomId);
  const mediaPreviews = useSelector(getMediaPreviews);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [clickedMediaIdx, setClickedMediaIdx] = useState<number>(-1);

  const isShowPrimaryMedia = useMediaQuery({
    query: '(min-height: 830px)',
  });

  useLayoutEffect(() => {
    setIsModalOpened(false);
    setClickedMediaIdx(-1);
    if (mediaPreviews.length === 0)
      dispatch(fetchMediaPreviews(currentChatroomId));
  }, [currentChatroomId]);

  const mediaContentsClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    clickedMedia: MediaPreviewType
  ) => {
    e.preventDefault();
    mediaPreviews.find((media, idx) => {
      if (media.mediaId === clickedMedia.mediaId) {
        setClickedMediaIdx(idx);
        return true;
      }
    });
    setIsModalOpened(true);
  };
  return (
    <MediaPreviewContainer>
      <div className="media-preview__title">
        <h3>Media</h3>
        <a>Show More</a>
      </div>
      <div className="media-preview__wrapper">
        <div className="media-preview__media-contents-container">
          {isShowPrimaryMedia
            ? mediaPreviews?.map((media, idx) => {
                if (!media.fileUrl || idx > 3) return;
                return (
                  <div
                    className="media-preview__media-contents"
                    key={nanoid()}
                    onClick={e => mediaContentsClickHandler(e, media)}
                  >
                    {idx === 0 ? (
                      <img
                        className="primary"
                        src={media.fileUrl}
                        alt={media.fileUrl}
                      />
                    ) : (
                      <img src={media.fileUrl} alt={media.fileUrl} />
                    )}
                  </div>
                );
              })
            : mediaPreviews?.map((media, idx) => {
                if (idx > 8) return;
                return (
                  <div
                    className="media-preview__media-contents"
                    key={nanoid()}
                    onClick={e => mediaContentsClickHandler(e, media)}
                  >
                    <img src={media.fileUrl} alt={media.fileUrl} />
                  </div>
                );
              })}
        </div>
      </div>

      {clickedMediaIdx !== -1 && (
        <MediaPreviewModal
          isModalOpened={isModalOpened}
          setIsModalOpened={setIsModalOpened}
          clickedMediaIdx={clickedMediaIdx}
        />
      )}
    </MediaPreviewContainer>
  );
};

export default React.memo(MediaPreview);
