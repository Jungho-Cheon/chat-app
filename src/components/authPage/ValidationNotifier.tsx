import React from 'react';

// styled components
import { ValidationContainer } from '../../styles/authStyles/validationNotifier-styles';

export interface ValidationProps {
  message: string;
  isShown: boolean;
}

const ValidationNotifier = ({
  message,
  isShown,
}: ValidationProps): JSX.Element => {
  return (
    <ValidationContainer message={message} isShown={isShown}>
      <p>{message}</p>
    </ValidationContainer>
  );
};

export default ValidationNotifier;
