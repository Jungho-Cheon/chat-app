import styled from 'styled-components';

interface messageProps {
  unread: boolean;
}

export const MessageCardContainer = styled.div<messageProps>`
  width: 330px;
  height: 70px;
  background: ${props => props.theme.background};
  margin-bottom: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border-left: ${props =>
    props.unread ? `5px solid rgba(244, 118, 85, 1)` : ``};
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  &:hover {
    transform: scale(1.05);
  }
`;
export const MessageCardAvatar = styled.div`
  margin: 20px;
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
