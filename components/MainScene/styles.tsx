import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  color: #4f4338;
  text-align: center;
  background: #d0dbe6;
`

const BodyModel = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: -15%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
`

const Menu = styled.div`
  .caret {
    position: fixed;
    z-index: 99;
    transition: left 0.3s ease, top 0.3s ease, opacity 0.3s ease;
    top: 100px;
    left: calc(100% - 200px);

    .menu-label {
      position: relative;
      top: 8%;
      left: 8%;
      width: 84%;
      height: 84%;
      border: 2px solid #4f4338;
      border-radius: 50%;
      background-color: rgb(255,255,255,0.6);
      transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease;

      svg {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }

    .menu-icon {
      position: absolute;
      top: 8%;
      left: 8%;
      width: 84%;
      height: 84%;
      border: 2px solid #4f4338;
      border-radius: 50%;
      background-color: rgb(255,255,255,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease;
    }

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }

    @media (min-width: 640.1px) {
      &:hover {
        .menu-label {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          svg {
            opacity: 1;
          }
        }
        .menu-icon {
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
        }
      }
    }

    @media (orientation: portrait) {
      top: 1%;
    }
  }
`

export { Container, BodyModel, Menu }
