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
  left: 0;
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
    z-index: 999;
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

const Hero = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 30%;
  height: 100%;
  text-align: center;  

  h1 {
    text-align: left;
    width: 100%;
    font-size: 3rem;
    position: absolute;
    top: 50%;
    color: #333;
    letter-spacing: 100px;
    right: -800%;
    overflow: hidden;
    white-space: nowrap;
    transform: skew(15deg, 0);
    transition: letter-spacing 2s, right 1s, transform 0.5s ease 1s;
    cursor: pointer;
    user-select: none;

    &.ready {
      right: 0;
      transform: skew(0, 0);
      letter-spacing: 2px;
    }

    .title-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      color: #3f51b5;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  @media (orientation: portrait) {
    top: 0;
    width: 100%;
    height: 30%;

    h1 {
      top: 35%;
      font-size: 2rem;
      text-align: center;

      .title-overlay {
        display: none;
      }
    }
  }

  @media (max-width: 1280px) {
    h1.ready {
      font-size: 2rem;
      letter-spacing: 1px;

      .title-overlay {
        letter-spacing: 1px;
      }
    }
  }

  @media (max-height: 600px) {
    h1.ready {
      font-size: 2rem;
      letter-spacing: 1px;
    }
  }

  @media (max-height: 480px) {
    h1.ready {
      font-size: 1.5rem;
      letter-spacing: 1px;
    }
  }

`

export { Container, BodyModel, Menu, Hero }
