import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeProfile,
  getAccessToken,
  getUserData,
} from '../../../features/auth/authSlice';

// styled-components
import {
  EditProfileModalContainer,
  SaveButton,
} from '../../../styles/chatStyles/userProfile-styles/editProfileModal-styles';

// client
import chatClient from '../../../client/chatClient';
import userInfoClient from '../../../client/userInfoClient';

// types
import { ChangeProfileProps } from '../../../client/userInfoClient';

interface EditProfileModalProps {
  setShowEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const createEmailText = (email: string): string => {
  const ellipsis = email.length > 25 ? '...' : '';
  return email.substr(0, 25) + ellipsis;
};
const EditProfileModal = ({
  setShowEditProfileModal,
}: EditProfileModalProps): JSX.Element => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const accessToken = useSelector(getAccessToken);
  const [nickname, setNickname] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const profileImage = useRef<HTMLImageElement>(null);
  useEffect(() => {
    setNickname(userData.nickname);
    setIntroduction(userData.description);
  }, [userData]);
  const profilePictureClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    // e.preventDefault();
    console.log(fileInput.current);
    fileInput.current?.click();
  };
  const fileSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image')) {
      alert('사진을 선택해주세요! 😣');
      return;
    }
    if (file.size > 5 * 2 ** 20) {
      alert('5MB 이하의 파일만 전송할 수 있습니다.. 😵');
      return;
    }
    if (FileReader) {
      const fr = new FileReader();
      const target = profileImage.current;
      fr.onload = () => {
        if (target) target.src = fr.result as string;
      };
      fr.readAsDataURL(file);
    }
  };
  const saveEditProfile = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    let isEdited = false;
    let avatarUrl = userData.avatarUrl;
    if (profileImage.current?.src.startsWith('data')) {
      console.log('image transfer');
      const url = profileImage.current.src;
      const blob = await (await fetch(url)).blob();
      const file = new File(
        [blob],
        userData.email +
          new Date(Date.now() + 9 * 1000 * 60 * 60).toISOString() +
          '.' +
          blob.type.split('/')[1],
        {
          type: blob.type,
        }
      );
      const response = await chatClient.uploadFile(
        userData.email,
        file,
        accessToken,
        dispatch
      );
      console.log(response);
      avatarUrl = response.fileUrl;
      isEdited = true;
    }
    if (userData.nickname !== nickname || userData.description !== introduction)
      isEdited = true;

    if (isEdited) {
      const changedUserProfile: ChangeProfileProps = {
        email: userData.email,
        nickname,
        description: introduction,
        avatarUrl,
      };
      dispatch(changeProfile(changedUserProfile));
      userInfoClient.changeProfile(changedUserProfile, accessToken);
    }
    setIsLoading(false);
    setShowEditProfileModal(false);
  };
  return (
    <EditProfileModalContainer onClick={() => setShowEditProfileModal(false)}>
      <section
        className="edit-profile-modal__inner-container"
        onClick={e => e.stopPropagation()}
      >
        <img
          className="edit-profile-modal__profile-background"
          src="https://www.freevector.com/uploads/vector/preview/30348/Minimal_Dynamic_Background.jpg"
          alt="profile-background"
        />
        <div
          className="edit-profile-modal__profile-picture-container"
          onClick={profilePictureClickHandler}
        >
          <img
            ref={profileImage}
            src={userData.avatarUrl}
            alt="profile-picture"
            className="edit-profile-modal__profile-picture"
          />
          <div className="edit-profile-modal__profile-picture-change">
            <span>변경</span>
          </div>
          <input
            ref={fileInput}
            id="profile-picture-selector"
            name="profile-picture-selector"
            type="file"
            style={{ display: 'none' }}
            onChange={fileSelectHandler}
          />
        </div>
        {/* e-mail */}
        <div className="edit-profile-modal__profile-email">
          <i className="fas fa-envelope-square"></i>
          <p>{createEmailText(userData.email)}</p>
        </div>
        <section className="edit-profile-modal__edit-section">
          <h3>Nickname</h3>
          <input
            type="text"
            placeholder={userData.nickname}
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <h3>Introduction</h3>
          <textarea
            name=""
            id=""
            rows={2}
            placeholder={userData.description}
            value={introduction}
            onChange={e => setIntroduction(e.target.value)}
          ></textarea>
          <SaveButton
            className="edit-profile-modal__save-button"
            onClick={saveEditProfile}
            isLoading={isLoading}
          >
            {isLoading ? 'saving...' : 'save'}
          </SaveButton>
        </section>
      </section>
    </EditProfileModalContainer>
  );
};

export default EditProfileModal;
