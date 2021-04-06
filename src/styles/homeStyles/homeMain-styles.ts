import styled from 'styled-components';

export const HomeMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  padding-top: 60px;
  background-color: ${props => props.theme.containerBackground};
  color: ${props => props.theme.primaryText};
  footer.home-page__footer {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background-color: ${props => props.theme.navbarBackground};
    div.home-page__footer-container {
      display: flex;
      width: 50%;
      height: 100%;
      padding-top: 40px;
      h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 20px;
      }
      li {
        margin-bottom: 5px;
      }
      section.home-page__footer__section {
        width: 33.3%;
      }
      section.home-page__footer__contact-section {
        width: 33.3%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        h1 {
          font-weight: 900;
          font-size: 2rem;
          color: ${props => props.theme.primaryText};
          font-family: 'Pangolin', cursive;
        }
        div.home-page__footer__sns {
          display: flex;
        }
      }
    }
    div.home-page__footer__copyright {
      height: 40px;
      padding: 10px;
      color: ${props => props.theme.secondaryText};
      font-size: 0.7rem;
    }
  }
`;
export const HomeDescriptions = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  z-index: 10;
  padding: 10px 0;

  h1 {
    font-size: 2.2rem;
    font-weight: 300;
  }
  h2 {
    font-size: 3.2rem;
    font-weight: 600;
  }
  p {
    padding: 20px 0 0;
    font-weight: 100;
    line-height: 1.2;
    margin-bottom: 20px;
  }
  p#japanese {
    font-weight: 100;
    font-family: 'Noto Sans JP', sans-serif;
  }
  a {
    align-self: center;
    margin: 20px;
  }
`;
export const HomeMainImageContainer = styled.div`
  position: relative;
  width: 50%;
  height: 520px;
`;
export const HomeMainImage = styled.img`
  margin-top: 20px;
  width: 100%;
  height: 400px;
  object-fit: contain;
`;
