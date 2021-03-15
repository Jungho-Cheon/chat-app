import React from 'react';

// components
import HomePageHeader from '../components/homePage/HomeHeader';
import HomePageMain from '../components/homePage/HomeMain';

// styed components
import { HomePageContainer } from '../styles/homeStyles/homePage-styles';

const HomePage = (): JSX.Element => {
  return (
    <HomePageContainer>
      <HomePageHeader />
      <HomePageMain />
    </HomePageContainer>
  );
};

export default HomePage;
