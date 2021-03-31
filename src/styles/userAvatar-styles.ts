import styled from 'styled-components';

interface WidthProp {
  width: string;
}

export const AvatarContainer = styled.div<WidthProp>`
  width: ${props => props.width};
  height: ${props => props.width};
  min-width: ${props => props.width};
  max-width: ${props => props.width};
`;
export const AvatarImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const AvatarRectImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 5%;
`;
