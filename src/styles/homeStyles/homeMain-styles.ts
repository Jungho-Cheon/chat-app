import styled from 'styled-components';

export const HomeMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 80px;
  background-color: ${props => props.theme.background};
`;
export const HomeDescriptions = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  z-index: 10;
  padding: 40px 0;
  h1 {
    font-size: 2.2rem;
    font-weight: 300;
  }
  h2 {
    font-size: 3.2rem;
    font-weight: 600;
  }
  p {
    padding: 20px 0;
    font-weight: 300;
    line-height: 1.2;
  }
  button {
    width: 150px;
    height: 50px;
    font-size: 1.4rem;
    border-radius: 25px;
    cursor: pointer;
  }
  a {
    align-self: center;
    margin: 20px;
  }
`;
export const HomeMainImageContainer = styled.div`
  position: relative;
  padding-top: 40px;
  width: 50%;
  height: 50%;
`;
export const HomeMainImage = styled.img`
  margin-top: 20px;
  width: 100%;
  height: 400px;
  object-fit: contain;
`;
