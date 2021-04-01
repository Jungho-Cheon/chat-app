import React, { useLayoutEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';
import { getUserData } from '../../../features/auth/authSlice';
import { FriendData } from '../../../features/auth/authTypes';
import { getMediaPreviews } from '../../../features/chatroom/chatroomSlice';
import { MediaPreviewType } from '../../../features/chatroom/chatroomTypes';

// styled components
import {
  MediaPreviewModalContainer,
  SlideBarImage,
} from '../../../styles/chatStyles/sidebarStyles/mediaPreviewModal-styles';
import UserAvatar from '../avatar/UserAvatar';

const MediaPreviewModal = ({
  isModalOpened,
  setIsModalOpened,
  clickedMediaIdx,
}: {
  isModalOpened: boolean;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  clickedMediaIdx: number;
}): JSX.Element => {
  const [currentMediaIdx, setCurrentMediaIdx] = useState<number>(
    clickedMediaIdx
  );
  const [uploadUser, setUploadUser] = useState<FriendData>();
  const mediaPreviews = useSelector(getMediaPreviews);
  const userData = useSelector(getUserData);
  const closeModalHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsModalOpened(false);
  };

  const figureUploadUser = () => {
    if (userData.friendData[mediaPreviews[currentMediaIdx].email]) {
      setUploadUser(userData.friendData[mediaPreviews[currentMediaIdx].email]);
    } else {
      setUploadUser({
        avatarUrl: userData.avatarUrl,
        description: userData.description,
        email: userData.email,
        isLoggin: true,
        nickname: userData.nickname,
      });
    }
  };

  useLayoutEffect(() => {
    setCurrentMediaIdx(clickedMediaIdx);
    figureUploadUser();
  }, [clickedMediaIdx]);

  const slideBarMediaClickHandler = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    clickedMedia: MediaPreviewType
  ) => {
    e.preventDefault();
    mediaPreviews.find((media, idx) => {
      if (media.mediaId === clickedMedia.mediaId) {
        setCurrentMediaIdx(idx);
        return true;
      }
    });
  };
  const createSlideBarContents = (): JSX.Element => {
    console.log(currentMediaIdx, mediaPreviews.length);
    if (typeof currentMediaIdx === 'undefined' || !mediaPreviews) return <></>;
    let slideBarMedia;
    if (currentMediaIdx < 2) slideBarMedia = mediaPreviews.slice(0, 5);
    else if (currentMediaIdx > mediaPreviews.length - 3)
      slideBarMedia = mediaPreviews.slice(-5);
    else
      slideBarMedia = mediaPreviews.slice(
        currentMediaIdx - 2,
        currentMediaIdx + 3
      );
    console.log(slideBarMedia);
    return (
      <div
        className="media-preview-modal__slide-bar"
        onClick={e => e.stopPropagation()}
      >
        {slideBarMedia.map(media => (
          <SlideBarImage
            src={media.fileUrl}
            alt={media.fileUrl}
            key={media.mediaId}
            isCurrentImage={
              media.mediaId === mediaPreviews[currentMediaIdx].mediaId
            }
            onClick={e => slideBarMediaClickHandler(e, media)}
          />
        ))}
      </div>
    );
  };

  const arrowButtonClickHanlder = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentMediaIdx(prev => prev + idx);
    figureUploadUser();
    console.log(currentMediaIdx);
  };

  const getMediaDate = (insertDate: string) => {
    const date = new Date(insertDate);
    return (
      date.getFullYear() + '. ' + date.getMonth() + 1 + '. ' + date.getDate()
    );
  };

  const download = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    console.log('download', href);
    const response = await fetch(href, { mode: 'cors' });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop() || 'image';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  console.log(`currentMediaIdx ${currentMediaIdx}`);
  return (
    <MediaPreviewModalContainer
      isModalOpened={isModalOpened}
      onClick={closeModalHandler}
    >
      <div className="media-preview-modal__inner">
        {currentMediaIdx > 0 ? (
          <div
            className="media-preview-modal__prev-button"
            onClick={e => arrowButtonClickHanlder(e, -1)}
          >
            <i className="fas fa-arrow-circle-left"></i>
          </div>
        ) : (
          <div style={{ width: '40px' }} />
        )}
        {mediaPreviews && (
          <div
            className="media-preview-modal__media-box"
            onClick={e => e.stopPropagation()}
          >
            {uploadUser && mediaPreviews[currentMediaIdx] && (
              <>
                <div className="media-preview-modal__media-box__userinfo">
                  <UserAvatar avatarUrl={uploadUser.avatarUrl} width="40px" />
                  <h3>{uploadUser.nickname}</h3>
                  <span>
                    업로드{' '}
                    {getMediaDate(mediaPreviews[currentMediaIdx].insertDate)}
                  </span>
                  <a
                    href="#"
                    onClick={e =>
                      download(e, mediaPreviews[currentMediaIdx].fileUrl)
                    }
                  >
                    <div className="media-preview-modal__media-box__download-button">
                      <i className="fas fa-download"></i>
                    </div>
                  </a>
                </div>
                <img
                  src={mediaPreviews[currentMediaIdx].fileUrl}
                  alt="media-modal-image"
                />
              </>
            )}
          </div>
        )}

        {currentMediaIdx < mediaPreviews.length - 1 ? (
          <div
            className="media-preview-modal__next-button"
            onClick={e => arrowButtonClickHanlder(e, 1)}
          >
            <i className="fas fa-arrow-circle-right"></i>
          </div>
        ) : (
          <div style={{ width: '40px' }} />
        )}
      </div>

      {isModalOpened && createSlideBarContents()}
    </MediaPreviewModalContainer>
  );
};

export default React.memo(MediaPreviewModal);
