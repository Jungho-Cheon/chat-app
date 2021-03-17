import React from 'react';

// lotie
import Lottie from 'react-lottie';
import animationData from '../../../lotties/PRODUCT/Animation 06/drawkit-grape-animation-6-LOOP.json';

// styled components
import {
  PleaseSelectChatContainer,
  LottieContainer,
} from '../../../styles/chatStyles/pleaseSelectChat-styles';

const PleaseSelectChat = (): JSX.Element => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <PleaseSelectChatContainer>
      <LottieContainer>
        <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
      </LottieContainer>
      <h1>{`Let's Start Chat`}</h1>
    </PleaseSelectChatContainer>
  );
};

export default PleaseSelectChat;
