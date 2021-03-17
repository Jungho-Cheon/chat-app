import styled from 'styled-components';
import { ValidationProps } from '../../components/authPage/ValidationNotifier';

export const ValidationContainer = styled.div<ValidationProps>`
  width: 100%;
  height: 16px;
  p {
    display: ${props => (props.isShown ? `block` : `none`)};
    font-size: 0.7rem;
    color: red;
  }
`;
