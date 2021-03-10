import styled from 'styled-components';

export const MessageCardContainer = styled.div`
  width: 100%;
  height: 80px;
  background: white;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border-left: 5px solid rgba(244, 118, 85, 1);
  cursor: pointer;
`;
export const MessageCardAvatar = styled.div`
  width: 60px;
  height: 60px;
  max-width: 60px;
  min-width: 60px;
  margin: 20px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;
export const MessagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;
export const MessageUser = styled.div`
  color: ${props => props.theme.primaryText};
  font-weight: 600;
  margin-bottom: 5px;
`;
export const MessagePreview = styled.div`
  font-weight: 400;
  font-size: 0.8rem;
  color: ${props => props.theme.secondaryText};
`;
export const MessageInfoContainer = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0 15px 0 5px;
`;
export const TimeAgo = styled.div`
  font-weight: 400;
  font-size: 0.68rem;
  color: ${props => props.theme.secondaryText};
  margin-bottom: 10px;
`;
export const UnreadCount = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgba(244, 118, 85, 1);
  color: white;
  font-weight: 400;
  font-size: 0.68rem;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 0.15rem;
  }
`;
