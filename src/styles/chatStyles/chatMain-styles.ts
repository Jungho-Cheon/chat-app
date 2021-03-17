import styled from 'styled-components';

export const ChatMainContainer = styled.div`
  position: relative;
`;
export const ChatSection = styled.main`
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
`;

export const ChatArea = styled.div`
  height: 100%;
  width: 100%;
`;

export const ChatDivider = styled.div`
  position: absolute;
  bottom: 90px;
  background-color: ${p => p.theme.divider};
  height: 1px;
  width: 90%;
  margin-left: 2.5%;
`;
