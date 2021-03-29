import styled from 'styled-components';

export const HomeMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 60px 80px 0;
  background-color: ${props => props.theme.background};
  
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
