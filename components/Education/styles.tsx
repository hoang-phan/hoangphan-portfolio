import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 260px;
  right: 690px;
  bottom: 35px;
  color: #red;
  z-index: 100;
`;

const EducationSection = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
`;

export { Container, EducationSection };
