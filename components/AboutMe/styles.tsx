import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 260px;
  right: 690px;
  bottom: 35px;
  color: #red;
  z-index: 100;
  display: flex;
  flex-direction: column;

  #intro {
    height: 50%;
  }

  #social-links {
    height: 50%;
    display: flex;

    .social-link {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export { Container };
