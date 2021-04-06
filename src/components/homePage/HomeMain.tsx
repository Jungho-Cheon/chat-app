import React from 'react';
import { Link } from 'react-router-dom';

// components
import MenuButton from '../chatPage/menuButton/MenuButton';

// styled components
import { SignUpButton } from '../../styles/homeStyles/homeHeader-styles';
import {
  HomeMainContainer,
  HomeDescriptions,
  HomeMainImageContainer,
} from '../../styles/homeStyles/homeMain-styles';

// lottie file
import Lottie from 'react-lottie';
import animationData from '../../lotties/PRODUCT/Animation 04/drawkit-grape-animation-4-LOOP.json';

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
        <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
      </HomeMainImageContainer>
      <HomeDescriptions>
        <h1>Join our</h1>
        <h2>Chat App</h2>
        <p>
          Start a variety of conversations through chat apps, from simple tasks
          to meetings for collaboration. If you prefer accessible chat over
          complex features, give it a try. A choice without regrets anytime,
          anywhere! The Chatting app that everyone is saying these days!
        </p>
        <p>
          간단한 작업부터 협업을위한 회의까지 채팅 앱을 통해 다양한 대화를
          시작하세요. 복잡한 기능보다 액세스 가능한 채팅을 선호한다면
          시도해보십시오. 언제 어디서나 후회없는 선택! 요즘 모두가 말하는 채팅
          앱!
        </p>
        <p id="japanese">
          簡単なタスクからコラボレーションのための会議まで、
          チャットアプリを介してさまざまな会話を開始します。
          複雑な機能よりもアクセスしやすいチャットを好む場合は、
          試してみてください。いつでもどこでも後悔のない選択！
          最近みんなが言っているチャットアプリ！
        </p>
        <Link to="/sign-up">
          <SignUpButton>Sign Up</SignUpButton>
        </Link>
      </HomeDescriptions>
      <footer className="home-page__footer">
        <div className="home-page__footer-container">
          <section className="home-page__footer__section">
            <h3>FE Stack</h3>
            <ul>
              <li>React.js</li>
              <li>React Router Dom</li>
              <li>Redux</li>
              <li>Styled-Components</li>
              <li>Socket.io client</li>
            </ul>
          </section>
          <section className="home-page__footer__section">
            <h3>BE Stack</h3>
            <ul>
              <li>Node.js</li>
              <li>express</li>
              <li>Socket.io</li>
              <li>atlas</li>
              <li>mongoose</li>
              <li>Google Cloud Platform</li>
              <li>Docker</li>
            </ul>
          </section>
          <section className="home-page__footer__contact-section">
            <h1>TALKI</h1>
            <div className="home-page__footer__sns">
              <MenuButton
                iconClass="fab fa-github"
                onClick={e => {
                  e.preventDefault();
                  if (window)
                    window.open('https://github.com/Jungho-Cheon', '_blank');
                }}
                hoverMessage="Github"
              />
              <MenuButton
                iconClass="fab fa-instagram"
                onClick={e => {
                  e.preventDefault();
                  if (window)
                    window.open(
                      'https://www.instagram.com/junghothethousand/',
                      '_blank'
                    );
                }}
                hoverMessage="Instagram"
              />
            </div>
          </section>
        </div>
        <div className="home-page__footer__copyright">
          Copyright 2021. JHTT - JungHo The Thousand All rights reserved
        </div>
      </footer>
    </HomeMainContainer>
  );
};

export default HomeMain;
