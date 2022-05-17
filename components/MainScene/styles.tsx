import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  color: #4f4338;
  text-align: center;
  background-color: #d0dbe6;
`

const Header = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  z-index: 999;
  width: 100%;
  font-size: 2rem;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }

  h1 {
    font-size: inherit;
  }

  span {
    background: linear-gradient(orange, red);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const BodyModel = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
    height: auto;
    top: 120px;
    width: 129.5%;
    text-align: center;
  }

  left: -15%;
  width: 100%;
  height: 100%;

  cursor: pointer;
  background-color: transparent;
`

const Hero = styled.div`
  position: absolute;
  bottom: 0;

  right: 0;
  width: 30%;
  height: 100%;
  max-width: 400px;

  cursor: pointer;
  background-color: transparent;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;

  h1, h2 {
    color: #4f4338;
    padding: 10px;
    margin: 0;
  }

  h1 {
    font-size: 4rem;
    letter-spacing: 1px;
    border-bottom: 3px solid #4f4338;
  }

  h2 {
    font-size: 2rem;
    letter-spacing: 5px;
  }

  @media (max-width: 640px) {
    top: 10px;
    left: 0;
    max-width: 100%;
    width: 100%;
    height: 100px;
    text-align: center;

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.75rem;
    }
  }
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
  }
`

export { Container, Header, BodyModel, Hero, Menu }
