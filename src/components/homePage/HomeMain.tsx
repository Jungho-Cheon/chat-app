import React from 'react';

import Lottie from 'react-lottie';

// styled components
import { SignUpButton } from '../../styles/homeStyles/homeHeader-styles';
import {
  HomeMainContainer,
  HomeDescriptions,
  HomeMainImageContainer,
} from '../../styles/homeStyles/homeMain-styles';

// lottie file
import animationData from '../../lotties/PRODUCT/Animation 04/drawkit-grape-animation-4-LOOP.json';
import { Link } from 'react-router-dom';

const HomeMain = (): JSX.Element => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <HomeMainContainer>
      <HomeMainImageContainer>
        <Lottie options={defaultOptions} />
      </HomeMainImageContainer>
      <HomeDescriptions>
        <h1>Join our</h1>
        <h2>Chat App</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          asperiores dolorum eligendi, repellat optio velit unde perferendis eos
          ratione cum voluptate eaque commodi provident id quos sed facilis
          natus maxime.
        </p>
        <Link to="/sign-up">
          <SignUpButton>Sign Up</SignUpButton>
        </Link>
      </HomeDescriptions>
    </HomeMainContainer>
  );
};

export default HomeMain;
